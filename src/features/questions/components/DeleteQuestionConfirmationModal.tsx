import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'

import { useDeleteQuestionsMutation } from '@/features/questions/apis/deleteQuestion.generated'
import { questions } from '@/features/questions/apis/questions'

type DeleteQuestionConfirmationModalProps = {
  questionIds: Array<string>
  isOpen: boolean
  onClose: () => void
  questionCount: number
  setSelectedQuestionIds: Dispatch<SetStateAction<Array<string>>>
}
export const DeleteQuestionConfirmationModal: React.FC<DeleteQuestionConfirmationModalProps> = ({
  questionIds,
  isOpen,
  onClose,
  questionCount,
  setSelectedQuestionIds,
}) => {
  const toast = useToast()

  const [deleteQuestions, { loading: deletingQuestions }] = useDeleteQuestionsMutation({
    variables: {
      questionIds,
    },
    onCompleted: (data) => {
      if (data.deleteQuestions) {
        toast({
          title: 'Questions deleted successfully',
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
        setSelectedQuestionIds([])
        onClose()
      }
    },
    refetchQueries: [{ query: questions }],
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader alignSelf="center">
          <Heading size="lg">Delete Question</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody p={8}>
          <Heading size="md" color="#1774aa">
            Are you sure you want to delete {questionCount} questions?
          </Heading>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button variant="ghost" isLoading={deletingQuestions} onClick={() => deleteQuestions()}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
