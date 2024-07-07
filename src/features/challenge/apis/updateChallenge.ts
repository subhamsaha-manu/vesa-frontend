import gql from 'graphql-tag'

export const updateChallenge = gql`
  mutation updateChallenge($challengeId: ID!, $status: ChallengeStatus!) {
    updateChallenge(challengeId: $challengeId, status: $status)
  }
`
