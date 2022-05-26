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
    getAllArtworks: [Artwork]
    countAllArtowrks: Int
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
