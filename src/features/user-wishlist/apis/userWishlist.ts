import gql from 'graphql-tag'

export const userWishlist = gql`
  query userWishlist {
    userWishlist {
      productId
      title
      imageUrls
      thumbnailUrl
      price
      quantity
      isOutOfStock
    }
  }
`
