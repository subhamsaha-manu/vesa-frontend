import gql from 'graphql-tag'

export const product = gql`
  query productDetail($productId: ID!) {
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
    categories {
      categoryId
      name
    }
  }
`
