import { AddIcon } from '@chakra-ui/icons'
import { Button, Flex, useDisclosure } from '@chakra-ui/react'
import React from 'react'

import { AddUpdateQuestionForm } from '@/features/admin'

export const AddQuestion: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Flex display-name="add-question-flex-container">
      <Button leftIcon={<AddIcon />} colorScheme="linkedin" variant="solid" onClick={onOpen}>
        Add Question
      </Button>
      <AddUpdateQuestionForm isOpen={isOpen} onClose={onClose} />
    </Flex>
  )
}
