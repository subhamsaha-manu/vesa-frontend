import gql from 'graphql-tag'

export const bulkUploadQuestions = gql`
  mutation bulkUploadQuestions($input: [AddQuestionInput!]!) {
    bulkUploadQuestions(input: $input)
  }
`
