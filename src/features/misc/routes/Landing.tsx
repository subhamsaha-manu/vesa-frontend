import { FC } from 'react'

import { LandingLayout } from '@/components/Layout'
import { LandingContent } from '@/features/misc'

export const Landing: FC = () => (
  <LandingLayout page="landing-page">
    <LandingContent />
  </LandingLayout>
)
