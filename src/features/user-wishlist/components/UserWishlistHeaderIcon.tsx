import React, { FC } from 'react'
import { Flex } from '@chakra-ui/react'
import { FavouriteIcon } from 'hugeicons-react'
import { useNavigate } from 'react-router-dom'
import useUserCartContextProvider from '@/context/UserCartContextProvider'
import { Text } from '@chakra-ui/layout'

export const UserWishlistHeaderIcon: FC = () => {
  const navigate = useNavigate()
  const { wishlistItems } = useUserCartContextProvider()
  return (
    <>
      <Flex
        display-name="user-wishlist-header-icon"
        gap={2}
        _hover={{ color: '#FFFFFF', cursor: 'pointer', position: 'relative' }}
      >
        <FavouriteIcon size={22} onClick={() => navigate('/wishlist')} />
      </Flex>
      {wishlistItems.length > 0 && (
        <Flex
          display-name="wishlist-items-count"
          style={{
            position: 'absolute',
            top: '40px',
            right: '140px',
            background: '#a1be28',
            borderRadius: '50%',
            height: '25px',
            width: '25px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text fontWeight={700}>{wishlistItems.length}</Text>
        </Flex>
      )}
    </>
  )
}
