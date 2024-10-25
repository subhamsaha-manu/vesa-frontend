import gql from 'graphql-tag'

export const getPresignedUrl = gql`
  mutation getPresignedUrl($productId: ID!, $contentType: String!) {
    getPresignedUrl(productId: $productId, contentType: $contentType) {
      url
    }
  }
`
