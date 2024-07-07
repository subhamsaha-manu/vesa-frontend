import { Box, Button, Divider, Heading, Text, VStack } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'

import { MainTopic } from '@/types'

type TopicTileProps = {
  topic: MainTopic
  isActive: boolean | undefined
  setActiveTileId: Dispatch<SetStateAction<string>>
}
export const TopicTile: React.FC<TopicTileProps> = ({ topic, isActive, setActiveTileId }) => {
  const { uuid, name, description } = topic

  const navigate = useNavigate()
  return (
    <Box
      display-name="topic-box-container"
      display="flex"
      borderRadius={8}
      boxShadow="0px 22px 54px -20px #48546566"
      border={isActive ? '2px solid #21bcb6' : '1px solid #ecedef'}
      p={6}
      w="400px"
      h="200px"
      cursor="pointer"
      onClick={() => setActiveTileId(uuid)}
    >
      <VStack display-name="topic-name-desc-container" spacing="4" alignItems="start" w="100%">
        <Heading size="md" color="#485465">
          {name}
        </Heading>
        <Text>{description}</Text>
        <Divider />
        <Box
          display-name="view-sub-topics-button-container"
          display="flex"
          justifyContent="center"
          w="100%"
        >
          <Button
            colorScheme="gray"
            variant="outline"
            fontSize={14}
            fontWeight="normal"
            onClick={() =>
              navigate('/app/sub-topics', {
                state: {
                  topic: {
                    title: name,
                    uuid,
                  },
                },
              })
            }
          >
            Next
          </Button>
        </Box>
      </VStack>
    </Box>
  )
}
