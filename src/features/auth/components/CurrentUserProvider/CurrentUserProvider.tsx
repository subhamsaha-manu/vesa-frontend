import React, { createContext, useContext } from 'react'

import { useCurrentUserQuery } from '../../apis/currentUser.generated'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { ErrorFallback } from '@/providers/app'
import { User } from '@/types'

interface CurrentUserProviderProps {
  children: React.ReactNode
}

type CurrentUserContextType = {
  currentUser?: User | undefined | null
}

const CurrentUserContext = createContext<CurrentUserContextType>({} as CurrentUserContextType)

export const CurrentUserProvider: React.FC<CurrentUserProviderProps> = ({ children }) => {
  const { data, loading, error } = useCurrentUserQuery({
    fetchPolicy: 'network-only',
  })

  if (error) {
    return <ErrorFallback />
  }

  if (loading) {
    return <SpinnerContainer height="60vh" />
  }

  const currentUser = data ? data : {}

  return <CurrentUserContext.Provider value={currentUser}> {children} </CurrentUserContext.Provider>
}

export const useCurrentUserContext = () => useContext(CurrentUserContext)
