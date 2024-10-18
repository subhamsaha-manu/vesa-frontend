import gql from 'graphql-tag'

export const removeProductFromWishlist = gql`
  mutation removeProductFromWishlist($productId: ID!) {
    removeProductFromWishlist(productId: $productId)
  }
`
