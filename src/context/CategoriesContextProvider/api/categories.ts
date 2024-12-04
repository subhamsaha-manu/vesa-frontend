import gql from 'graphql-tag'

export const categories = gql`
  query categories($categoryFilter: CategoryFilter!) {
    categories(categoryFilter: $categoryFilter) {
      categoryId
      name
      imageUrl
      status
    }
  }
`
