import gql from 'graphql-tag'

export const currentUser = gql`
  query currentUser {
    currentUser {
      uuid
      name
      email
      mobileNumber
      isLoggedIn
      stars
      score
      roles
    }
  }
`
