import gql from 'graphql-tag'

export const addCategory = gql`
  mutation addCategory($addCategoriesInput: AddCategoryInput!) {
    addCategory(addCategoriesInput: $addCategoriesInput)
  }
`
