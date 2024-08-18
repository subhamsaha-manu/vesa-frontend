import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import React, { FC, ReactNode, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter } from 'react-router-dom'

import { getClient } from '@/apollo/client'
import { SpinnerContainer } from '@/components/elements/Spinner'
import { AuthenticationProvider } from '@/features/auth/components/AuthenticationProvider'
import theme from '@/utils/theme'
import { CategoriesContextProvider } from '@/context'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { ErrorFallback } from '@/components/Layout'

type AppProviderProps = {
  children: ReactNode
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <Suspense fallback={<SpinnerContainer height="60vh" />}>
        <ErrorBoundary fallback={<ErrorFallback />}>
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
