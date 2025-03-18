import gql from 'graphql-tag'

export const updateOrderStatus = gql`
  mutation updateOrderStatus($orderId: UUID!, $status: OrderStatus!) {
    updateOrderStatus(orderId: $orderId, status: $status)
  }
`
