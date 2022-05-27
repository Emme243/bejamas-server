const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const Artwork = require('./src/models/Artwork');

function capitalize(word) {
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
}

const generateFakeArtwork = function () {
  const categories = ['city', 'fashion', 'food', 'nature', 'people', 'transport'];
  const category = faker.helpers.arrayElement(categories);
  const descriptionParagraphNumber = 2;
  const imageWidth = 1200;

  return {
    category,
    createdAt: faker.datatype.datetime(),
    description: faker.lorem.paragraph(descriptionParagraphNumber),
    imageUrl: faker.image[category](imageWidth),
    isBestseller: faker.datatype.boolean(),
    isFeatured: false,
    name: capitalize(faker.lorem.words(3)),
    price: faker.datatype.number({ min: 20, max: 2000, precision: 0.01 }),
  };
};

const artworks = [];
for (let i = 0; i < 83; i++) artworks.push(generateFakeArtwork());

mongoose.connect(process.env.MONGODB_URI).then(() => console.log('DB connection successful!'));

async function saveArtworksInDb() {
  try {
    await Artwork.create(artworks);
    console.log('Data successfully loaded!');
  } catch (error) {
    console.log(error);
  }
}

saveArtworksInDb();

module.exports = { saveArtworksInDb };
