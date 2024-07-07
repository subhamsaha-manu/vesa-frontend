import { ArrowBackIcon } from '@chakra-ui/icons'
import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router'

export const ChooseGameModeButton: React.FC = () => {
  const navigate = useNavigate()
  return (
    <Flex display-name="back-to-choose-game-mode-button" alignSelf="start">
      <Button
        leftIcon={<ArrowBackIcon />}
        colorScheme="gray"
        variant="outline"
        onClick={() => navigate('/app')}
        fontSize="18px"
      >
        Choose game mode
      </Button>
    </Flex>
  )
}
