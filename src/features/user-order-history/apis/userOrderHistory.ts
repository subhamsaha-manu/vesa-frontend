import gql from 'graphql-tag'

export const userOrderHistory = gql`
  query userOrderHistory {
    userOrderHistory {
      orderId
      orderDate
      orderStatus
      orderTotal
    }
  }
`
