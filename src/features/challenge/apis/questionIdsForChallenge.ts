import gql from 'graphql-tag'

export const questionIdsForChallenge = gql`
  query questionIdsForChallenge($challengeId: ID!) {
    questionIdsForChallenge(challengeId: $challengeId)
  }
`
