import gql from 'graphql-tag'

export const product = gql`
  query product($productId: UUID!) {
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
      isOutOfStock
    }
  }
`
