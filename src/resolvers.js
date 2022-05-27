const Artwork = require('./models/Artwork');
const { QueryFeatures } = require('./utils/QueryFeatures');

const resolvers = {
  Query: {
    getDisplayedArtworks: async (_, args) => {
      const featuredArtwork = new QueryFeatures(Artwork, args).filter().sort().pagination();
      const artworks = await featuredArtwork.model;
      return artworks;
    },
    countArtworksToBeDisplayed: async (_, args) => {
      const featuredArtwork = new QueryFeatures(Artwork, args).filter();
      const artworks = await featuredArtwork.model;
      return artworks.length;
    },
    getAllCategories: async () => {
      const artworks = await Artwork.find();
      const categories = [...new Set(artworks.map(artwork => artwork.category))];
      return categories;
    },
  },
  Mutation: {
    createArtwork: async (_, args) => {
      const newArtwork = new Artwork({ ...args });
      await newArtwork.save();
      return newArtwork;
    },
  },
};

module.exports = { resolvers };
