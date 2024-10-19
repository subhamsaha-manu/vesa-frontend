import { Flex, PinInput, PinInputField } from '@chakra-ui/react'
import { FC } from 'react'

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
          onChange={(value) => {
            if (value.length === otpLength) {
              onEntryComplete(value)
            }
          }}
        >
          {Array.from({ length: otpLength }).map((_, index) => (
            <PinInputField key={index} height="50px" width="50px" />
          ))}
        </PinInput>
      </Flex>
    </Flex>
  )
}
