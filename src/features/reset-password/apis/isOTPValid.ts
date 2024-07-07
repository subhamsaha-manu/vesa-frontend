import gql from 'graphql-tag'

export const isOTPValid = gql`
  query isOTPValid($email: String!, $otp: String!) {
    isOTPValid(email: $email, otp: $otp)
  }
`
