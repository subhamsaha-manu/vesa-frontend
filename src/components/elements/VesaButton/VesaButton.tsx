import { Button } from '@chakra-ui/react'
import React, { FC } from 'react'

type VesaButtonProps = {
  readonly label: string
  readonly loading: boolean
  readonly primaryIcon: React.ReactElement
  readonly secondaryIcon: React.ReactElement
  readonly onClick: () => void
  readonly isDisabled: boolean
  readonly mobileView: boolean
  readonly rounded?: boolean
}

const VesaButton: FC<VesaButtonProps> = ({
  label,
  loading,
  mobileView,
  isDisabled,
  primaryIcon,
  secondaryIcon,
  onClick,
  rounded = true,
}) => {
  return (
    <Button
      variant="solid"
      size={mobileView ? 'sm' : 'lg'}
      color="white"
      background="black"
      leftIcon={loading ? secondaryIcon : primaryIcon}
      _hover={{ background: 'white', color: 'black', border: '1px solid black' }}
      borderRadius={rounded ? '40px' : '0px'}
      onClick={onClick}
      isDisabled={isDisabled}
      width="100%"
    >
      {label}
    </Button>
  )
}

export default VesaButton
