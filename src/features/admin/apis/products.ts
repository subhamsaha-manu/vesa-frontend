import gql from 'graphql-tag'

export const allProductsForAdmin = gql`
  query allProductsForAdmin($productFilter: ProductFilter!, $pageNumber: Int!, $pageSize: Int!) {
    products(productFilter: $productFilter, pageNumber: $pageNumber, pageSize: $pageSize) {
      products {
        productId
        title
        price
        quantity
        thumbnailUrl
      }
      pageInfo {
        totalPages
        currentPage
        pageSize
        totalElements
      }
    }
  }
`
