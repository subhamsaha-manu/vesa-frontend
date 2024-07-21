import React, { FC } from 'react'
import { Button, Flex, Text } from '@chakra-ui/react'
import { ShoppingCartRemove01Icon } from 'hugeicons-react'
import { useNavigate } from 'react-router-dom'

export const EmptyCart: FC = () => {
  const navigate = useNavigate()

  return (
    <Flex
      display-name="empty-cart"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      w="100%"
      h="55vh"
      gap={6}
    >
      <ShoppingCartRemove01Icon size={100} />
      <Text fontSize="lg">Your cart is currently empty.</Text>
      <Button
        variant="solid"
        size="lg"
        color="white"
        background="#d9121f"
        _hover={{ background: 'white', color: '#d9121f', border: '1px solid #d9121f' }}
        borderRadius="40px"
        onClick={() => navigate('/')}
      >
        Return to Shop
      </Button>
    </Flex>
  )
}
