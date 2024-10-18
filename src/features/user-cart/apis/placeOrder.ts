import gql from 'graphql-tag'

export const placeOrder = gql`
  mutation placeOrder($placeOrderInput: PlaceOrderInput!) {
    placeOrder(placeOrderInput: $placeOrderInput)
  }
`
