import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router'

type NoOnlineUserFoundProps = {
  isOpen: boolean
  onClose: () => void
}

export const NoOnlineUserFound: React.FC<NoOnlineUserFoundProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody p={8}>
          <Heading size="md" color="#1E355B">
            Sorry there is no one online currently. Come back later or try other game mode.
          </Heading>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => navigate('/app')}>
            Back
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
