import {
  Box,
  Checkbox,
  Flex,
  Heading,
  HStack,
  IconButton,
  Radio,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { FaPen } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import styled from 'styled-components'

import { DeleteQuestionConfirmationModal } from './DeleteQuestionConfirmationModal'

import { AddUpdateQuestionForm } from '@/features/admin'
import { Question as QuestionType } from '@/types'

const ListItemBg = styled.div`
  background: #ecedef;
  z-index: 2;
  border-radius: 10px;
  width: 94%;
  box-shadow: 0 22px 20px -18px rgba(6, 0, 0, 0.4);
`

const RadioWrapper = styled.div`
  color: black;

  > label {
    > span {
      opacity: 0.8 !important;
      border-color: black !important;
    }
  }
`

type QuestionProps = {
  question: QuestionType
  index: number
  selectedQuestionIds: Array<string>
  setSelectedQuestionIds: Dispatch<SetStateAction<Array<string>>>
}

export const Question: React.FC<QuestionProps> = ({
  question,
  index,
  selectedQuestionIds,
  setSelectedQuestionIds,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const {
    isOpen: deleteQuestionModalIsOpen,
    onOpen: deleteQuestionModalOnOpen,
    onClose: deleteQuestionModalOnClose,
  } = useDisclosure()
  const { uuid, title, choices } = question

  const [showActionButtons, setShowActionButtons] = useState<boolean>(false)

  return (
    <>
      <HStack
        display-name="individual-question"
        w="100%"
        spacing={4}
        onMouseEnter={() => setShowActionButtons(true)}
        onMouseLeave={() => setShowActionButtons(false)}
      >
        <Box display-name="question-checkbox-container">
          <Checkbox
            size="lg"
            value={uuid}
            isChecked={selectedQuestionIds.includes(uuid)}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedQuestionIds([...selectedQuestionIds, e.target.value])
              } else {
                const updatedArr = selectedQuestionIds.filter((itemId: string) => itemId !== uuid)
                setSelectedQuestionIds(updatedArr)
              }
            }}
          />
        </Box>
        <Box display-name="question-index-container">
          <Heading size="sm">{index + 1}. </Heading>
        </Box>

        <ListItemBg>
          <HStack display-name="question-and-answer-hstack-container" w="100%">
            <VStack
              display-name="question-and-answer-container"
              w="90%"
              p={5}
              pl={10}
              alignItems="start"
            >
              <Box display-name="question-title">
                <Text>{title}</Text>
              </Box>
              <Box display-name="question-choices">
                <HStack spacing={2}>
                  {choices.map((choice) => {
                    const { uuid, title, isCorrect } = choice
                    return (
                      <RadioWrapper key={uuid}>
                        <Radio
                          id={uuid}
                          size="lg"
                          value={title}
                          defaultChecked={isCorrect}
                          isDisabled
                          opacity={1}
                        >
                          {title}
                        </Radio>
                      </RadioWrapper>
                    )
                  })}
                </HStack>
              </Box>
            </VStack>
            <HStack display-name="question-action-button-section" align-items="center" pr={5}>
              <Flex w="100%" visibility={showActionButtons ? 'visible' : 'hidden'} gap={2}>
                <IconButton
                  variant="outline"
                  aria-label="Edit question"
                  icon={<FaPen fontSize="15px" />}
                  onClick={onOpen}
                />
                <IconButton
                  variant="outline"
                  aria-label="Delete question"
                  icon={<MdDelete fontSize="15px" />}
                  onClick={deleteQuestionModalOnOpen}
                />
              </Flex>
            </HStack>
          </HStack>
        </ListItemBg>
      </HStack>
      <AddUpdateQuestionForm isOpen={isOpen} onClose={onClose} selectedQuestion={question} />
      {deleteQuestionModalIsOpen && (
        <DeleteQuestionConfirmationModal
          questionIds={[uuid]}
          isOpen={deleteQuestionModalIsOpen}
          onClose={deleteQuestionModalOnClose}
          questionCount={1}
          setSelectedQuestionIds={setSelectedQuestionIds}
        />
      )}
    </>
  )
}
