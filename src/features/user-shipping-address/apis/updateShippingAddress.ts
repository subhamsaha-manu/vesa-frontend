import gql from 'graphql-tag'

export const updateShippingAddress = gql`
  mutation updateShippingAddress($addressId: ID!, $input: AddUpdateShippingAddressInput!) {
    updateShippingAddress(addressId: $addressId, addUpdateShippingAddressInput: $input)
  }
`
