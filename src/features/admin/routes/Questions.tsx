import { Flex, HStack } from '@chakra-ui/react'
import React, { useState } from 'react'

import { AddQuestion } from '../components/AddQuestion'
import { BulkDeleteQuestions } from '../components/BulkDeleteQuestions'
import { BulkUploadQuestions } from '../components/BulkUploadQuestions'
import { QuestionsList } from '../components/QuestionsList'

import { ContentLayout } from '@/components/Layout'

export const Questions: React.FC = () => {
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<Array<string>>([])
  return (
    <ContentLayout pageTitle="Questions">
      <HStack
        display-name="questions-list-vstack-container"
        w="100%"
        spacing={4}
        h="75vh"
        overflow="scroll"
      >
        <QuestionsList
          selectedQuestionIds={selectedQuestionIds}
          setSelectedQuestionIds={setSelectedQuestionIds}
        />
        <Flex
          display-name="question-actions-flex-container"
          gap={2}
          alignSelf="start"
          mr="20px !important"
        >
          <BulkDeleteQuestions
            setSelectedQuestionIds={setSelectedQuestionIds}
            selectedQuestionIds={selectedQuestionIds}
          />
          <AddQuestion />
          <BulkUploadQuestions />
        </Flex>
      </HStack>
    </ContentLayout>
  )
}
