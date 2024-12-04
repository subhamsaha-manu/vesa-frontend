import gql from 'graphql-tag'

export const allCategoriesForAdmin = gql`
  query allCategoriesForAdmin($categoryFilter: CategoryFilter!) {
    categories(categoryFilter: $categoryFilter) {
      categoryId
      name
      description
      imageUrl
      status
    }
  }
`
