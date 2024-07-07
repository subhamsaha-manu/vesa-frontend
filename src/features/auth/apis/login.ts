import { gql } from '@apollo/client'

export const login = gql`
  mutation login($input: LoginUserInput!) {
    login(input: $input) {
      name
      token
      message
    }
  }
`
