import gql from 'graphql-tag'

export const updatePassword = gql`
  mutation updatePassword($newPassword: String!, $userEmail: String) {
    updatePassword(newPassword: $newPassword, userEmail: $userEmail)
  }
`
