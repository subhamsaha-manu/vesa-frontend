import gql from 'graphql-tag'

export const userWishlist = gql`
  query userWishlist($userId: ID!) {
    userWishlist(userId: $userId) {
      productId
      title
      imageUrl
      price
    }
  }
`
