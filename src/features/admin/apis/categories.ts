import gql from 'graphql-tag'

export const allCategoriesForAdmin = gql`
  query allCategoriesForAdmin {
    categories {
      categoryId
      name
      description
      imageUrl
    }
  }
`
