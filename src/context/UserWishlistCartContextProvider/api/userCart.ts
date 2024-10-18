import gql from 'graphql-tag'

export const userCart = gql`
  query userCartOperation {
    userCart {
      productId
      quantity
    }
  }
`
