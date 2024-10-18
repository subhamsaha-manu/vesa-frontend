import gql from 'graphql-tag'

export const removeShippingAddress = gql`
  mutation removeShippingAddress($addressId: ID!) {
    removeShippingAddress(addressId: $addressId)
  }
`
