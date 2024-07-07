import gql from 'graphql-tag'

export const questions = gql`
  query questions($subtopicId: ID) {
    questions(subtopicId: $subtopicId) {
      uuid
      title
      weight
      choices {
        uuid
        title
        isCorrect
      }
    }
  }
`
