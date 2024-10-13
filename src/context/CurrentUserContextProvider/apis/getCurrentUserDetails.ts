import gql from 'graphql-tag'

export const userDetail = gql`
  query userDetail {
    userDetail {
      userId
      name
      email
      phoneNumber
      isAdmin
    }
  }
`
