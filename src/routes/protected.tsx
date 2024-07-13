import React, { Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { MainLayout } from '@/components/Layout'

import { lazyImport } from '@/utils/lazyImport'
import { CurrentUserContextProvider } from '@/context'

const { Dashboard } = lazyImport(() => import('@/features/dashboard'), 'Dashboard')

const { ChangePassword } = lazyImport(() => import('@/features/change-password'), 'ChangePassword')
const { AdminSettingsRoutes } = lazyImport(() => import('@/features/admin'), 'AdminSettingsRoutes')

const App = () => {
  return (
    <CurrentUserContextProvider>
      <MainLayout>
        <Suspense fallback={<SpinnerContainer />}>
          <Outlet />
        </Suspense>
      </MainLayout>
    </CurrentUserContextProvider>
  )
}

export const protectedRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'admin-settings/*', element: <AdminSettingsRoutes /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'change-password', element: <ChangePassword /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
]
