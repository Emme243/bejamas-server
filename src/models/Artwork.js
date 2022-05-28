const { Schema, model } = require('mongoose');

const imageSrcModel = {
  landscape: String,
  large2x: String,
  large: String,
  medium: String,
  original: String,
  portrait: String,
  small: String,
  tiny: String,
};

const recommendedArtworkModel = {
  name: String,
  src: imageSrcModel,
};

const artworkDetailsModel = {
  height: Number,
  id: Number,
  recommendations: [recommendedArtworkModel],
  size: Number,
  src: imageSrcModel,
  width: Number,
};

const artworkSchema = new Schema({
  category: String,
  createdAt: String,
  description: String,
  isBestseller: Boolean,
  isFeatured: Boolean,
  name: String,
  price: Number,
  details: artworkDetailsModel,
});

module.exports = model('Artwork', artworkSchema);
