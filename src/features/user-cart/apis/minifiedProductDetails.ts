import gql from 'graphql-tag'

export const minifiedProductDetails = gql`
  query minifiedProductDetails($productFilter: ProductFilter!) {
    products(productFilter: $productFilter) {
      productId
      quantity
      isOutOfStock
    }
  }
`
