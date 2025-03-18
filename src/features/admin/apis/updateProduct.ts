import gql from 'graphql-tag'

export const updateProduct = gql`
  mutation updateProduct($productId: UUID!, $updateProductInput: UpdateProductInput!) {
    updateProduct(productId: $productId, updateProductInput: $updateProductInput)
  }
`
