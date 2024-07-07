import { ChevronLeftIcon } from '@chakra-ui/icons'
import { Box, Button, Divider, Flex, Heading, HStack, Select, VStack } from '@chakra-ui/react'
import { capitalize, isEmpty, isNil } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { QuestionsContainer } from '@/features/questions'
import { useSubtopicsQuery } from '@/features/subtopics/apis/subtopics.generated'

type useLocationType = {
  state: {
    topic: {
      uuid: string
      title: string
    }
  }
}

export const Subtopics: React.FC = () => {
  const { state } = useLocation() as useLocationType
  const navigate = useNavigate()

  const { uuid, title } = state.topic

  const { data: subtopicsData, loading } = useSubtopicsQuery({ variables: { topicId: uuid } })

  const [selectedSubtopicId, setSubtopicId] = useState<string>('')

  useEffect(() => {
    if (!isNil(subtopicsData) && !isEmpty(subtopicsData?.subtopics)) {
      setSubtopicId(subtopicsData.subtopics[0].uuid)
    }
  }, [subtopicsData])

  if (loading) {
    return <SpinnerContainer height="60vh" />
  }

  return (
    <Flex display-name="subtopics-flex" flexDirection="column" p={5} h="75vh">
      <VStack display-name="header-section-sub-topics" spacing={4} w="100%" mb={8}>
        <Box display-name="back-to-topics" w="100%">
          <Button
            leftIcon={<ChevronLeftIcon />}
            size="md"
            colorScheme="gray"
            variant="ghost"
            onClick={() => navigate('/app')}
          >
            Back to topics
          </Button>
        </Box>
        <HStack w="100%" display-name="topic-detail-section-hstack" pl={5}>
          <HStack display-name="topic-detail-section" w="30%" spacing={4}>
            <Heading size="md" color="#485465">
              Topic Selected -
            </Heading>
            <Heading size="md">{capitalize(title)}</Heading>
          </HStack>
          <HStack display-name="subtopics-dropdown" w="30%" spacing={4}>
            <Box w="200px">
              <Heading size="md" color="#485465">
                Subtopics -
              </Heading>
            </Box>

            <Select
              variant="filled"
              onChange={(e) => setSubtopicId(e.target.value)}
              defaultValue={selectedSubtopicId}
            >
              {subtopicsData?.subtopics.map((subtopic) => {
                const { uuid, name } = subtopic
                return (
                  <option key={uuid} value={uuid}>
                    {name}
                  </option>
                )
              })}
            </Select>
          </HStack>
        </HStack>
      </VStack>
      <Divider />
      <QuestionsContainer subtopicId={selectedSubtopicId} />
    </Flex>
  )
}
