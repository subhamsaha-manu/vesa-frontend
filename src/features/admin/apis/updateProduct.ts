import gql from 'graphql-tag'

export const updateProduct = gql`
  mutation updateProduct($productId: ID!, $updateProductInput: UpdateProductInput!) {
    updateProduct(productId: $productId, updateProductInput: $updateProductInput)
  }
`
