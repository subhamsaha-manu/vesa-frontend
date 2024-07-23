import { Box, Flex, FormControl, FormErrorMessage, FormLabel, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { Control, FieldError } from 'react-hook-form'

type FieldWrapperProps = {
  children: ReactNode
  control?: Control
  error?: FieldError
  label?: string
  width?: number
  showErrorOnRight?: boolean
  testid?: string
  textAreaLengthText?: string
  isRequired?: boolean
}

export type FieldWrapperPassThroughProps = Omit<FieldWrapperProps, 'children'>

export const FieldWrapper = (props: FieldWrapperProps) => {
  const {
    label,
    children,
    testid,
    error,
    showErrorOnRight = false,
    isRequired,
    textAreaLengthText,
  } = props

  return (
    <FormControl
      isInvalid={!!error?.message}
      data-testid={testid}
      style={{
        display: 'flex',
        flexDirection: showErrorOnRight ? 'row' : 'column',
        width: '100%',
        position: 'relative',
      }}
    >
      {label && (
        <FormLabel>
          <Flex display-name="field-wrapper-form-label-flex" align="center" gap={1}>
            <Flex display-name="field-wrapper-label">
              <Text fontSize="16px" fontWeight="400" color="#191919">
                {label}
              </Text>
            </Flex>
            <Flex
              display-name="field-wrapper-required-indicator"
              display={isRequired ? 'flex' : 'none'}
              color="red"
            >
              *
            </Flex>
          </Flex>
        </FormLabel>
      )}
      <Box display-name="field-wrapper-box-div" w={showErrorOnRight ? '50%' : '100%'}>
        {children}
      </Box>
      {error?.message && (
        <Flex
          display-name="field-wrapper-error-box-div"
          alignItems="center"
          w="100%"
          marginLeft={showErrorOnRight ? '5px' : undefined}
        >
          <FormErrorMessage>{error.message}</FormErrorMessage>
        </Flex>
      )}
    </FormControl>
  )
}
