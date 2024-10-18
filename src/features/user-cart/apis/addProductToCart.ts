import gql from 'graphql-tag'

export const addProductToCart = gql`
  mutation addProductToCart($productId: ID!) {
    addProductToCart(productId: $productId)
  }
`
