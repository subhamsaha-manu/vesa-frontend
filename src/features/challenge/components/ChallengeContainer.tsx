import React from 'react'

import { ChallengeRules } from './ChallengeRules'
import { HostContainer } from './HostContainer'
import { InviteeContainer } from './InviteeContainer'

import { ContentLayout } from '@/components/Layout'
import useQuery from '@/hooks/useQuery'

export const ChallengeContainer: React.FC = () => {
  const query = useQuery()
  const mode = query.get('mode')
  const profile = query.get('profile')

  const renderRules = () => {
    switch (mode) {
      case 'invite':
        if (profile === 'sender') {
          return <HostContainer />
        }
        return <InviteeContainer />
      case 'one-v-one':
        return <ChallengeRules />
    }
  }
  return <ContentLayout pageTitle="">{renderRules()}</ContentLayout>
}
