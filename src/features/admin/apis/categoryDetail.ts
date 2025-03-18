import gql from 'graphql-tag'

export const category = gql`
  query category($categoryId: UUID!) {
    category(categoryId: $categoryId) {
      categoryId
      name
      description
      imageUrl
      status
    }
  }
`
