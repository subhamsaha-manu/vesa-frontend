import gql from 'graphql-tag'

export const userWishlist = gql`
  query userWishlist {
    userWishlist {
      productId
      title
      imageUrl
      price
      quantity
      isOutOfStock
    }
  }
`
