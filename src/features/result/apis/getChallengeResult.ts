import gql from 'graphql-tag'

export const getChallengeResult = gql`
  query getChallengeResult($challengeId: ID!) {
    getChallengeResult(challengeId: $challengeId) {
      score
      outcome
      basedOnTime
    }
  }
`
