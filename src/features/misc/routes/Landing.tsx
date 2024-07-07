import React from 'react'

import { LandingLayout } from '@/components/Layout'
import { LandingContent } from '@/features/misc'

export const Landing: React.FC = () => (
  <LandingLayout page="landing-page">
    <LandingContent />
  </LandingLayout>
)
