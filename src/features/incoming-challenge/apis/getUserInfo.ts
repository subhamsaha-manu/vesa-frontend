import gql from 'graphql-tag'

export const getUserInfo = gql`
  query getUserInfo($userId: ID!) {
    getUserInfo(userId: $userId) {
      uuid
      name
    }
  }
`
