import gql from 'graphql-tag'

export const storeCheckoutDetails = gql`
  mutation storeCheckoutDetails($input: StoreCheckoutDetailsInput!) {
    storeCheckoutDetails(input: $input)
  }
`
