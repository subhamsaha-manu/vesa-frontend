import gql from 'graphql-tag'

export const sendChallenge = gql`
  mutation sendChallenge($input: SendChallengeInput!) {
    sendChallenge(input: $input)
  }
`
