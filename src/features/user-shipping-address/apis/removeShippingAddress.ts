import gql from 'graphql-tag'

export const removeShippingAddress = gql`
  mutation removeShippingAddress($addressId: UUID!) {
    removeShippingAddress(addressId: $addressId)
  }
`
