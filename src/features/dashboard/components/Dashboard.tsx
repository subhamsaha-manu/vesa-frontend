import { Heading, HStack, Stack, VStack } from '@chakra-ui/react'
import { isEmpty } from 'lodash'
import React, { useState } from 'react'

import { ChallengeSection } from './ChallengeSection'
import { TopicTile } from './TopicTile'

import { useMainTopicsQuery } from '../apis/mainTopics.generated'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { ContentLayout } from '@/components/Layout/ContentLayout'
import { useCurrentUserContext } from '@/features/auth'
import { ErrorFallback } from '@/providers/app'
import { MainTopic } from '@/types'

export const Dashboard = () => {
  const [activeTileId, setActiveTileId] = useState<string>('')

  const { currentUser } = useCurrentUserContext()
  const { name } = currentUser!

  const { data: mainTopics, loading, error } = useMainTopicsQuery()

  const activeTile = mainTopics?.mainTopics.find((topic) => topic.uuid === activeTileId)

  if (error) {
    return <ErrorFallback />
  }

  if (isEmpty(mainTopics) || loading) {
    return <SpinnerContainer height="70vh" />
  }

  return (
    <ContentLayout pageTitle="">
      <VStack
        display-name="dashboard-container"
        h="77vh"
        overflow="scroll"
        w="100%"
        alignItems="start"
        spacing={8}
      >
        <Heading size="sm">Hi welcome back {name}</Heading>
        <HStack display-name="dashboard-topics-container" w="100%" spacing={4}>
          {mainTopics?.mainTopics.map((topic) => {
            return (
              <TopicTile
                key={topic.uuid}
                topic={topic as MainTopic}
                isActive={activeTile && topic.uuid === activeTile.uuid}
                setActiveTileId={setActiveTileId}
              />
            )
          })}
        </HStack>
        <Stack display-name="dashboard-other-section-container" w="100%" spacing={4}>
          <ChallengeSection />
          {/*<Heading size="sm">Your Performance</Heading>*/}
          {/*<PerformanceSection />*/}
        </Stack>
      </VStack>
    </ContentLayout>
  )
}
