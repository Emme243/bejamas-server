const Artwork = require("./models/Artwork");

async function getAllArtworks(args) {
  let key = "";
  let value = "";
  if (args.filter) {
    const [k, v] = args.filter?.split(",");
    key = k;
    value = v;
  }

  return await Artwork.find({ [key]: { $eq: value } });
}

const resolvers = {
  Query: {
    getDisplayedArtworks: async (_, args) => {
      const artworks = await getAllArtworks(args);
      return artworks;
    },
    countDisplayedArtworks: async (_, args) => {
      const artworks = await getAllArtworks(args);
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
