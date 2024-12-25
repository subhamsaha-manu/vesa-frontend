import { Flex, Text } from '@chakra-ui/react'
import { FavouriteIcon } from 'hugeicons-react'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import useCurrentUserContext from '@/context/CurrentUserContextProvider'
import useUserWishlistCartContextProvider from '@/context/UserWishlistCartContextProvider'
import { useWindowSize } from '@/hooks/useWindowSize'

export const UserWishlistHeaderIcon: FC = () => {
  const navigate = useNavigate()

  const { currentUser } = useCurrentUserContext()

  const { wishlistItems } = useUserWishlistCartContextProvider()

  const size = useWindowSize()

  const { width } = size

  const isMobile = width && width < 768

  return (
    <>
      <Flex
        display-name="user-wishlist-header-icon"
        gap={2}
        _hover={{ color: '#FFFFFF', cursor: 'pointer', position: 'relative' }}
      >
        <FavouriteIcon
          size={isMobile ? 18 : 22}
          onClick={() => {
            if (currentUser?.userId) {
              navigate('/wishlist')
            } else {
              navigate('/auth')
            }
          }}
        />
      </Flex>
      {wishlistItems?.length > 0 && (
        <Flex
          display-name="wishlist-items-count"
          style={{
            position: 'absolute',
            top: isMobile ? '15px' : '40px',
            right: isMobile ? '58px' : '140px',
            background: '#a1be28',
            borderRadius: '50%',
            height: isMobile ? '15px' : '25px',
            width: isMobile ? '15px' : '25px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text fontSize={{ base: 'xs', xl: 'md' }} fontWeight={{ base: '300', xl: '700' }}>
            {wishlistItems?.length}
          </Text>
        </Flex>
      )}
    </>
  )
}
