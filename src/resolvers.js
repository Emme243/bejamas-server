const Artwork = require("./models/Artwork");

async function getAllArtworks() {
  return await Artwork.find();
}

const resolvers = {
  Query: {
    getAllArtworks: async () => {
      const artworks = await getAllArtworks();
      return artworks;
    },
    countAllArtowrks: async () => {
      const artworks = await getAllArtworks();
      return artworks.length;
    },
    getAllCategories: async () => {
      const artworks = await getAllArtworks();
      const categories = [
        ...new Set(artworks.map(artwork => artwork.category)),
      ];
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
