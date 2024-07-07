import gql from 'graphql-tag'

export const isChallengeActive = gql`
  query isChallengeActive($challengeId: ID!) {
    isChallengeActive(challengeId: $challengeId)
  }
`
