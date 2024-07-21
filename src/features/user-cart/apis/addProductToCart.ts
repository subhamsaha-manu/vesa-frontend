import gql from 'graphql-tag'

export const addProductToCart = gql`
  mutation addProductToCart($userId: ID!, $productId: ID!) {
    addProductToCart(userId: $userId, productId: $productId)
  }
`
