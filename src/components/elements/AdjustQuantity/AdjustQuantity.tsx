import { Flex, Text } from '@chakra-ui/react'
import { Add01Icon, MinusSignIcon } from 'hugeicons-react'
import { FC, useState } from 'react'

import { useWindowSize } from '@/hooks/useWindowSize'

type AdjustQuantityProps = {
  initialQuantity: number
  onIncrement: () => void
  onDecrement: () => void
  maxQuantity?: number
}
const AdjustQuantity: FC<AdjustQuantityProps> = ({
  initialQuantity,
  onIncrement,
  onDecrement,
  maxQuantity,
}) => {
  const size = useWindowSize()

  const { width } = size

  const isMobile = width && width < 768

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
        <MinusSignIcon size={isMobile ? 18 : 20} onClick={decrement} />
      </Flex>
      <Text mx={4}>{quantity}</Text>
      <Flex _hover={{ cursor: 'pointer' }}>
        <Add01Icon
          size={isMobile ? 18 : 20}
          onClick={() => {
            if (maxQuantity && quantity >= maxQuantity) return
            increment()
          }}
        />
      </Flex>
    </Flex>
  )
}

export default AdjustQuantity
