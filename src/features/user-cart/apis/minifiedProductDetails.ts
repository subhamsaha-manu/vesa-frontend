import gql from 'graphql-tag'

export const minifiedProductDetails = gql`
  query minifiedProductDetails($productFilter: ProductFilter!, $pageNumber: Int!, $pageSize: Int!) {
    products(productFilter: $productFilter, pageNumber: $pageNumber, pageSize: $pageSize) {
      products {
        productId
        quantity
        isOutOfStock
      }
    }
  }
`
