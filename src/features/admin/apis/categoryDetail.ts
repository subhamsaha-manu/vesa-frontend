import gql from 'graphql-tag'

export const category = gql`
  query category($categoryId: ID!) {
    category(categoryId: $categoryId) {
      categoryId
      name
      description
      imageUrl
    }
  }
`
