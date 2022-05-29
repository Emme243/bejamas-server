const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Artwork {
    id: ID
    category: String
    createdAt: String
    description: String
    isBestseller: Boolean
    isFeatured: Boolean
    name: String
    price: Float
    details: ArtworkDetails
  }

  type ArtworkDetails {
    height: Int
    id: Int
    recommendations: [RecommendedArtwork]
    size: Int
    src: ImageSrc
    width: Int
  }

  type RecommendedArtwork {
    name: String
    src: ImageSrc
  }

  type ImageSrc {
    landscape: String
    large2x: String
    large: String
    medium: String
    original: String
    portrait: String
    small: String
    tiny: String
  }

  type DisplayedArtworkResponse {
    artworks: [Artwork]
    total: Int
  }

  enum SortType {
    ASC
    DESC
  }

  input SortInput {
    by: String
    type: SortType
  }

  enum FilterType {
    RANGE
    IN
  }

  input FilterInput {
    key: String
    values: [String]
    type: FilterType
  }

  type ArtworkPriceRange {
    minPrice: Float
    maxPrice: Float
  }

  type Query {
    displayedArtworks(
      filter: [FilterInput]
      sort: SortInput
      limit: Int
      page: Int
    ): DisplayedArtworkResponse
    totalArtworksToDisplay(filter: [FilterInput]): Int
    featuredArtwork: Artwork
    artworkPriceRange: ArtworkPriceRange
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
