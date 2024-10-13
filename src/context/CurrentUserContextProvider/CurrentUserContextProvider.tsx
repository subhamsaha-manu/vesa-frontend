import { createContext, FC, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { CurrentUserContextType } from './types'
import { User } from '@/types'
import { useUserDetailQuery } from './apis/getCurrentUserDetails.generated'
import { storage } from '@/utils/storage'
import { TOKEN } from '@/utils/constants'

const CurrentUserContext = createContext<CurrentUserContextType>({} as CurrentUserContextType)

export const CurrentUserContextProvider: FC<{
  value?: CurrentUserContextType
  children: ReactNode
}> = (props) => {
  const [currentUser, setCurrentUser] = useState<User>({} as User)
  const authToken = storage.getItem(TOKEN)

  const { data } = useUserDetailQuery({
    skip: !authToken,
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    if (data) {
      setCurrentUser(data.userDetail)
    }
  }, [data])

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
