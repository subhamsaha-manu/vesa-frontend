import { ArrowForwardIcon, DeleteIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { isEmpty } from 'lodash'
import React, { useState } from 'react'
import { RiErrorWarningLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

import { NoQuestions } from './NoQuestions'
import { Questions } from './Questions'
import { SendRequestModal } from './SendRequestModal'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { useQuestionsQuery } from '@/features/questions/apis/questions.generated'
import { useSendChallengeMutation } from '@/features/questions/apis/sendChallenge.generated'
import { MINIMUM_NUMBER_OF_QUESTIONS } from '@/utils/constants'

export const QuestionsContainer: React.FC<{ subtopicId: string }> = ({ subtopicId }) => {
  const toast = useToast()
  const navigate = useNavigate()

  const { data: questions, loading } = useQuestionsQuery({ variables: { subtopicId } })

  const [sendChallenge, { loading: sendChallengeLoading }] = useSendChallengeMutation({
    onCompleted: (data) => {
      if (data.sendChallenge) {
        toast({
          title: 'Challenge sent successfully',
          status: 'success',
          isClosable: true,
        })
        navigate('/app')
      } else {
        toast({
          title: 'The challenged user does not exist',
          status: 'error',
          isClosable: true,
        })
      }
    },
  })

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<Array<string>>([])

  if (isEmpty(questions?.questions)) {
    return <NoQuestions />
  }

  return (
    <Flex display-name="questions-section" flexDirection="column" mt={8}>
      <HStack
        w="100%"
        display-name="questions-header-section"
        justifyContent="space-between"
        p="0px 20px 0px 64px"
      >
        <Heading size="sm">Questions</Heading>
        <Box display-name="questions-button-container">
          <ButtonGroup gap="4">
            <Button
              leftIcon={<DeleteIcon />}
              size="md"
              colorScheme="cyan"
              variant="outline"
              disabled={selectedQuestionIds.length === 0}
              onClick={() => setSelectedQuestionIds([])}
            >
              Clear
            </Button>
            <Button
              rightIcon={<ArrowForwardIcon />}
              size="md"
              colorScheme="cyan"
              variant="solid"
              disabled={selectedQuestionIds.length < MINIMUM_NUMBER_OF_QUESTIONS}
              onClick={onOpen}
            >
              Next
            </Button>
          </ButtonGroup>
        </Box>
        <VStack display-name="number-of-question-selected-count">
          <Heading size="sm">Number of selected questions:- {selectedQuestionIds.length}</Heading>
          {selectedQuestionIds.length < MINIMUM_NUMBER_OF_QUESTIONS && (
            <HStack>
              <RiErrorWarningLine />
              <Text fontSize="sm">
                Min. {MINIMUM_NUMBER_OF_QUESTIONS} questions need to be selected
              </Text>
            </HStack>
          )}
        </VStack>
      </HStack>
      <VStack
        display-name="questions-content-section"
        overflow="scroll"
        w="100%"
        mt="30px"
        height="55vh"
      >
        {loading && <SpinnerContainer />}
        {!loading && (
          <Questions
            questions={questions?.questions}
            selectedQuestionIds={selectedQuestionIds}
            setSelectedQuestionIds={setSelectedQuestionIds}
          />
        )}

        <SendRequestModal
          isOpen={isOpen}
          onClose={onClose}
          selectedQuestionIds={selectedQuestionIds}
          sendChallengeFn={sendChallenge}
          showLoading={sendChallengeLoading}
        />
      </VStack>
    </Flex>
  )
}
