import gql from 'graphql-tag'

export const addProductToWishlist = gql`
  mutation addProductToWishlist($userId: ID!, $productId: ID!) {
    addProductToWishlist(userId: $userId, productId: $productId)
  }
`
