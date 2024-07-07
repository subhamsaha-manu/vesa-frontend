import gql from 'graphql-tag'

export const sendChallengeAndInvite = gql`
  mutation sendChallengeAndInvite($email: String!, $host: String!) {
    sendChallengeAndInvite(email: $email, host: $host)
  }
`
