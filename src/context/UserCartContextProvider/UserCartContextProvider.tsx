import { createContext, FC, ReactNode, useContext, useEffect, useMemo, useState } from 'react'

import { UserCartContextType } from './types'
import { useUserCartOperationQuery } from './api/userCart.generated'
import { useUserWishlistOperationQuery } from './api/userWishlist.generated'

const UserCartContext = createContext<UserCartContextType>({} as UserCartContextType)

export const UserCartContextProvider: FC<{
  value?: UserCartContextType
  children: ReactNode
}> = (props) => {
  const [numberOfCartItems, setNumberOfCartItems] = useState<number>(0)
  const [wishlistItems, setWishlistItems] = useState<Array<string>>([])

  const { data } = useUserCartOperationQuery({
    variables: {
      userId: 'ba99f941-347a-4d86-87ae-aa20fae0e30e',
    },
    fetchPolicy: 'network-only',
  })

  const { data: userWishlistData } = useUserWishlistOperationQuery({
    variables: {
      userId: 'ba99f941-347a-4d86-87ae-aa20fae0e30e',
    },
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

  return <UserCartContext.Provider value={context}>{props.children}</UserCartContext.Provider>
}

const useUserCartContextProvider = () => useContext(UserCartContext)

export default useUserCartContextProvider
