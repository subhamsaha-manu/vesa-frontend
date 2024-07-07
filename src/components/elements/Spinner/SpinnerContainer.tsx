import { CircularProgress, Flex } from '@chakra-ui/react'
import React from 'react'

type SpinnerProps = {
  size?: string
  thickness?: string
  color?: string
  justifySpinner?: 'flex-start' | 'center'
  width?: string
  height?: string
  overflow?: 'scroll' | 'unset'
}
export const SpinnerContainer = ({
  size = '60px',
  thickness = '5px',
  color = '#9198A3',
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
      <CircularProgress
        capIsRound
        isIndeterminate
        thickness={thickness}
        color={color}
        size={size}
        data-testid="spinner"
        trackColor="transparent"
      />
    </Flex>
  )
}
