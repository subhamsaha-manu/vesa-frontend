import { Container, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

export const Footer = () => {
  return (
    <Container
      as="footer"
      py={{ base: '4', md: '5' }}
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      maxW="9xl"
    >
      <Stack spacing={{ base: '1', md: '2' }}>
        {/*<Stack justify="space-between" direction="row" align="center">*/}
        {/*  <Logo />*/}
        {/*  <SocialMediaLinks />*/}
        {/*</Stack>*/}
        <Text fontSize="sm" color="subtle">
          &copy; {new Date().getFullYear()} All rights reserved.
        </Text>
      </Stack>
    </Container>
  )
}
