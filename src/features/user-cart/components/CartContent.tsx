import { Flex, Heading, Image, Table, Text } from '@chakra-ui/react'
import { MultiplicationSignIcon } from 'hugeicons-react'
import round from 'lodash/round'
import { FC } from 'react'

import { AdjustCartItemQuantity } from './AdjustCartItemQuantity'

import { Button } from '@/components/ui/button'
import { CartItem, MinifiedProduct } from '@/types'
import { INR_CURRENCY_SYMBOL } from '@/utils/constants'

type CartContentProps = {
  cartItems: Array<CartItem>
  removeProductFromCart: (productId: string, removeAll: boolean) => void
  onItemClick: (productId: string) => void
  onCheckout: () => void
  totalCartAmount: number
  calculateTotalCartAmount: () => void
  minifiedProductDetails?: Array<Pick<MinifiedProduct, 'productId' | 'quantity' | 'isOutOfStock'>>
}
export const CartContent: FC<CartContentProps> = ({
  cartItems,
  removeProductFromCart,
  onItemClick,
  onCheckout,
  totalCartAmount,
  calculateTotalCartAmount,
  minifiedProductDetails,
}) => {
  return (
    <Flex display-name="main-content" w="100%" h="100%" gap={6} justify="space-between">
      <Flex display-name="cart-items-table" h="100%">
        <Table.Root variant="outline" size="lg" w="100%">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader />
              <Table.ColumnHeader />
              <Table.ColumnHeader style={{ textTransform: 'capitalize', fontWeight: '500' }} pr={0}>
                Product
              </Table.ColumnHeader>
              <Table.ColumnHeader style={{ textTransform: 'capitalize', fontWeight: '500' }} pr={0}>
                Price
              </Table.ColumnHeader>
              <Table.ColumnHeader style={{ textTransform: 'capitalize', fontWeight: '500' }} pr={0}>
                Quantity
              </Table.ColumnHeader>
              <Table.ColumnHeader style={{ textTransform: 'capitalize', fontWeight: '500' }} pr={0}>
                Subtotal
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {cartItems.map(({ imageUrl, price, productId, quantity, title }) => (
              <Table.Row key={productId}>
                <Table.Cell
                  _hover={{ color: '#D9121F', cursor: 'pointer' }}
                  onClick={() => removeProductFromCart(productId, true)}
                >
                  <MultiplicationSignIcon size={15} />
                </Table.Cell>
                <Table.Cell pl={0} pr={0}>
                  <Image src={imageUrl} alt={title} maxW="200px" />
                </Table.Cell>
                <Table.Cell
                  style={{ fontWeight: '400' }}
                  _hover={{ cursor: 'pointer', color: '#00bb00', textDecoration: 'underline' }}
                  onClick={() => onItemClick(productId)}
                  pr={0}
                >
                  {title}
                </Table.Cell>
                <Table.Cell pr={0}>{round(price, 2)}</Table.Cell>
                <Table.Cell pr={0}>
                  <AdjustCartItemQuantity
                    initialQuantity={quantity}
                    productId={productId}
                    removeProductFromCart={removeProductFromCart}
                    calculateTotalCartAmount={calculateTotalCartAmount}
                    maxQuantity={
                      minifiedProductDetails?.find((product) => product.productId === productId)
                        ?.quantity
                    }
                  />
                </Table.Cell>
                <Table.Cell pr={0}>{round(price * quantity, 2)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
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
