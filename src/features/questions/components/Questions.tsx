import { VStack } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'

import { Question } from './Question'

import { Question as QuestionType } from '@/types'

type QuestionsProps = {
  questions: Array<QuestionType | null> | undefined
  selectedQuestionIds: Array<string>
  setSelectedQuestionIds: Dispatch<SetStateAction<Array<string>>>
}

export const Questions: React.FC<QuestionsProps> = ({
  questions,
  selectedQuestionIds,
  setSelectedQuestionIds,
}) => {
  if (!questions) {
    return null
  }
  return (
    <VStack display-name="questions-list-vstack" w="100%" mt={13} spacing={8}>
      {questions.map((question, index) => {
        if (question) {
          return (
            <Question
              key={question.uuid}
              question={question}
              index={index}
              setSelectedQuestionIds={setSelectedQuestionIds}
              selectedQuestionIds={selectedQuestionIds}
            />
          )
        }
      })}
    </VStack>
  )
}
