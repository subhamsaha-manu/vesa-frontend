import gql from 'graphql-tag'

export const mainTopics = gql`
  query mainTopics {
    mainTopics {
      uuid
      name
      ... on MainTopic {
        description
        type
      }
    }
  }
`
