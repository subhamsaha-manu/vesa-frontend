import gql from 'graphql-tag'

export const getAllOtherLoggedInUsers = gql`
  query getAllOtherLoggedInUsers {
    getAllOtherLoggedInUsers {
      uuid
      name
      isLoggedIn
      stars
    }
  }
`
