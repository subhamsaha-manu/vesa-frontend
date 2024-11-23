import gql from 'graphql-tag'

export const userWishlist = gql`
  query userWishlist {
    userWishlist {
      productId
      title
      imageUrls
      price
      quantity
      isOutOfStock
    }
  }
`
