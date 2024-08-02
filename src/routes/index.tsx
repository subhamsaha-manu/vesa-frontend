import React, { lazy, Suspense } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'

import { protectedRoutes } from './protected'
import { publicRoutes } from './public'

import { useAuthenticationContext } from '@/features/auth'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { MainLayout } from '@/components/Layout'

import { Dashboard } from '@/features/dashboard'

import { CategoryProducts, ProductDetails } from '@/features/product'

const AboutUs = lazy(() => import('@/features/about-us'))
const ContactUs = lazy(() => import('@/features/contact-us'))
const UserCart = lazy(() => import('@/features/user-cart'))
const Checkout = lazy(() => import('@/features/user-cart'))
const UserWishlist = lazy(() => import('@/features/user-wishlist'))
const Addresses = lazy(() => import('@/features/user-shipping-address'))

const App = () => {
  return (
    <MainLayout>
      <Suspense fallback={<SpinnerContainer />}>
        <Outlet />
      </Suspense>
    </MainLayout>
  )
}

export const AppRoutes = () => {
  const { isAuthenticated } = useAuthenticationContext()

  const commonRoute = [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/',
          element: <Dashboard />,
        },
        {
          path: 'product-category/:categoryName',
          element: <CategoryProducts />,
        },
        {
          path: 'product/:productId',
          element: <ProductDetails />,
        },
        {
          path: 'cart',
          element: <UserCart />,
        },
        {
          path: 'wishlist',
          element: <UserWishlist />,
        },
        {
          path: 'checkout',
          element: <Checkout />,
        },
        {
          path: 'about-us',
          element: <AboutUs />,
        },
        {
          path: 'contact-us',
          element: <ContactUs />,
        },
        {
          path: '/account',
          element: <Addresses />,
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ]

  const routes = isAuthenticated ? protectedRoutes : publicRoutes
  const element = useRoutes([...routes, ...commonRoute])

  return <>{element}</>
}
