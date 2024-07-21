import gql from 'graphql-tag'

export const removeProductFromCart = gql`
  mutation removeProductFromCart($userId: ID!, $productId: ID!, $removeAll: Boolean) {
    removeProductFromCart(userId: $userId, productId: $productId, removeAll: $removeAll)
  }
`
