const { gql } = require('apollo-server-express');

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

  type DisplayedArtworkResponse {
    data: [Artwork]
    total: Int
  }

  type Query {
    displayedArtworks(filter: String, sort: String, limit: Int, page: Int): DisplayedArtworkResponse
    totalArtworksToDisplay(filter: String): Int
    featuredArtwork: Artwork
    categories: [String]
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
