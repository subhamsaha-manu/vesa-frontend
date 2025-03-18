import gql from 'graphql-tag'

export const shippingAddress = gql`
  query shippingAddress($addressId: UUID!) {
    shippingAddress(addressId: $addressId) {
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
