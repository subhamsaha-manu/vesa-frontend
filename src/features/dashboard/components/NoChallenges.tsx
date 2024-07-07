import { Flex, Heading, Image, VStack } from '@chakra-ui/react'
import React from 'react'

import imgSource from '@/assets/illustrations/NoLessonsSmall.png'

export const NoChallenges: React.FC = () => {
  return (
    <>
      <Flex
        display-name="no-challenges-found-container"
        data-testid="no-challenges-found-container"
        w="100%"
        h="50vh"
        justify="center"
        alignItems="center"
      >
        <VStack spacing={4}>
          <Image src={imgSource} alt="No Challenges Illustration" loading="lazy" />
          <VStack spacing={1} />
          <VStack spacing={2} mb={2}>
            <Heading size="md" data-testid="no-challenges-heading">
              No Challenges found start sending some!
            </Heading>
          </VStack>
          <VStack spacing={1} />
        </VStack>
      </Flex>
    </>
  )
}
