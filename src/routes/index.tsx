import React from 'react'
import { useRoutes } from 'react-router-dom'

import { protectedRoutes } from './protected'
import { publicRoutes } from './public'

import { useAuthenticationContext } from '@/features/auth'
import { Landing } from '@/features/misc'

export const AppRoutes = () => {
  const { isAuthenticated } = useAuthenticationContext()

  const commonRoute = [
    {
      path: '*',
      element: <Landing />,
    },
  ]

  const routes = isAuthenticated ? protectedRoutes : publicRoutes
  const element = useRoutes([...routes, ...commonRoute])

  return <>{element}</>
}
