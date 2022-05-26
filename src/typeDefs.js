const { gql } = require("apollo-server-express");

const typeDefs = gql`
  enum Category {
    people
    pets
    computer
    nature
    city
  }

  type Artwork {
    id: ID
    category: Category
    description: String
    imageUrl: String
    isBestseller: Boolean
    isFeatured: Boolean
    name: String
    price: Float
  }

  type Query {
    hello: String
    getAllArtworks: [Artwork]
    countAllArtowrks: Int
  }

  type Mutation {
    createArtwork(
      category: Category
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
