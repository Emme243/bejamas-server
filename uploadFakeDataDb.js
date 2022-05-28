const { faker } = require('@faker-js/faker');
const { connectToDb } = require('./src/db');
const { sample, remove, sampleSize } = require('lodash');
require('dotenv').config();
const Artwork = require('./src/models/Artwork');

const FEATURED_ARTWORK_IDX = 23;
const NUMBER_OF_DESCRIPTION_PARAGRAPHS = 2;
const artworkCategories = ['city', 'food', 'nature', 'people', 'music', 'books', 'sports'];
const imagesByCategory = require('./images.json');
const createArtwork = function (index) {
  const category = sample(artworkCategories);
  const artworkImage = sample(imagesByCategory[category]);
  remove(imagesByCategory[category], image => image.id === artworkImage.id);

  return {
    category,
    createdAt: faker.date.between('2020-01-01', '2020-12-31'),
    description: faker.lorem.paragraphs(NUMBER_OF_DESCRIPTION_PARAGRAPHS, '\n'),
    isBestseller: faker.datatype.boolean(),
    isFeatured: index === FEATURED_ARTWORK_IDX,
    name: artworkImage.alt,
    price: faker.datatype.number({ min: 20, max: 2000, precision: 0.01 }),
    details: {
      id: artworkImage.id,
      width: artworkImage.width,
      height: artworkImage.height,
      size: faker.datatype.number({ min: 1000, max: 10000 }), // KB
      src: artworkImage.src,
      recommendations: [],
    },
  };
};

const artworks = [];
const NUMBER_OF_ARTWORKS = 45;
const NUMBER_OF_RECOMMENDATIONS_PER_ARTWORK = 3;
for (let i = 0; i < NUMBER_OF_ARTWORKS; i++) artworks.push(createArtwork(i));
artworks.forEach(artwork => {
  artwork.details.recommendations = sampleSize(
    artworks.filter(otherArtwork => otherArtwork.category === artwork.category),
    NUMBER_OF_RECOMMENDATIONS_PER_ARTWORK
  ).map(recommendedArtwork => ({
    name: recommendedArtwork.name,
    src: recommendedArtwork.details.src,
  }));
});

connectToDb();
function saveArtworksInDb() {
  Artwork.create(artworks)
    .then(() => {
      console.log('Artworks created');
      process.exit();
    })
    .catch(err => {
      console.log(err);
      process.exit();
    });
}
saveArtworksInDb();
