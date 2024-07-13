import { Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { Mail01Icon, WhatsappIcon } from 'hugeicons-react'

export const Footer = () => {
  return (
    <Flex
      w="100%"
      flexDir="column"
      color={useColorModeValue('gray.700', 'gray.200')}
      borderTop="1px solid #e6e6e6"
    >
      <Flex
        w="100%"
        display-name="customer-care-flex"
        maxW="1230px"
        margin="auto"
        p="40px 0 20px 0"
      >
        <Flex align="flex-start" w="100%" flexDir="column" gap={4}>
          <Heading size="md">Customer Care</Heading>
          <Flex display-name="mobile" gap={2}>
            <WhatsappIcon size={24} color="#25d366" />
            <Text fontSize="sm">+91 9876543210</Text>
          </Flex>
          <Flex display-name="mobile" gap={2}>
            <Mail01Icon size={24} color="#25d366" />
            <Text fontSize="sm">myvesa@gmail.com</Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex w="100%" p="20px 0" h="66px" background="#e5e2db">
        <Flex w="100%" maxW="1230px" margin="auto">
          <Text fontSize="sm" color="subtle">
            Copyright &copy; {new Date().getFullYear()}, VESA All Rights Reserved.
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
