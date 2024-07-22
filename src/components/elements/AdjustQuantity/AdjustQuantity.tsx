import React, { FC, useState } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { Add01Icon, MinusSignIcon } from 'hugeicons-react'

type AdjustQuantityProps = {
  initialQuantity: number
  onIncrement: () => void
  onDecrement: () => void
}
const AdjustQuantity: FC<AdjustQuantityProps> = ({ initialQuantity, onIncrement, onDecrement }) => {
  const [quantity, setQuantity] = useState<number>(initialQuantity)

  const increment = () => {
    setQuantity(quantity + 1)
    onIncrement()
  }

  const decrement = () => {
    setQuantity(quantity > 1 ? quantity - 1 : quantity)
    onDecrement()
  }

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      border="1px solid"
      borderColor="gray.300"
      borderRadius="full"
      px={4}
      py={2}
    >
      <Flex _hover={{ cursor: 'pointer' }}>
        <MinusSignIcon size={20} onClick={decrement} />
      </Flex>
      <Text mx={4}>{quantity}</Text>
      <Flex _hover={{ cursor: 'pointer' }}>
        <Add01Icon size={20} onClick={increment} />
      </Flex>
    </Flex>
  )
}

export default AdjustQuantity