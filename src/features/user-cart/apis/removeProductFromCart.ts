import gql from 'graphql-tag'

export const removeProductFromCart = gql`
  mutation removeProductFromCart($productId: UUID!, $removeAll: Boolean) {
    removeProductFromCart(productId: $productId, removeAll: $removeAll)
  }
`
