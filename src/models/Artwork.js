const { Schema, model } = require("mongoose");

const artworkSchema = new Schema({
  category: String,
  description: String,
  imageUrl: String,
  isBestseller: Boolean,
  isFeatured: Boolean,
  name: String,
  price: Number,
});

module.exports = model("Artwork", artworkSchema);
