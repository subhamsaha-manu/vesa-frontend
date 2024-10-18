import gql from 'graphql-tag'

export const contactUs = gql`
  mutation contactUs($name: String!, $email: String!, $phoneNumber: String!) {
    contactUs(name: $name, email: $email, phoneNumber: $phoneNumber)
  }
`
