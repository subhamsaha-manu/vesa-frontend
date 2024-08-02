import gql from 'graphql-tag'

export const addShippingAddress = gql`
  mutation addShippingAddress($userId: ID!, $input: AddUpdateShippingAddressInput!) {
    addShippingAddress(userId: $userId, addUpdateShippingAddressInput: $input)
  }
`
