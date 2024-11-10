import gql from 'graphql-tag'

export const generatePresignedUrls = gql`
  mutation generatePresignedUrls($generatePresignedUrlsInput: GeneratePresignedUrlsInput!) {
    generatePresignedUrls(generatePresignedUrlsInput: $generatePresignedUrlsInput) {
      mediaUrls
      thumbnailUrl
    }
  }
`
