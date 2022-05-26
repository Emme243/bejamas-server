const Artwork = require("./models/Artwork");

const resolvers = {
  Query: {
    hello: () => "Hello world",
    getAllArtworks: async () => {
      const artworks = await Artwork.find();
      return artworks;
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
