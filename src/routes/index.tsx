import React, { lazy, Suspense } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'

import { protectedRoutes } from './protected'
import { publicRoutes } from './public'

import { useAuthenticationContext } from '@/features/auth'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { ErrorFallback, MainLayout } from '@/components/Layout'

import { Dashboard } from '@/features/dashboard'

import { CategoryProducts, ProductDetailsContainer } from '@/features/product'
import { Checkout } from '@/features/user-cart'
import { CurrentUserContextProvider } from '@/context'
import { ErrorBoundary } from 'react-error-boundary'
//import OrderDetails from '@/features/user-order-history/components/OrderDetails'

const AboutUs = lazy(() => import('@/features/about-us'))
const ContactUs = lazy(() => import('@/features/contact-us'))
const UserCart = lazy(() => import('@/features/user-cart'))

const UserWishlist = lazy(() => import('@/features/user-wishlist'))
const UserAccount = lazy(() => import('@/features/account'))
const Orders = lazy(() =>
  import('@/features/user-order-history').then((module) => ({ default: module.Orders }))
)
const OrderDetails = lazy(() =>
  import('@/features/user-order-history').then((module) => ({ default: module.OrderDetails }))
)
const Addresses = lazy(() => import('@/features/user-shipping-address'))

const App = () => {
  return (
    <CurrentUserContextProvider>
      <MainLayout>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<SpinnerContainer />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </MainLayout>
    </CurrentUserContextProvider>
  )
}

export const AppRoutes = () => {
  const { isAuthenticated } = useAuthenticationContext()

  const accountRoutes = {
    path: 'account',
    element: (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <UserAccount />
      </ErrorBoundary>
    ),
    children: [
      { path: 'addresses', element: <Addresses /> },
      { path: 'orders', element: <Orders /> },
      { path: 'orders/:orderId', element: <OrderDetails /> },
    ],
  }

  const commonRoutes = [
    {
      path: '/',
      element: <App />,
      children: [
        { path: '/', element: <Dashboard /> },
        { path: 'product-category/:categoryName', element: <CategoryProducts /> },
        { path: 'product/:productId', element: <ProductDetailsContainer /> },
        { path: 'cart', element: <UserCart /> },
        { path: 'wishlist', element: <UserWishlist /> },
        { path: 'checkout', element: <Checkout /> },
        { path: 'about-us', element: <AboutUs /> },
        { path: 'contact-us', element: <ContactUs /> },
        accountRoutes,
      ],
    },
  ]

  const fallbackRoute = { path: '*', element: <Navigate to="/" replace /> }

  const routes = isAuthenticated
    ? [...commonRoutes, ...protectedRoutes]
    : [...commonRoutes, ...publicRoutes]

  return useRoutes(routes)
}
