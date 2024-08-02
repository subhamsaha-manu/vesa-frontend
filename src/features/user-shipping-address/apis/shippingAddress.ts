import gql from 'graphql-tag'

export const shippingAddress = gql`
  query shippingAddress($userId: ID!, $addressId: ID!) {
    shippingAddress(userId: $userId, addressId: $addressId) {
      addressId
      name
      addressLine1
      addressLine2
      city
      state
      country
      pincode
      addressType
      isDefault
    }
  }
`
