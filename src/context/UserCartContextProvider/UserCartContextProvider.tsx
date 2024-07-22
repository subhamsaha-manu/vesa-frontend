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
      userId: '286ead03-759a-4748-a802-e2a5e1fc1371',
    },
    fetchPolicy: 'network-only',
  })

  const { data: userWishlistData } = useUserWishlistOperationQuery({
    variables: {
      userId: '286ead03-759a-4748-a802-e2a5e1fc1371',
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
