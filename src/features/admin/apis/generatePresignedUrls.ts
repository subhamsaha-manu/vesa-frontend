import gql from 'graphql-tag'

export const generatePresignedUrls = gql`
  mutation generatePresignedUrls($productId: ID!, $contentTypes: [String!]!) {
    generatePresignedUrls(productId: $productId, contentTypes: $contentTypes)
  }
`
