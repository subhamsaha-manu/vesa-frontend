import gql from 'graphql-tag'

export const updateCategory = gql`
  mutation updateCategory($categoryId: UUID!, $updateCategoryInput: UpdateCategoryInput!) {
    updateCategory(categoryId: $categoryId, updateCategoryInput: $updateCategoryInput)
  }
`
