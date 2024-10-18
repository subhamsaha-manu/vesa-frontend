import gql from 'graphql-tag'

export const addShippingAddress = gql`
  mutation addShippingAddress($input: AddUpdateShippingAddressInput!) {
    addShippingAddress(addUpdateShippingAddressInput: $input)
  }
`
