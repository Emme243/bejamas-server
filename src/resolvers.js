const Artwork = require('./models/Artwork');

async function getAllArtworks(args) {
  const { filter, sort, limit, page } = args;
  let artworkFindPromise = Artwork;

  // Filtro por campo
  let filterBy = '';
  let filterValue = '';
  if (filter) {
    const [key, value] = filter.split(':');
    filterBy = key;
    filterValue = value.split(',');
    artworkFindPromise = artworkFindPromise.find({
      [filterBy]: { $in: filterValue },
    });
  } else {
    artworkFindPromise = artworkFindPromise.find();
  }

  // Ordenamiento
  if (sort) {
    const [key, value] = sort.split(':');
    const isAscending = value === 'asc' || value === undefined ? 1 : -1;
    artworkFindPromise = artworkFindPromise.sort({ [key]: isAscending });
  }

  // Paginación
  if (limit && page) {
    const skip = (page - 1) * limit;
    artworkFindPromise = artworkFindPromise.skip(skip).limit(limit);
  }
  return artworkFindPromise;
}

const resolvers = {
  Query: {
    getDisplayedArtworks: async (_, args) => {
      const artworks = await getAllArtworks(args);
      return artworks;
    },
    countArtworksToBeDisplayed: async (_, args) => {
      const artworks = await getAllArtworks(args);
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
