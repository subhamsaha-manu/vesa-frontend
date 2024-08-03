import React, { FC, useEffect, useState } from 'react'
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
import { useNavigate } from 'react-router-dom'
import { CartItem } from '@/types'
import { useRemoveProductFromCartMutation } from '../apis/removeProductFromCart.generated'
import AdjustQuantity from '@/components/elements/AdjustQuantity'
import { useAddProductToCartMutation } from '../apis/addProductToCart.generated'
import round from 'lodash/round'

type CartContentProps = {
  cartItems: Array<CartItem>
  refetchCart: () => void
}
export const CartContent: FC<CartContentProps> = ({ cartItems, refetchCart }) => {
  const navigate = useNavigate()
  const [totalCartAmount, setTotalCartAmount] = useState<number>(0)

  const calculateTotalCartAmount = () => {
    const totalAmount = cartItems.reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0)

    setTotalCartAmount(round(totalAmount, 2))
  }

  useEffect(() => {
    calculateTotalCartAmount()
  }, [cartItems])

  const [removeProductFromCart] = useRemoveProductFromCartMutation({
    onCompleted: () => {
      refetchCart()
      calculateTotalCartAmount()
    },
  })

  const [addProductToCart] = useAddProductToCartMutation({
    onCompleted: () => {
      refetchCart()
      calculateTotalCartAmount()
    },
  })

  return (
    <Flex display-name="main-content" w="100%" h="100%" gap={6} justify="space-between">
      <Flex display-name="cart-items-table" h="100%">
        <TableContainer w="100%">
          <Table variant="simple" size="lg">
            <Thead>
              <Tr>
                <Th></Th>
                <Th></Th>
                <Th style={{ textTransform: 'capitalize', fontWeight: '500' }}>Product</Th>
                <Th style={{ textTransform: 'capitalize', fontWeight: '500' }}>Price</Th>
                <Th style={{ textTransform: 'capitalize', fontWeight: '500' }}>Quantity</Th>
                <Th style={{ textTransform: 'capitalize', fontWeight: '500' }}>Subtotal</Th>
              </Tr>
            </Thead>
            <Tbody>
              {cartItems.map(({ imageUrl, price, productId, quantity, title }) => (
                <Tr key={productId}>
                  <Td
                    _hover={{ color: '#D9121F', cursor: 'pointer' }}
                    onClick={() => {
                      void removeProductFromCart({
                        variables: {
                          userId: 'ba99f941-347a-4d86-87ae-aa20fae0e30e',
                          productId,
                          removeAll: true,
                        },
                      })
                    }}
                  >
                    <MultiplicationSignIcon size={15} />
                  </Td>
                  <Td>
                    <Image src={imageUrl} alt={title} h="100px" w="80px" />
                  </Td>
                  <Td
                    style={{ fontWeight: '400' }}
                    _hover={{ cursor: 'pointer', color: '#00bb00', textDecoration: 'underline' }}
                    onClick={() => navigate(`/product/${productId}`)}
                  >
                    {title}
                  </Td>
                  <Td>{price}</Td>
                  <Td>
                    <AdjustQuantity
                      initialQuantity={quantity}
                      onIncrement={() =>
                        void addProductToCart({
                          variables: {
                            userId: 'ba99f941-347a-4d86-87ae-aa20fae0e30e',
                            productId,
                          },
                        })
                      }
                      onDecrement={() =>
                        void removeProductFromCart({
                          variables: {
                            userId: 'ba99f941-347a-4d86-87ae-aa20fae0e30e',
                            productId,
                            removeAll: false,
                          },
                        })
                      }
                    />
                  </Td>
                  <Td>{price * quantity}</Td>
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
            <Text>{`₹ ${totalCartAmount}`}</Text>
          </Flex>
          <Flex display-name="total" justify="space-between" p="15px 0">
            <Text>Total</Text>
            <Text fontSize="3xl">{`₹ ${totalCartAmount}`}</Text>
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
            onClick={() => navigate('/checkout')}
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
