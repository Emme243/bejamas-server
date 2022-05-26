const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Artwork {
    id: ID
    category: String
    description: String
    imageUrl: String
    isBestseller: Boolean
    isFeatured: Boolean
    name: String
    price: Float
  }

  type Query {
    getDisplayedArtworks(filter: String): [Artwork]
    countDisplayedArtworks(filter: String): Int
    getAllCategories: [String]
  }

  type Mutation {
    createArtwork(
      category: String
      description: String
      imageUrl: String
      isBestseller: Boolean
      isFeatured: Boolean
      name: String
      price: Float
    ): Artwork
  }
`;

module.exports = { typeDefs };
