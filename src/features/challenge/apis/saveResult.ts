import gql from 'graphql-tag'

export const saveResult = gql`
  mutation saveResult($saveResultInput: SaveResultInput!) {
    saveResult(saveResultInput: $saveResultInput)
  }
`
