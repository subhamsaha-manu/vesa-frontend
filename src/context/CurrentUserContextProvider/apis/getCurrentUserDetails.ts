import gql from 'graphql-tag'

export const userDetail = gql`
  query userDetail($userId: ID!) {
    userDetail(userId: $userId) {
      userId
      name
      email
      phoneNumber
      isAdmin
    }
  }
`
