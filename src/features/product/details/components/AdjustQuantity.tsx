import { FC } from 'react'
import { Flex, Input, InputGroup, InputLeftAddon, InputRightAddon } from '@chakra-ui/react'
import { Add01Icon, Remove01Icon } from 'hugeicons-react'

type AdjustQuantityProps = {
  quantity: number
  setQuantity: (quantity: number) => void
}
export const AdjustQuantity: FC<AdjustQuantityProps> = ({ quantity, setQuantity }) => {
  return (
    <Flex display-name="adjust-quantity-wrapper" alignItems="center">
      <InputGroup>
        <InputLeftAddon onClick={() => setQuantity(quantity - 1)} borderRadius="40px">
          <Remove01Icon />
        </InputLeftAddon>
        <Input value={quantity} borderRadius="40px" />
        <InputRightAddon onClick={() => setQuantity(quantity + 1)} borderRadius="40px">
          <Add01Icon />
        </InputRightAddon>
      </InputGroup>
    </Flex>
  )
}
