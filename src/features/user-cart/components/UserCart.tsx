import React, { FC, useEffect, useState } from 'react'
import { useUserCartQuery } from '../apis/userCart.generated'
import { SpinnerContainer } from '@/components/elements/Spinner'
import { Button, Flex, Heading, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { Delete02Icon } from 'hugeicons-react'
import { useEmptyCartMutation } from '../apis/emptyCart.generated'
import { EmptyCart } from './EmptyCart'
import { CartContent } from './CartContent'
import { ContentLayout } from '@/components/Layout'

const UserCart: FC = () => {
  const navigate = useNavigate()
  const [totalCartItems, setTotalCartItems] = useState<number>(0)

  const { data, loading, refetch } = useUserCartQuery({
    variables: {
      userId: 'ba99f941-347a-4d86-87ae-aa20fae0e30e',
    },
    fetchPolicy: 'network-only',
  })

  const [emptyCart, { loading: emptyingCart }] = useEmptyCartMutation({
    variables: {
      userId: 'ba99f941-347a-4d86-87ae-aa20fae0e30e',
    },
    onCompleted: () => refetch(),
  })

  useEffect(() => {
    if (data) {
      const totalNumberOfProducts = data.userCart.reduce((total, item) => {
        return total + item.quantity
      }, 0)
      setTotalCartItems(totalNumberOfProducts)
    }
  }, [data])

  if (loading || !data) {
    return <SpinnerContainer height="60vh" />
  }

  return (
    <ContentLayout pageTitle="user-cart" showFullPageScroll>
      <Flex display-name="main-cart-section" w="100%" gap={6} pt="30px" flexDir="column">
        <Flex display-name="heading-flex" w="100%" align="center" gap={6}>
          <Flex display-name="heading-flex" align="center">
            <Heading fontSize="xl">SHOPPING CART</Heading>
          </Flex>
          {totalCartItems !== 0 && (
            <>
              <Flex display-name="divider" w="2px" h="30px" bg="gray.200" />
              <Flex display-name="number-of-items-flex" align="center">
                <Heading fontSize="xl">{totalCartItems} Items</Heading>
              </Flex>
              <Button
                variant="outline"
                size="md"
                color="black"
                _hover={{ background: 'white', color: 'black', border: '1px solid black' }}
                borderRadius="40px"
                onClick={() => void emptyCart()}
                leftIcon={
                  emptyingCart ? (
                    <SpinnerContainer size="20px" overflow="unset" />
                  ) : (
                    <Delete02Icon />
                  )
                }
              >
                Empty Cart
              </Button>
            </>
          )}
        </Flex>
        {totalCartItems !== 0 && (
          <Flex
            display-name="continue-shopping-flex"
            w="100%"
            align="center"
            justify="end"
            onClick={() => navigate('/')}
          >
            <Text color="#00bb00" _hover={{ cursor: 'pointer', textDecoration: 'underline' }}>
              Continue Shopping
            </Text>
          </Flex>
        )}
        {totalCartItems === 0 ? (
          <EmptyCart />
        ) : (
          <CartContent cartItems={data.userCart} refetchCart={refetch} />
        )}
      </Flex>
    </ContentLayout>
  )
}

export default UserCart
