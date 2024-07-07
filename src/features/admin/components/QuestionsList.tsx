import { VStack } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction, useMemo, useState } from 'react'

import { Pagination } from '@/components/elements/Pagination/'
import { SpinnerContainer } from '@/components/elements/Spinner'
import { Question } from '@/features/questions'
import { useQuestionsQuery } from '@/features/questions/apis/questions.generated'
import { NoQuestions } from '@/features/questions/components/NoQuestions'

type QuestionsListProps = {
  selectedQuestionIds: Array<string>
  setSelectedQuestionIds: Dispatch<SetStateAction<Array<string>>>
}

const PageSize = 4
export const QuestionsList: React.FC<QuestionsListProps> = ({
  selectedQuestionIds,
  setSelectedQuestionIds,
}) => {
  const { data: questions, loading } = useQuestionsQuery({ fetchPolicy: 'network-only' })

  const [currentPage, setCurrentPage] = useState(1)

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize
    const lastPageIndex = firstPageIndex + PageSize
    return questions?.questions.slice(firstPageIndex, lastPageIndex)
  }, [currentPage, questions?.questions])

  if (loading) {
    return <SpinnerContainer />
  }

  if (!questions?.questions || !currentTableData) {
    return <NoQuestions />
  }

  return (
    <VStack
      display-name="questions-list-outer-vstack"
      w="100%"
      spacing={8}
      height="100%"
      mt="20px"
      pt="40px"
    >
      <VStack display-name="questions-list-inner-vstack" w="100%" spacing={8} height="100%">
        {currentTableData.map((question, index) => {
          if (question) {
            return (
              <Question
                key={question.uuid}
                question={question}
                index={questions.questions.indexOf(question)}
                setSelectedQuestionIds={setSelectedQuestionIds}
                selectedQuestionIds={selectedQuestionIds}
              />
            )
          }
        })}
      </VStack>

      <Pagination
        currentPage={currentPage}
        totalCount={questions.questions.length}
        pageSize={PageSize}
        onPageChange={(page: React.SetStateAction<number>) => setCurrentPage(page)}
      />
    </VStack>
  )
}
