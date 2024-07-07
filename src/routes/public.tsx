import React from 'react'

import { AuthRoutes } from '@/features/auth'
import { ResetPassword } from '@/features/reset-password'

export const publicRoutes = [
  {
    path: '/auth/*',
    element: <AuthRoutes />,
  },
  {
    path: 'reset-password/:userEmail',
    element: <ResetPassword />,
  },
]
