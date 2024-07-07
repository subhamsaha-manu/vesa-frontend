import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FieldError, useForm } from 'react-hook-form'
import * as z from 'zod'

import { InputField } from '@/components/form'
import {
  LEADING_OR_TRAILING_SPACES_ERROR_MESSAGE,
  LEADING_OR_TRAILING_SPACES_ERROR_REGEX,
  REQUIRED_ERROR_MESSAGE,
} from '@/utils/constants'

type SendRequestModalProps = {
  isOpen: boolean
  onClose: () => void
  selectedQuestionIds: Array<string>
  sendChallengeFn: (param: any) => void
  showLoading: boolean
}

const schema = z.object({
  name: z
    .string()
    .min(1, { message: REQUIRED_ERROR_MESSAGE('Name') })
    .regex(LEADING_OR_TRAILING_SPACES_ERROR_REGEX, {
      message: LEADING_OR_TRAILING_SPACES_ERROR_MESSAGE,
    }),
  email: z
    .string()
    .email()
    .min(1, { message: REQUIRED_ERROR_MESSAGE('Email') })
    .regex(LEADING_OR_TRAILING_SPACES_ERROR_REGEX, {
      message: LEADING_OR_TRAILING_SPACES_ERROR_MESSAGE,
    }),
})

export const SendRequestModal: React.FC<SendRequestModalProps> = ({
  isOpen,
  onClose,
  selectedQuestionIds,
  sendChallengeFn,
  showLoading,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = (values?: any) => {
    const { name, email } = values

    sendChallengeFn({
      variables: {
        input: {
          name: name.trim(),
          email: email.trim(),
          questionIds: selectedQuestionIds,
        },
      },
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)} data-testid="send-request-form">
          <ModalHeader>Send Challenge</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display-name="send-request-form-box-container" w="100%" h="100%" overflow="hidden">
              <VStack spacing={8} mt={4} align="stretch" display-name="send-request-form-vstack">
                <InputField
                  testid="name"
                  fieldName="name"
                  label="Name *"
                  placeholder="Name"
                  register={register}
                  error={errors['name'] as FieldError}
                />
                <InputField
                  testid="email"
                  fieldName="email"
                  label="Email *"
                  placeholder="Email"
                  register={register}
                  type="email"
                  error={errors['email'] as FieldError}
                />
              </VStack>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Back
            </Button>
            <Button
              variant="outline"
              colorScheme="cyan"
              type="submit"
              isLoading={showLoading}
              spinnerPlacement="end"
            >
              Next
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
