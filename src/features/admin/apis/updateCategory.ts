import gql from 'graphql-tag'

export const updateCategory = gql`
  mutation updateCategory($categoryId: ID!, $updateCategoryInput: UpdateCategoryInput!) {
    updateCategory(categoryId: $categoryId, updateCategoryInput: $updateCategoryInput)
  }
`
