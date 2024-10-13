import { createContext, FC, ReactNode, useContext, useEffect, useMemo, useState } from 'react'

import { UserWishlistCartContextType } from './types'
import { useUserCartOperationQuery } from './api/userCart.generated'
import { useUserWishlistOperationQuery } from './api/userWishlist.generated'
import useCurrentUserContext from '@/context/CurrentUserContextProvider'

const UserWishlistCartContext = createContext<UserWishlistCartContextType>(
  {} as UserWishlistCartContextType
)

export const UserWishlistCartContextProvider: FC<{
  value?: UserWishlistCartContextType
  children: ReactNode
}> = (props) => {
  const {
    currentUser: { userId },
  } = useCurrentUserContext()

  const [numberOfCartItems, setNumberOfCartItems] = useState<number>(0)
  const [wishlistItems, setWishlistItems] = useState<Array<string>>([])

  const { data } = useUserCartOperationQuery({
    variables: {
      userId,
    },
    skip: !userId,
    fetchPolicy: 'network-only',
  })

  const { data: userWishlistData } = useUserWishlistOperationQuery({
    variables: {
      userId,
    },
    skip: !userId,
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    if (data) {
      const totalNumberOfProducts = data.userCart.reduce((total, item) => {
        return total + item.quantity
      }, 0)
      setNumberOfCartItems(totalNumberOfProducts)
    }
  }, [data])

  useEffect(() => {
    if (userWishlistData) {
      setWishlistItems(userWishlistData.userWishlist.map((item) => item.productId))
    }
  }, [userWishlistData])

  const context = useMemo(
    () => ({
      numberOfCartItems,
      setNumberOfCartItems,
      wishlistItems,
      setWishlistItems,
    }),
    [numberOfCartItems, setNumberOfCartItems, wishlistItems, setWishlistItems]
  )

  return (
    <UserWishlistCartContext.Provider value={context}>
      {props.children}
    </UserWishlistCartContext.Provider>
  )
}

const useUserWishlistCartContextProvider = () => useContext(UserWishlistCartContext)

export default useUserWishlistCartContextProvider
