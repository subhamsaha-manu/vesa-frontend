import gql from 'graphql-tag'

export const removeProductFromWishlist = gql`
  mutation removeProductFromWishlist($productId: UUID!) {
    removeProductFromWishlist(productId: $productId)
  }
`
