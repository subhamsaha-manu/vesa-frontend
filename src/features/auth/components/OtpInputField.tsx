import { Flex, PinInput, PinInputField } from '@chakra-ui/react'
import { FC } from 'react'

type OtpInputFieldProps = {
  otpLength: number
  onEntryComplete: (otpValue: string) => void
}
export const OtpInputField: FC<OtpInputFieldProps> = ({ otpLength = 4, onEntryComplete }) => {
  return (
    <Flex pl={2} flexDir="column" gap="4px">
      <Flex justify="space-evenly" w="100%">
        <PinInput
          otp
          size="lg"
          onChange={(value) => {
            if (value.length === otpLength) {
              onEntryComplete(value)
            }
          }}
        >
          {Array.from({ length: otpLength }).map((_, index) => (
            <PinInputField key={index} />
          ))}
        </PinInput>
      </Flex>
    </Flex>
  )
}
