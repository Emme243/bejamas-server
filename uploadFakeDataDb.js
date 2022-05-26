const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const Artwork = require("./src/models/Artwork");

const generateFakeArtwork = function () {
  const category = faker.helpers.arrayElement([
    "people",
    "pets",
    "computer",
    "nature",
    "city",
  ]);
  const description = faker.lorem.paragraph(2);
  const imageUrl = "";
  const isBestseller = faker.datatype.boolean();
  const isFeatured = faker.datatype.boolean();
  const name = faker.lorem.words(3);
  const price = faker.datatype.number({ min: 20, max: 2000, precision: 0.01 });

  return {
    category,
    description,
    imageUrl,
    isBestseller,
    isFeatured,
    name,
    price,
  };
};

const artworks = [];
for (let i = 0; i < 80; i++) artworks.push(generateFakeArtwork());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB connection successful!"));

async function saveArtworksInDb() {
  try {
    await Artwork.create(artworks);
    console.log("Data successfully loaded!");
  } catch (error) {
    console.log(error);
  }
}

saveArtworksInDb();

module.exports = { saveArtworksInDb };
