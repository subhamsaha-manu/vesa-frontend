import gql from 'graphql-tag'

export const products = gql`
  query products($productFilter: ProductFilter!, $pageNumber: Int!, $pageSize: Int!) {
    products(productFilter: $productFilter, pageNumber: $pageNumber, pageSize: $pageSize) {
      products {
        id
        productId
        title
        price
        thumbnailUrl
        imageUrls
        isOutOfStock
      }
    }
  }
`
