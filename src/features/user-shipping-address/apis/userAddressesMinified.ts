import gql from 'graphql-tag'

export const userAddressesMinified = gql`
  query userAddressesMinified {
    userAddressesMinified {
      addressId
      name
      isDefault
    }
  }
`
