import gql from 'graphql-tag'

export const removeProductFromWishlist = gql`
  mutation removeProductFromWishlist($userId: ID!, $productId: ID!) {
    removeProductFromWishlist(userId: $userId, productId: $productId)
  }
`
