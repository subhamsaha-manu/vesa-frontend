import { gql } from '@apollo/client'

export const signup = gql`
  mutation signup($input: SignupUserInput!) {
    signup(input: $input) {
      name
      token
      message
    }
  }
`
