import { Flex } from '@chakra-ui/react'
import { Spinner } from '@heroui/react'
import { FC } from 'react'

export const LoadingSection: FC = () => {
  return (
    <Flex display-name="skeleton-container" w="100%" h="200px" justify="center">
      <Spinner
        classNames={{ label: 'text-foreground mt-4' }}
        label="Loading more..."
        variant="spinner"
        color="warning"
        size="lg"
      />
    </Flex>
  )
}
