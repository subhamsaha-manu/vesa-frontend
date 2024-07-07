import gql from 'graphql-tag'

export const isLoginViaSocialAppSuccessful = gql`
  query isLoginViaSocialAppSuccessful($email: String!) {
    isLoginViaSocialAppSuccessful(email: $email) {
      token
    }
  }
`
