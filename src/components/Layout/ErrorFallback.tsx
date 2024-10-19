import { Flex, Heading, Image, VStack } from '@chakra-ui/react'
import React from 'react'

import img from '@/assets/illustrations/SomethingWentWrong.png'

const ERROR_HEADING = "Oops! Something's  wrong."
const ERROR_DESCRIPTION = 'Try refreshing the app.'

export const ErrorFallback = () => {
  return (
    <Flex
      h="65vh"
      width="100%"
      justify="center"
      alignItems="center"
      data-testid="error-fallback-container"
    >
      <VStack spacing="3">
        <Image src={img} alt="Error" />
        <Heading size="lg" data-testid="error-heading">
          {ERROR_HEADING}
        </Heading>
        <Heading size="md" color="info.160">
          {ERROR_DESCRIPTION}
        </Heading>
      </VStack>
    </Flex>
  )
}
