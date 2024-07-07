import gql from 'graphql-tag'

export const isInviteAccepted = gql`
  query isInviteAccepted($challengeId: String!) {
    isInviteAccepted(challengeId: $challengeId)
  }
`
