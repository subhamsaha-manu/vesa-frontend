import gql from 'graphql-tag'

export const userCart = gql`
  query userCartOperation($userId: ID!) {
    userCart(userId: $userId) {
      productId
      quantity
    }
  }
`
