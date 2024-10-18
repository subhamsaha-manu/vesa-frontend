import gql from 'graphql-tag'

export const shippingAddresses = gql`
  query shippingAddresses {
    shippingAddresses {
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
