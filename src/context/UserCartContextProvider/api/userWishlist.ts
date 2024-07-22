import gql from 'graphql-tag'

export const userWishlist = gql`
  query userWishlistOperation($userId: ID!) {
    userWishlist(userId: $userId) {
      productId
    }
  }
`
