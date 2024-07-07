import gql from 'graphql-tag'

export const addQuestion = gql`
  mutation addQuestion($input: AddQuestionInput!) {
    addQuestion(input: $input)
  }
`
