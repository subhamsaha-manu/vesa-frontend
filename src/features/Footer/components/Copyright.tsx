import { Text } from '@chakra-ui/layout'
import { Flex } from '@chakra-ui/react'
import React, { FC } from 'react'

export const Copyright: FC = () => (
  <Flex w="100%" mt="30px" p={{ base: '0 20px', xl: '0' }}>
    <Text fontSize="sm" color="subtle">
      Copyright &copy; {new Date().getFullYear()}, VESA All Rights Reserved.
    </Text>
  </Flex>
)
