import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import { formatProductionURL } from '@/apollo/utils'
import { storage } from '@/utils/storage'

const isProduction = process.env.NODE_ENV === 'production'
const url = isProduction
  ? formatProductionURL(process.env.REACT_APP_VESA_BACKEND_PRODUCTION_URL!)
  : process.env.REACT_APP_VESA_BACKEND_DEVELOPMENT_URL

console.info({ isProduction, url })
const httpLink = createHttpLink({
  uri: `${url}/graphql`,
})

const authLink = setContext((_, { headers }) => {
  const bearerToken = storage.getItem('AUTH_TOKEN')
  return {
    headers: {
      ...headers,
      authorization: bearerToken ? `Bearer ${bearerToken}` : '',
    },
  }
})

export const getClient = () => {
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })
}
