import { Button, Flex, Text } from '@chakra-ui/react'
import { ShoppingCartRemove01Icon } from 'hugeicons-react'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

type EmptyCartProps = {
  isMobile: boolean
}

export const EmptyCart: FC<EmptyCartProps> = ({ isMobile }) => {
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
      <ShoppingCartRemove01Icon size={isMobile ? 50 : 100} />
      <Text fontSize={isMobile ? 'md' : 'lg'}>Your cart is currently empty.</Text>
      <Button
        variant="solid"
        size={isMobile ? 'md' : 'lg'}
        color="white"
        background="#a1be28"
        _hover={{ background: 'white', color: '#a1be28', border: '1px solid #a1be28' }}
        borderRadius={isMobile ? '20px' : '40px'}
        onClick={() => navigate('/')}
      >
        Return to Shop
      </Button>
    </Flex>
  )
}
