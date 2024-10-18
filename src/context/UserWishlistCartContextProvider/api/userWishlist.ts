import gql from 'graphql-tag'

export const userWishlist = gql`
  query userWishlistOperation {
    userWishlist {
      productId
    }
  }
`
