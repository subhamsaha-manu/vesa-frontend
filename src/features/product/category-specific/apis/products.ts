import gql from 'graphql-tag'

export const products = gql`
  query products($productFilter: ProductFilter!) {
    products(productFilter: $productFilter) {
      id
      productId
      title
      price
      thumbnailUrl
      imageUrl
    }
  }
`
