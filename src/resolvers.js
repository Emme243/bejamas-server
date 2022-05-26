const Artwork = require("./models/Artwork");

async function getAllArtworks(args) {
  const { filter, sort } = args;

  // Filtro por campo
  let filterBy = "";
  let filterValue = "";
  if (filter) {
    const [key, value] = filter.split(":");
    filterBy = key;
    filterValue = value.split(",");
  }

  // Ordenamiento
  let sorting = null;
  if (sort) {
    const [key, value] = sort.split(":");
    const isAscending = value === "asc" || value === undefined ? 1 : -1;
    sorting = { [key]: isAscending };
  }

  const artworkFindPromise = Artwork.find({
    [filterBy]: { $in: filterValue },
  });

  return sorting
    ? await artworkFindPromise.sort(sorting)
    : await artworkFindPromise;
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
