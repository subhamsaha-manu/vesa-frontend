import gql from 'graphql-tag'

export const categories = gql`
  query categories {
    categories {
      categoryId
      name
      imageUrl
    }
  }
`
