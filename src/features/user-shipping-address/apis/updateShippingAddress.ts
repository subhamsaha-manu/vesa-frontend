import gql from 'graphql-tag'

export const updateShippingAddress = gql`
  mutation updateShippingAddress(
    $userId: ID!
    $addressId: ID!
    $input: AddUpdateShippingAddressInput!
  ) {
    updateShippingAddress(
      userId: $userId
      addressId: $addressId
      addUpdateShippingAddressInput: $input
    )
  }
`
