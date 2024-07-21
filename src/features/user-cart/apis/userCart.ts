import gql from 'graphql-tag'

export const userCart = gql`
  query userCart($userId: ID!) {
    userCart(userId: $userId) {
      productId
      title
      price
      imageUrl
      quantity
    }
  }
`
