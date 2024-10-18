import gql from 'graphql-tag'

export const orders = gql`
  query orders($pageNumber: Int!, $pageSize: Int!) {
    orders(pageNumber: $pageNumber, pageSize: $pageSize) {
      orders {
        orderId
        name
        modeOfPayment
        orderDate
        orderStatus
        orderTotal
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
