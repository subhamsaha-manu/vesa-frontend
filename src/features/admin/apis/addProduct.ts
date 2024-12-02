import gql from 'graphql-tag'

export const addProduct = gql`
  mutation addProduct($addProductInput: AddProductInput!) {
    addProduct(addProductInput: $addProductInput)
  }
`
