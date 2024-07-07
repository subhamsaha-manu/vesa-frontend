import gql from 'graphql-tag'

export const isChallengeAccepted = gql`
  query isChallengeAccepted($challengeId: ID!, $challengedUserUuid: ID!) {
    isChallengeAccepted(challengeId: $challengeId, challengedUserUuid: $challengedUserUuid)
  }
`
