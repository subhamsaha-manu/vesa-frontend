import gql from 'graphql-tag'

export const userAddressesMinified = gql`
  query userAddressesMinified($userId: ID!) {
    userAddressesMinified(userId: $userId) {
      addressId
      name
      isDefault
    }
  }
`
