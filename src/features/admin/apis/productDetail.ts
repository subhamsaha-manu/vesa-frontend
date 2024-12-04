import gql from 'graphql-tag'

export const product = gql`
  query productDetail($productId: ID!, $categoryFilter: CategoryFilter!) {
    product(productId: $productId) {
      productId
      title
      price
      thumbnailUrl
      medias {
        uuid
        url
      }
      description
      quantity
      status
      isOutOfStock
      categoryIds
    }
    categories(categoryFilter: $categoryFilter) {
      categoryId
      name
    }
  }
`
