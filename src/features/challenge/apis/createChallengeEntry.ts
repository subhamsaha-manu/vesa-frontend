import gql from 'graphql-tag'

export const createChallengeEntry = gql`
  mutation createChallengeEntry($challengeId: ID!) {
    createChallengeEntry(challengeId: $challengeId)
  }
`
