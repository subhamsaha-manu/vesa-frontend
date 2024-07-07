import React from 'react'

import { ContentLayout } from '@/components/Layout'
import { Subtopics } from '@/features/subtopics'

export const SubtopicContainer: React.FC = () => {
  return (
    <ContentLayout pageTitle="">
      <Subtopics />
    </ContentLayout>
  )
}
