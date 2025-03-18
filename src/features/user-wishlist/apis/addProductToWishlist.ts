import gql from 'graphql-tag'

export const addProductToWishlist = gql`
  mutation addProductToWishlist($productId: UUID!) {
    addProductToWishlist(productId: $productId)
  }
`
