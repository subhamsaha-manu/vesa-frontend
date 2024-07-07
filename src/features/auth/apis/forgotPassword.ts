import gql from 'graphql-tag'

export const forgotPassword = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`
