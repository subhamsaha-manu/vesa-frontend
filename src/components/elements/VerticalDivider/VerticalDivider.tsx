import { Box } from '@chakra-ui/react'
import React from 'react'

export const VerticalDivider: React.FC = () => {
  return (
    <Box
      width="1px"
      height="16px"
      marginInlineStart="0px !important"
      ml="8px !important"
      background="primary.100"
    />
  )
}
