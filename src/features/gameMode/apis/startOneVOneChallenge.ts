import gql from 'graphql-tag'

export const startOneVOneChallenge = gql`
  mutation startOneVOneChallenge($input: StartOneVOneChallengeInput!) {
    startOneVOneChallenge(input: $input)
  }
`
