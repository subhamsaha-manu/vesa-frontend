import gql from 'graphql-tag'

export const verifyOtp = gql`
  mutation verifyOtp($sendTo: String!, $contactMethod: AuthByType!, $otp: String!) {
    verifyOtp(sendTo: $sendTo, contactMethod: $contactMethod, otp: $otp) {
      isVerified
      userId
    }
  }
`
