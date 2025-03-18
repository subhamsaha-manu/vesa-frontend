import gql from 'graphql-tag'

export const orderDetails = gql`
  query orderDetails($orderId: UUID!) {
    orderDetails(orderId: $orderId) {
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
