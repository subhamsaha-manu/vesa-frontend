import React from 'react'

import { ResetPassword } from '@/features/reset-password'

export const publicRoutes = [
  {
    path: 'reset-password/:userEmail',
    element: <ResetPassword />,
  },
]
