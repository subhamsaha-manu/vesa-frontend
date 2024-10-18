import gql from 'graphql-tag'

export const removeProductFromCart = gql`
  mutation removeProductFromCart($productId: ID!, $removeAll: Boolean) {
    removeProductFromCart(productId: $productId, removeAll: $removeAll)
  }
`
