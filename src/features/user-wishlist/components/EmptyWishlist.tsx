import React, { FC } from 'react'
import { Flex, Text } from '@chakra-ui/react'

export const EmptyWishlist: FC = () => {
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
      <Text fontSize="lg">No products added to the wishlist.</Text>
    </Flex>
  )
}
