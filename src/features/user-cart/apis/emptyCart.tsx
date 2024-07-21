import gql from 'graphql-tag'

export const emptyCart = gql`
  mutation emptyCart($userId: ID!) {
    emptyCart(userId: $userId)
  }
`
