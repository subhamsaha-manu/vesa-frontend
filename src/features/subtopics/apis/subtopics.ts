import gql from 'graphql-tag'

export const subtopics = gql`
  query subtopics($topicId: ID!) {
    subtopics(topicId: $topicId) {
      uuid
      name
      ... on Subtopic {
        description
        difficulty
        type
      }
    }
  }
`
