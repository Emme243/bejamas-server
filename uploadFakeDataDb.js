const { faker } = require('@faker-js/faker');
const { connectToDb } = require('./src/db');
require('dotenv').config();
const Artwork = require('./src/models/Artwork');

const capitalize = word => word.charAt(0).toUpperCase() + word.slice(1);
const generateFakeArtwork = function () {
  const categories = ['city', 'fashion', 'food', 'nature', 'people', 'transport'];
  const category = faker.helpers.arrayElement(categories);
  const numberOfDescriptionParagraphs = 2;
  const imageWidth = 1200;

  return {
    category,
    createdAt: faker.date.between('2020-01-01', '2020-12-31'),
    description: faker.lorem.paragraph(numberOfDescriptionParagraphs),
    imageUrl: faker.image[category](imageWidth),
    isBestseller: faker.datatype.boolean(),
    isFeatured: false,
    name: capitalize(faker.lorem.words(3)),
    price: faker.datatype.number({ min: 20, max: 2000, precision: 0.01 }),
  };
};
const artworks = [];
for (let i = 0; i < 83; i++) artworks.push(generateFakeArtwork());

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
