import gql from 'graphql-tag'

export const updateOrderStatus = gql`
  mutation updateOrderStatus($orderId: ID!, $status: OrderStatus!) {
    updateOrderStatus(orderId: $orderId, status: $status)
  }
`
