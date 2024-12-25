import { Flex, Text } from '@chakra-ui/react'
import { ShoppingBasket01Icon } from 'hugeicons-react'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import useCurrentUserContext from '@/context/CurrentUserContextProvider'
import useUserWishlistCartContextProvider from '@/context/UserWishlistCartContextProvider'
import { useWindowSize } from '@/hooks/useWindowSize'

export const UserCartHeaderIcon: FC = () => {
  const navigate = useNavigate()
  const { currentUser } = useCurrentUserContext()

  const { numberOfCartItems } = useUserWishlistCartContextProvider()

  const size = useWindowSize()
  const { width } = size
  const isMobile = width && width < 768

  return (
    <>
      <Flex
        display-name="user-cart-header-icon"
        gap={2}
        _hover={{ color: '#FFFFFF', cursor: 'pointer', position: 'relative' }}
      >
        <ShoppingBasket01Icon
          size={isMobile ? 18 : 22}
          onClick={() => {
            if (currentUser?.userId) {
              navigate('/cart')
            } else {
              navigate('/auth')
            }
          }}
        />
      </Flex>
      {numberOfCartItems > 0 && (
        <Flex
          display-name="cart-items-count"
          style={{
            position: 'absolute',
            top: isMobile ? '15px' : '40px',
            right: isMobile ? '22px' : '84px',
            background: '#a1be28',
            borderRadius: '50%',
            height: isMobile ? '15px' : '25px',
            width: isMobile ? '15px' : '25px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text fontSize={{ base: 'xs', xl: 'md' }} fontWeight={{ base: '300', xl: '700' }}>
            {numberOfCartItems}
          </Text>
        </Flex>
      )}
    </>
  )
}
