import { ApolloProvider } from '@apollo/client'
import { ChakraProvider, Flex, Heading, Image, VStack } from '@chakra-ui/react'
import React, { FC, ReactNode, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter } from 'react-router-dom'

import { getClient } from '@/apollo/client'
import img from '@/assets/illustrations/SomethingWentWrong.png'
import { SpinnerContainer } from '@/components/elements/Spinner'
import { AuthenticationProvider } from '@/features/auth/components/AuthenticationProvider'
import theme from '@/utils/theme'
import { CategoriesContextProvider } from '@/context'

const ERROR_HEADING = "Oops! Something's  wrong."
const ERROR_DESCRIPTION = 'Try refreshing the app.'

export const ErrorFallback = () => {
  return (
    <Flex
      h="65vh"
      width="100%"
      justify="center"
      alignItems="center"
      data-testid="error-fallback-container"
    >
      <VStack spacing="3">
        <Image src={img} alt="Error" />
        <Heading size="lg" data-testid="error-heading">
          {ERROR_HEADING}
        </Heading>
        <Heading size="md" color="info.160">
          {ERROR_DESCRIPTION}
        </Heading>
      </VStack>
    </Flex>
  )
}

type AppProviderProps = {
  children: ReactNode
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <Suspense fallback={<SpinnerContainer height="60vh" />}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <BrowserRouter>
            <ApolloProvider client={getClient()}>
              <AuthenticationProvider>
                <CategoriesContextProvider>{children}</CategoriesContextProvider>
              </AuthenticationProvider>
            </ApolloProvider>
          </BrowserRouter>
        </ErrorBoundary>
      </Suspense>
    </ChakraProvider>
  )
}
