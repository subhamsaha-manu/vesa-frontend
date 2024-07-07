import { Flex, Heading, Image, VStack } from '@chakra-ui/react'
import React from 'react'

import imgSource from '@/assets/illustrations/NoLessonsSmall.png'

export const NoQuestions: React.FC = () => {
  return (
    <>
      <Flex
        display-name="no-questions-found-container"
        data-testid="no-questions-found-container"
        w="100%"
        h="50vh"
        justify="center"
        alignItems="center"
      >
        <VStack spacing={4}>
          <Image src={imgSource} alt="No Questions Illustration" loading="lazy" />
          <VStack spacing={1} />
          <VStack spacing={2} mb={2}>
            <Heading size="md" data-testid="no-activities-heading">
              No Questions found try using different filters!
            </Heading>
          </VStack>
          <VStack spacing={1} />
        </VStack>
      </Flex>
    </>
  )
}
