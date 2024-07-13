import gql from 'graphql-tag'

export const products = gql`
  query products($productFilter: ProductFilter!) {
    products(productFilter: $productFilter) {
      productId
      title
      price
      thumbnailUrl
      imageUrl
    }
  }
`
