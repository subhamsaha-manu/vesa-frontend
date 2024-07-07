import gql from 'graphql-tag'

export const challenges = gql`
  query challenges {
    challenges {
      uuid
      title
      userUuid
      questionIds
      type
      status
    }
  }
`
