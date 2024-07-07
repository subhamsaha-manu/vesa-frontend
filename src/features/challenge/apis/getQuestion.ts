import gql from 'graphql-tag'

export const getQuestion = gql`
  query getQuestion($questionId: ID!) {
    getQuestion(questionId: $questionId) {
      uuid
      title
      choices {
        uuid
        title
        isCorrect
      }
    }
  }
`
