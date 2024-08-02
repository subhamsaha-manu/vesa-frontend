import gql from 'graphql-tag'

export const removeShippingAddress = gql`
  mutation removeShippingAddress($userId: ID!, $addressId: ID!) {
    removeShippingAddress(userId: $userId, addressId: $addressId)
  }
`
