import { ApolloProvider } from '@apollo/client'
import { NextUIProvider } from '@nextui-org/react'
import { FC, ReactNode, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter } from 'react-router-dom'

import { getClient } from '@/apollo/client'
import { SpinnerContainer } from '@/components/elements/Spinner'
import { ErrorFallback } from '@/components/Layout'
import { Provider } from '@/components/ui/provider'
import { Toaster } from '@/components/ui/toaster'
import { CategoriesContextProvider } from '@/context'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

type AppProviderProps = {
  children: ReactNode
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  return (
    <NextUIProvider>
      <Provider>
        <Suspense fallback={<SpinnerContainer height="60vh" />}>
          <ErrorBoundary fallback={<ErrorFallback />}>
            <BrowserRouter basename="/">
              <ApolloProvider client={getClient()}>
                <Toaster />
                <CategoriesContextProvider>{children}</CategoriesContextProvider>
              </ApolloProvider>
            </BrowserRouter>
          </ErrorBoundary>
        </Suspense>
      </Provider>
    </NextUIProvider>
  )
}
