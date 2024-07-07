import { Route, Routes } from 'react-router-dom'

import { ChallengeContainer } from '@/features/challenge'
import { lazyImport } from '@/utils/lazyImport'

const { ResultContainer } = lazyImport(() => import('@/features/result'), 'ResultContainer')
const { ChallengeQuestion } = lazyImport(() => import('@/features/challenge'), 'ChallengeQuestion')
export const ChallengeRoutes = () => {
  return (
    <Routes>
      <Route path="/:id" element={<ChallengeContainer />} />
      <Route path="/start/:id" element={<ChallengeQuestion />} />
      <Route path="/result/:id" element={<ResultContainer />} />
    </Routes>
  )
}
