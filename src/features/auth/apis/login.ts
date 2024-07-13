import gql from 'graphql-tag'

export const login = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`
