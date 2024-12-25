import { Flex, Heading, Separator, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { FaTimes } from 'react-icons/fa'

import { Button } from '@/components/ui/button'
import {
  DialogBackdrop,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
} from '@/components/ui/dialog'

type RemoveAddressWarningModalProps = {
  isOpen: boolean
  toggleWarningModal: () => void
  showSpinner: boolean
  removeAddress: () => void
}

export const RemoveAddressWarningModal: FC<RemoveAddressWarningModalProps> = ({
  isOpen,
  toggleWarningModal,
  showSpinner,
  removeAddress,
}) => {
  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={toggleWarningModal}
      placement="center"
      size={{ base: 'md', xl: 'lg' }}
    >
      <DialogBackdrop />
      <DialogContent data-testid="remove-address-warning-modal">
        <DialogHeader>
          <Flex
            w="100%"
            display-name="remove-address-warning-modal-close-button-flex"
            justifyContent="flex-end"
          >
            <FaTimes fontSize="18px" onClick={toggleWarningModal} cursor="pointer" />
          </Flex>
        </DialogHeader>
        <DialogBody mb={5} mr={5} ml={5}>
          <Flex
            flexDir="column"
            display-name="remove-address-warning-content-vstack"
            alignItems="flex-start"
            gap={4}
          >
            <Heading fontSize="18px" fontWeight="700" data-testid="remove-address-modal-title">
              Remove Address
            </Heading>
            <Text fontSize="16px" fontWeight="300" color="primary.100">
              Are you sure you want to remove this address?
            </Text>
          </Flex>
        </DialogBody>
        <Separator />

        <DialogFooter pt={5} pb={10} pr={10}>
          <Flex
            display-name="remove-address-warning-modal-button-stack"
            p="0 40px 0 40px"
            gap={4}
            w="100%"
            align="center"
            justifyContent="flex-end"
          >
            <Button
              variant="outline"
              size="lg"
              aria-label="cancel"
              data-testid="remove-address-warning-modal-cancel-button"
              onClick={toggleWarningModal}
              style={{
                flex: 1,
              }}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              size="lg"
              data-testid="remove-address-warning-modal-primary-button"
              onClick={removeAddress}
              style={{
                flex: 1,
              }}
              loading={showSpinner}
              loadingText="Removing..."
              disabled={showSpinner}
            >
              Remove
            </Button>
          </Flex>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}
