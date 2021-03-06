const Artwork = require('./models/Artwork');
const { QueryFeatures } = require('./utils/QueryFeatures');

const resolvers = {
  Query: {
    displayedArtworks: async (_, args) => {
      const displayedArtworkModel = new QueryFeatures(Artwork, args).filter().sort().pagination();
      const displayedArtworks = await displayedArtworkModel.query;
      const totalArtworkToDisplayModel = new QueryFeatures(Artwork, args).filter();
      const totalArtworkToDisplay = await totalArtworkToDisplayModel.query.count();
      return { artworks: displayedArtworks, total: totalArtworkToDisplay };
    },
    totalArtworksToDisplay: async (_, args) => {
      const totalArtworkToDisplayModel = new QueryFeatures(Artwork, args).filter();
      return await totalArtworkToDisplayModel.query.count();
    },
    featuredArtwork: async () => {
      return (await Artwork.find({ isFeatured: { $eq: true } })).pop();
    },
    artworkPriceRange: async () => {
      const artworks = await Artwork.find().sort({ price: 1 });
      const minPrice = artworks.shift().price;
      const maxPrice = artworks.pop().price;
      return { minPrice, maxPrice };
    },
    categories: async () => {
      const artworks = await Artwork.find();
      return [...new Set(artworks.map(artwork => artwork.category))];
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
