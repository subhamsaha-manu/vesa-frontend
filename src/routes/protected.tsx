import React, { Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { MainLayout } from '@/components/Layout'
import { CurrentUserProvider } from '@/features/auth'
import { lazyImport } from '@/utils/lazyImport'

const { Dashboard } = lazyImport(() => import('@/features/dashboard'), 'Dashboard')
const { ChooseChallengeMode } = lazyImport(
  () => import('@/features/gameMode'),
  'ChooseChallengeMode'
)
const { PlayWithFriend } = lazyImport(() => import('@/features/gameMode'), 'PlayWithFriend')
const { PlayWithRandomOnlineUser } = lazyImport(
  () => import('@/features/gameMode'),
  'PlayWithRandomOnlineUser'
)
const { SubtopicContainer } = lazyImport(() => import('@/features/subtopics'), 'SubtopicContainer')

const { MyAccount } = lazyImport(() => import('@/features/account'), 'MyAccount')
const { ChangePassword } = lazyImport(() => import('@/features/change-password'), 'ChangePassword')
const { AdminSettingsRoutes } = lazyImport(() => import('@/features/admin'), 'AdminSettingsRoutes')
const { ChallengeRoutes } = lazyImport(() => import('@/features/challenge'), 'ChallengeRoutes')

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
      { path: 'sub-topics', element: <SubtopicContainer /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'one-v-one', element: <PlayWithRandomOnlineUser /> },
      { path: 'play-with-friend', element: <PlayWithFriend /> },
      { path: 'challenge/*', element: <ChallengeRoutes /> },
      { path: 'my-account', element: <MyAccount /> },
      { path: 'change-password', element: <ChangePassword /> },
      { path: '', element: <ChooseChallengeMode /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
]
