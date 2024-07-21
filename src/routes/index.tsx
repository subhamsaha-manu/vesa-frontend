import React, { Suspense } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'

import { protectedRoutes } from './protected'
import { publicRoutes } from './public'

import { useAuthenticationContext } from '@/features/auth'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { MainLayout } from '@/components/Layout'

import { Dashboard } from '@/features/dashboard'

import { CategoryProducts, ProductDetails } from '@/features/product'
import { UserCart } from '@/features/user-cart'

const AboutUs = React.lazy(() => import('@/features/about-us'))

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
          path: '/product-category/:categoryName',
          element: <CategoryProducts />,
        },
        {
          path: '/product/:productId',
          element: <ProductDetails />,
        },
        {
          path: '/cart',
          element: <UserCart />,
        },
        {
          path: 'about-us',
          element: <AboutUs />,
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
