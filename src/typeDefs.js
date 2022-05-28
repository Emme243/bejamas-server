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
    artworks: [Artwork]
    total: Int
  }

  input FilterInput {
    key: String
    values: [String]
  }

  type Query {
    displayedArtworks(
      filter: FilterInput
      sort: String
      limit: Int
      page: Int
    ): DisplayedArtworkResponse
    totalArtworksToDisplay(filter: FilterInput): Int
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
