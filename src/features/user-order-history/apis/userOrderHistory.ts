import gql from 'graphql-tag'

export const userOrderHistory = gql`
  query userOrderHistory($userId: ID!) {
    userOrderHistory(userId: $userId) {
      orderId
      name
      email
      phone
      addressLine1
      addressLine2
      city
      state
      country
      pincode
      orderItems {
        productId
        title
        price
        imageUrl
        quantity
      }
      modeOfPayment
      orderDate
      orderStatus
      orderTotal
    }
  }
`
