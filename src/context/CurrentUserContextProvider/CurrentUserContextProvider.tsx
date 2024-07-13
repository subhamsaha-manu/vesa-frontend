import { createContext, FC, ReactNode, useContext, useEffect, useMemo, useState } from 'react'

import { getCurrentUserDetails } from './apis/getCurrentUserDetails'

import { CURRENT_USER } from '@/utils/constants'
import { storage } from '@/utils/storage'

export type CurrentUserType = {
  readonly phone: string
  readonly name: string
  readonly email: string
  readonly state: string
  readonly isAdmin: boolean
}

type CurrentUserContextType = {
  currentUser: CurrentUserType
  setCurrentUser: (param: CurrentUserType) => void
}
const CurrentUserContext = createContext<CurrentUserContextType>({} as CurrentUserContextType)
export const CurrentUserContextProvider: FC<{
  value?: CurrentUserContextType
  children: ReactNode
}> = (props) => {
  const [currentUser, setCurrentUser] = useState<CurrentUserType>({} as CurrentUserType)

  useEffect(() => {
    getCurrentUserDetails().then((res) => {
      setCurrentUser(res.data)
      storage.setItem(CURRENT_USER, res.data)
    })
  }, [])

  const context = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
    }),
    [currentUser]
  )

  return <CurrentUserContext.Provider value={context}>{props.children}</CurrentUserContext.Provider>
}

const useCurrentUserContext = () => useContext(CurrentUserContext)

export default useCurrentUserContext
