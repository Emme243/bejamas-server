const { Schema, model } = require("mongoose");

const artworkSchema = new Schema({
  category: {
    type: String,
    enum: ["people", "pets", "computer", "nature", "city"],
    default: "people",
  },
  description: String,
  imageUrl: String,
  isBestseller: Boolean,
  isFeatured: Boolean,
  name: String,
  price: Number,
});

module.exports = model("Artwork", artworkSchema);
