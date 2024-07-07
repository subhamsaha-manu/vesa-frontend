import React, { Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { MainLayout } from '@/components/Layout'
import { CurrentUserProvider } from '@/features/auth'
import { lazyImport } from '@/utils/lazyImport'

const { Dashboard } = lazyImport(() => import('@/features/dashboard'), 'Dashboard')

const { MyAccount } = lazyImport(() => import('@/features/account'), 'MyAccount')
const { ChangePassword } = lazyImport(() => import('@/features/change-password'), 'ChangePassword')
const { AdminSettingsRoutes } = lazyImport(() => import('@/features/admin'), 'AdminSettingsRoutes')

const App = () => {
  return (
    <CurrentUserProvider>
      <MainLayout>
        <Suspense fallback={<SpinnerContainer />}>
          <Outlet />
        </Suspense>
      </MainLayout>
    </CurrentUserProvider>
  )
}

export const protectedRoutes = [
  {
    path: '/app',
    element: <App />,
    children: [
      { path: 'admin-settings/*', element: <AdminSettingsRoutes /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'my-account', element: <MyAccount /> },
      { path: 'change-password', element: <ChangePassword /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
]
