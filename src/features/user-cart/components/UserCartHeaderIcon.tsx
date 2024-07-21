import React, { FC } from 'react'
import { Flex } from '@chakra-ui/react'
import { ShoppingBasket01Icon } from 'hugeicons-react'
import { useNavigate } from 'react-router-dom'
import useUserCartContextProvider from '@/context/UserCartContextProvider'
import { Text } from '@chakra-ui/layout'

export const UserCartHeaderIcon: FC = () => {
  const navigate = useNavigate()
  const { numberOfCartItems } = useUserCartContextProvider()
  return (
    <>
      <Flex
        display-name="user-cart-header-icon"
        gap={2}
        _hover={{ color: '#FFFFFF', cursor: 'pointer', position: 'relative' }}
      >
        <ShoppingBasket01Icon size={22} onClick={() => navigate('/cart')} />
      </Flex>
      {numberOfCartItems > 0 && (
        <Flex
          display-name="cart-items-count"
          style={{
            position: 'absolute',
            top: '40px',
            right: '84px',
            background: '#a1be28',
            borderRadius: '50%',
            height: '25px',
            width: '25px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text fontWeight={700}>{numberOfCartItems}</Text>
        </Flex>
      )}
    </>
  )
}
