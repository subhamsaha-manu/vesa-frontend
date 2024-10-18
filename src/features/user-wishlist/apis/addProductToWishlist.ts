import gql from 'graphql-tag'

export const addProductToWishlist = gql`
  mutation addProductToWishlist($productId: ID!) {
    addProductToWishlist(productId: $productId)
  }
`
