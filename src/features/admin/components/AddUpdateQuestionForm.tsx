import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { isEmpty } from 'lodash'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { DrawerComponent } from '@/components/elements/DrawerComponent'
import { useAddQuestionMutation } from '@/features/admin/apis/addQuestion.generated'
import { useUpdateQuestionMutation } from '@/features/admin/apis/updateQuestion.generated'
import { questions } from '@/features/questions/apis/questions'
import { AddQuestionInput, Question } from '@/types'

type AddUpdateQuestionFormProps = {
  isOpen: boolean
  onClose: () => void
  selectedQuestion?: Question
}

const schema = z.object({
  questionTitle: z.string().nonempty(),
  firstChoice: z.string().nonempty(),
  secondChoice: z.string().nonempty(),
  thirdChoice: z.string().nonempty(),
  fourthChoice: z.string().nonempty(),
})
export const AddUpdateQuestionForm: React.FC<AddUpdateQuestionFormProps> = ({
  isOpen,
  onClose,
  selectedQuestion,
}) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const determineChosenAnswer = (): string => {
    if (selectedQuestion?.choices[0].isCorrect) {
      return 'firstChoice'
    } else if (selectedQuestion?.choices[1].isCorrect) {
      return 'secondChoice'
    } else if (selectedQuestion?.choices[2].isCorrect) {
      return 'thirdChoice'
    } else {
      return 'fourthChoice'
    }
  }

  const toast = useToast()

  const [correctChoice, setCorrectChoice] = useState<string>(
    selectedQuestion ? determineChosenAnswer() : ''
  )

  const [addQuestion, { loading: addingQuestion }] = useAddQuestionMutation({
    onCompleted: (data) => {
      if (data.addQuestion) {
        toast({
          title: 'Question added successfully',
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
        reset()
        onClose()
      }
    },
    refetchQueries: [{ query: questions }],
  })

  const [updateQuestion, { loading: updatingQuestion }] = useUpdateQuestionMutation({
    onCompleted: (data) => {
      if (data.updateQuestion) {
        toast({
          title: 'Question updated successfully',
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
        reset()
        onClose()
      }
    },
    refetchQueries: [{ query: questions }],
  })

  const onSubmit = (values: any) => {
    const { questionTitle, firstChoice, secondChoice, thirdChoice, fourthChoice } = values

    const addQuestionVariables: AddQuestionInput = {
      questionTitle,
      questionChoices: [
        {
          choiceTitle: firstChoice,
          isCorrect: correctChoice === 'firstChoice',
        },
        {
          choiceTitle: secondChoice,
          isCorrect: correctChoice === 'secondChoice',
        },
        {
          choiceTitle: thirdChoice,
          isCorrect: correctChoice === 'thirdChoice',
        },
        {
          choiceTitle: fourthChoice,
          isCorrect: correctChoice === 'fourthChoice',
        },
      ],
    }

    if (!selectedQuestion) {
      addQuestion({
        variables: {
          input: addQuestionVariables,
        },
      })
    } else {
      updateQuestion({
        variables: {
          questionId: selectedQuestion.uuid,
          input: addQuestionVariables,
        },
      })
    }
  }

  const getHeaderTitle = (): string => {
    if (selectedQuestion) {
      return 'Update Question'
    } else {
      return 'Add Question'
    }
  }

  return (
    <DrawerComponent isOpen={isOpen} onClose={onClose} headerTitle={getHeaderTitle()}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ height: '100%' }}>
        <VStack spacing={2} align="stretch" display-name="drawer-body-vstack" h="90%">
          <FormControl isRequired>
            <FormLabel htmlFor="name">Question</FormLabel>
            <Textarea
              placeholder="Put question title here"
              resize="vertical"
              {...register('questionTitle', {
                required: 'This is required',
              })}
              defaultValue={selectedQuestion?.title}
            />
          </FormControl>
          <RadioGroup onChange={setCorrectChoice} value={correctChoice}>
            <VStack spacing={5} display-name="choices-vstack" mt={10}>
              <FormControl isRequired>
                <HStack display-name="choice-1-hstack" w="100%" spacing={2}>
                  <Radio id="firstChoice" size="lg" value="firstChoice" opacity={1} />
                  <Input
                    id="firstChoice"
                    placeholder="First Choice"
                    type="text"
                    {...register('firstChoice', {
                      required: 'This is required',
                    })}
                    defaultValue={selectedQuestion?.choices[0].title}
                  />
                </HStack>
              </FormControl>
              <FormControl isRequired>
                <HStack display-name="choice-2-hstack" w="100%" spacing={2}>
                  <Radio id="secondChoice" size="lg" value="secondChoice" opacity={1} />
                  <Input
                    id="secondChoice"
                    placeholder="Second Choice"
                    type="text"
                    {...register('secondChoice', {
                      required: 'This is required',
                    })}
                    defaultValue={selectedQuestion?.choices[1].title}
                  />
                </HStack>
              </FormControl>
              <FormControl isRequired>
                <HStack display-name="choice-3-hstack" w="100%" spacing={2}>
                  <Radio id="thirdChoice" size="lg" value="thirdChoice" opacity={1} />
                  <Input
                    id="thirdChoice"
                    placeholder="Third Choice"
                    type="text"
                    {...register('thirdChoice', {
                      required: 'This is required',
                    })}
                    defaultValue={selectedQuestion?.choices[2].title}
                  />
                </HStack>
              </FormControl>
              <FormControl isRequired>
                <HStack display-name="choice-4-hstack" w="100%" spacing={2}>
                  <Radio id="fourthChoice" size="lg" value="fourthChoice" opacity={1} />
                  <Input
                    id="fourthChoice"
                    placeholder="Fourth Choice"
                    type="text"
                    {...register('fourthChoice', {
                      required: 'This is required',
                    })}
                    defaultValue={selectedQuestion?.choices[3].title}
                  />
                </HStack>
              </FormControl>
            </VStack>
          </RadioGroup>
        </VStack>
        <HStack display-name="drawer-footer" justifyContent="end">
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            type="submit"
            disabled={!isValid && isEmpty(correctChoice)}
            isLoading={addingQuestion || updatingQuestion}
          >
            {selectedQuestion ? 'Update' : 'Save'}
          </Button>
        </HStack>
      </form>
    </DrawerComponent>
  )
}
