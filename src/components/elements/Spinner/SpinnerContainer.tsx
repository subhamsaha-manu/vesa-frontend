import { Flex } from '@chakra-ui/react'
import { CircularProgress } from '@nextui-org/react'
import React from 'react'

type SpinnerProps = {
  size?: 'sm' | 'md' | 'lg' | undefined
  thickness?: string
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | undefined
  justifySpinner?: 'flex-start' | 'center'
  width?: string
  height?: string
  overflow?: 'scroll' | 'unset'
}

export const SpinnerContainer = ({
  size = 'sm',
  color = 'default',
  justifySpinner = 'center',
  width = '100%',
  height = '100%',
  overflow = 'scroll',
}: SpinnerProps) => {
  return (
    <Flex
      display-name="spinner-container"
      w={width}
      h={height}
      justify={justifySpinner}
      alignItems="center"
      overflow={overflow}
    >
      <CircularProgress isIndeterminate color={color} size={size} data-testid="spinner" />
    </Flex>
  )
}
