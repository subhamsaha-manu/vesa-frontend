import { isEmpty } from 'lodash'
import React, { createContext, FC, ReactNode, useContext, useMemo, useState } from 'react'

import { storage } from '@/utils/storage'

type AuthenticationContextType = {
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
}

type AuthenticationProviderProps = {
  children: ReactNode
  value?: AuthenticationContextType
}
const AuthenticationContext = createContext<AuthenticationContextType>(
  {} as AuthenticationContextType
)
export const AuthenticationProvider: FC<AuthenticationProviderProps> = ({ children }) => {
  const token = storage.getItem('AUTH_TOKEN')
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!isEmpty(token))

  const context = useMemo(
    () => ({
      isAuthenticated,
      setIsAuthenticated,
    }),
    [isAuthenticated]
  )

  return (
    <AuthenticationContext.Provider value={context}> {children} </AuthenticationContext.Provider>
  )
}

export const useAuthenticationContext = () => useContext(AuthenticationContext)
