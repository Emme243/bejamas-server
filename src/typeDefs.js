const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Artwork {
    id: ID
    category: String
    createdAt: String
    description: String
    imageUrl: String
    isBestseller: Boolean
    isFeatured: Boolean
    name: String
    price: Float
  }

  type Query {
    getDisplayedArtworks(
      filter: String
      sort: String
      limit: Int
      page: Int
    ): [Artwork]
    countDisplayedArtworks(
      filter: String
      sort: String
      limit: Int
      page: Int
    ): Int
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
