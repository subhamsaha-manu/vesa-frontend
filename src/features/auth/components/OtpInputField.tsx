import { Flex } from '@chakra-ui/react'
import { FC } from 'react'

import { PinInput } from '@/components/ui/pin-input'

type OtpInputFieldProps = {
  otpLength: number
  onEntryComplete: (otpValue: string) => void
}

export const OtpInputField: FC<OtpInputFieldProps> = ({ otpLength = 4, onEntryComplete }) => {
  return (
    <Flex flexDir="column">
      <Flex justify="space-between" w="100%">
        <PinInput
          otp
          onValueComplete={(value) => {
            onEntryComplete(value.valueAsString)
          }}
        />
      </Flex>
    </Flex>
  )
}
