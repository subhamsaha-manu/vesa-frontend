import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import { TOKEN } from '@/utils/constants'
import { storage } from '@/utils/storage'

const isProduction = process.env.NODE_ENV === 'production'

const url = isProduction
  ? process.env.REACT_APP_VESA_BACKEND_PRODUCTION_URL
  : process.env.REACT_APP_VESA_BACKEND_DEVELOPMENT_URL

const httpLink = createHttpLink({
  uri: `${url}/graphql`,
})

const authLink = setContext((_, { headers }) => {
  const authToken = storage.getItem(TOKEN)
  return {
    headers: {
      ...headers,
      authorization: authToken ? `Bearer ${authToken}` : '',
    },
  }
})

export const getClient = () => {
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })
}
