import gql from 'graphql-tag'

export const userOrderHistory = gql`
  query userOrderHistory($userId: ID!) {
    userOrderHistory(userId: $userId) {
      orderId
      orderDate
      orderStatus
      orderTotal
    }
  }
`
