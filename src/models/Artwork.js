const { Schema, model } = require('mongoose');

const artworkSchema = new Schema({
  category: String,
  createdAt: String,
  description: String,
  imageUrl: String,
  isBestseller: Boolean,
  isFeatured: Boolean,
  name: String,
  price: Number,
});

module.exports = model('Artwork', artworkSchema);
