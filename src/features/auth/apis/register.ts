import gql from 'graphql-tag'

export const register = gql`
  mutation register($input: RegisterUserInput!) {
    register(registerUserInput: $input)
  }
`
