import gql from 'graphql-tag'

export const deleteQuestions = gql`
  mutation deleteQuestions($questionIds: [ID!]!) {
    deleteQuestions(questionIds: $questionIds)
  }
`
