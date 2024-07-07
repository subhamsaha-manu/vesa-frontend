import gql from 'graphql-tag'

export const isOldPasswordValid = gql`
  query isOldPasswordValid($oldPassword: String!) {
    isOldPasswordValid(oldPassword: $oldPassword)
  }
`
