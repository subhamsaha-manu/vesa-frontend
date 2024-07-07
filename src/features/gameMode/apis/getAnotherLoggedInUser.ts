import gql from 'graphql-tag'

export const getAnotherLoggedInUser = gql`
  query getAnotherLoggedInUser {
    getAnotherLoggedInUser {
      uuid
      name
      stars
    }
  }
`
