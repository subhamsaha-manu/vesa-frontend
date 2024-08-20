import gql from 'graphql-tag'

export const requestOtp = gql`
  mutation requestOtp($sendTo: String!, $contactMethod: AuthByType!) {
    requestOtp(sendTo: $sendTo, contactMethod: $contactMethod)
  }
`
