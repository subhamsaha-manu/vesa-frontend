import { DeleteIcon } from '@chakra-ui/icons'
import { Button, Flex, useDisclosure } from '@chakra-ui/react'
import { isEmpty } from 'lodash'
import React, { Dispatch, SetStateAction } from 'react'

import { DeleteQuestionConfirmationModal } from '@/features/questions/components/DeleteQuestionConfirmationModal'

type BulkDeleteQuestionsProps = {
  selectedQuestionIds: Array<string>
  setSelectedQuestionIds: Dispatch<SetStateAction<Array<string>>>
}
export const BulkDeleteQuestions: React.FC<BulkDeleteQuestionsProps> = ({
  selectedQuestionIds,
  setSelectedQuestionIds,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Flex display-name="bulk-delete-question-flex-container">
        <Button
          leftIcon={<DeleteIcon />}
          colorScheme="red"
          variant="solid"
          onClick={onOpen}
          disabled={isEmpty(selectedQuestionIds)}
        >
          Delete Questions
        </Button>
      </Flex>
      {isOpen && (
        <DeleteQuestionConfirmationModal
          questionIds={selectedQuestionIds}
          isOpen={isOpen}
          onClose={onClose}
          questionCount={selectedQuestionIds.length}
          setSelectedQuestionIds={setSelectedQuestionIds}
        />
      )}
    </>
  )
}
