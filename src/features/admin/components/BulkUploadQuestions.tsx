import { AddIcon } from '@chakra-ui/icons'
import { Button, Flex, useDisclosure } from '@chakra-ui/react'
import React from 'react'

import { BulkUploadQuestionForm } from './BulkUploadQuestionForm'

export const BulkUploadQuestions: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Flex display-name="bulk-upload-question-flex-container">
      <Button leftIcon={<AddIcon />} colorScheme="linkedin" variant="solid" onClick={onOpen}>
        Bulk Upload Question
      </Button>
      <BulkUploadQuestionForm isOpen={isOpen} onClose={onClose} />
    </Flex>
  )
}
