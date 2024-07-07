import gql from 'graphql-tag'

export const updateQuestion = gql`
  mutation updateQuestion($questionId: ID!, $input: UpdateQuestionInput!) {
    updateQuestion(questionId: $questionId, input: $input)
  }
`
