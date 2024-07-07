import { onError } from '@apollo/client/link/error'

const logoutRedirect = () => (window.location.href = '/users/sign_in/#/')

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const linkError = onError(({ networkError, graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    })
    if (graphQLErrors[0]?.extensions?.response === 401) {
      return logoutRedirect()
    }
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (networkError.statusCode === 401) {
      return logoutRedirect()
    }
  }
})
