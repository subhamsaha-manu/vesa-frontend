import React, { FC } from 'react'
import {
  Button,
  Flex,
  Heading,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { MultiplicationSignIcon } from 'hugeicons-react'
import { CartItem } from '@/types'
import { AdjustCartItemQuantity } from './AdjustCartItemQuantity'
import { INR_CURRENCY_SYMBOL } from '@/utils/constants'

type CartContentProps = {
  cartItems: Array<CartItem>
  removeProductFromCart: (productId: string, removeAll: boolean) => void
  onItemClick: (productId: string) => void
  onCheckout: () => void
  totalCartAmount: number
  calculateTotalCartAmount: () => void
}
export const CartContent: FC<CartContentProps> = ({
  cartItems,
  removeProductFromCart,
  onItemClick,
  onCheckout,
  totalCartAmount,
  calculateTotalCartAmount,
}) => {
  return (
    <Flex display-name="main-content" w="100%" h="100%" gap={6} justify="space-between">
      <Flex display-name="cart-items-table" h="100%">
        <TableContainer w="100%">
          <Table variant="simple" size="lg">
            <Thead>
              <Tr>
                <Th></Th>
                <Th></Th>
                <Th style={{ textTransform: 'capitalize', fontWeight: '500' }} pr={0}>
                  Product
                </Th>
                <Th style={{ textTransform: 'capitalize', fontWeight: '500' }} pr={0}>
                  Price
                </Th>
                <Th style={{ textTransform: 'capitalize', fontWeight: '500' }} pr={0}>
                  Quantity
                </Th>
                <Th style={{ textTransform: 'capitalize', fontWeight: '500' }} pr={0}>
                  Subtotal
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {cartItems.map(({ imageUrl, price, productId, quantity, title }) => (
                <Tr key={productId}>
                  <Td
                    _hover={{ color: '#D9121F', cursor: 'pointer' }}
                    onClick={() => removeProductFromCart(productId, true)}
                  >
                    <MultiplicationSignIcon size={15} />
                  </Td>
                  <Td pl={0} pr={0}>
                    <Image src={imageUrl} alt={title} maxW="200px" />
                  </Td>
                  <Td
                    style={{ fontWeight: '400' }}
                    _hover={{ cursor: 'pointer', color: '#00bb00', textDecoration: 'underline' }}
                    onClick={() => onItemClick(productId)}
                    pr={0}
                  >
                    {title}
                  </Td>
                  <Td pr={0}>{price}</Td>
                  <Td pr={0}>
                    <AdjustCartItemQuantity
                      initialQuantity={quantity}
                      productId={productId}
                      removeProductFromCart={removeProductFromCart}
                      calculateTotalCartAmount={calculateTotalCartAmount}
                    />
                  </Td>
                  <Td pr={0}>{price * quantity}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
      <Flex
        display-name="cart-summary"
        w="32%"
        h="fit-content"
        background="#f2f2f2"
        p={7}
        flexDir="column"
        gap={6}
        mb="100px"
      >
        <Heading>Cart totals</Heading>
        <Flex flexDir="column">
          <Flex
            display-name="subtotal"
            justify="space-between"
            p="15px 0"
            borderBottom="1px solid #e6e6e6"
          >
            <Text>Subtotal</Text>
            <Text>{`${INR_CURRENCY_SYMBOL} ${totalCartAmount}`}</Text>
          </Flex>
          <Flex display-name="total" justify="space-between" p="15px 0">
            <Text>Total</Text>
            <Text fontSize="3xl">{`${INR_CURRENCY_SYMBOL} ${totalCartAmount}`}</Text>
          </Flex>
        </Flex>
        <Flex display-name="proceed-to-checkout" justify="center">
          <Button
            variant="solid"
            size="lg"
            color="white"
            background="black"
            _hover={{ background: 'white', color: 'black', border: '1px solid black' }}
            borderRadius="40px"
            onClick={onCheckout}
            w="100%"
            fontSize="25px"
            fontWeight="300"
          >
            Proceed to Checkout
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
