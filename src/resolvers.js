const Artwork = require('./models/Artwork');
const { QueryFeatures } = require('./utils/QueryFeatures');

const resolvers = {
  Query: {
    getDisplayedArtworks: async (_, args) => {
      const displayedArtworkModel = new QueryFeatures(Artwork, args).filter().sort().pagination();
      const displayedArtworks = await displayedArtworkModel.query;
      const totalArtworkToDisplayModel = new QueryFeatures(Artwork, args).filter();
      const totalArtworkToDisplay = await totalArtworkToDisplayModel.query.count();
      return { data: displayedArtworks, total: totalArtworkToDisplay };
    },
    countArtworksToDisplay: async (_, args) => {
      const totalArtworkToDisplayModel = new QueryFeatures(Artwork, args).filter();
      const totalArtworkToDisplay = await totalArtworkToDisplayModel.query.count();
      return totalArtworkToDisplay;
    },
    getFeaturedArtwork: async () => {
      const featuredArtwork = (await Artwork.find({ isFeatured: { $eq: true } })).pop();
      return featuredArtwork;
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
