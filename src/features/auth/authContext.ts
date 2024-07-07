import { noop } from 'lodash'
import { createContext } from 'react'

export const authContext = createContext({
  authenticated: false,
  setAuthenticated: (auth: boolean) => {
    noop(auth)
  },
})
