import { Box, Flex, Heading, Stack, useColorModeValue } from '@chakra-ui/react'
import React, { FC, ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
  headerText?: string
}

export const Layout: FC<LayoutProps> = ({ children, headerText }: LayoutProps) => {
  return (
    <Flex
      minH={{ base: '100vh', md: '85vh' }}
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
      display-name="layout-flex"
    >
      <Stack spacing={4} mx="auto" maxW="lg" px={6} display-name="layout-container-stack">
        <Stack align="center" display-name="layout-header-container">
          <Heading fontSize="4xl">{headerText}</Heading>
          {/*<Text fontSize="lg" color="gray.600">*/}
          {/*  to enjoy all of our cool{' '}*/}
          {/*  <Link href="/faq" color="blue.400">*/}
          {/*    features*/}
          {/*  </Link>{' '}*/}
          {/*  ✌️*/}
          {/*</Text>*/}
        </Stack>
        <Box rounded="lg" bg="azure" boxShadow="lg" p={8} display-name="layout-box-child-container">
          {children}
        </Box>
      </Stack>
    </Flex>
  )
}
