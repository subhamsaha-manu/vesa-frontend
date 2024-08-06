import React, { FC, useCallback, useEffect, useState } from 'react'
import { useUserCartQuery } from '../apis/userCart.generated'
import { SpinnerContainer } from '@/components/elements/Spinner'
import { useNavigate } from 'react-router-dom'
import { useEmptyCartMutation } from '../apis/emptyCart.generated'
import { ContentLayout } from '@/components/Layout'
import useCurrentUserContext from '@/context/CurrentUserContextProvider'
import { useWindowSize } from '@/hooks/useWindowSize'
import { UserCartDesktopView } from './UserCartDesktopView'
import { useRemoveProductFromCartMutation } from '../apis/removeProductFromCart.generated'
import { userCart } from '../apis/userCart'
import round from 'lodash/round'
import { UserCartMobileView } from '@/features/user-cart/components/UserCartMobileView'
import { Button, Flex, Heading, Text } from '@chakra-ui/react'
import { Delete02Icon } from 'hugeicons-react'

const UserCart: FC = () => {
  const navigate = useNavigate()
  const size = useWindowSize()

  const { width } = size

  const isMobile = width && width < 768

  const [totalCartItems, setTotalCartItems] = useState<number>(0)
  const [totalCartAmount, setTotalCartAmount] = useState<number>(0)

  const {
    currentUser: { userId },
  } = useCurrentUserContext()

  const { data, loading, refetch } = useUserCartQuery({
    variables: {
      userId,
    },
    fetchPolicy: 'network-only',
  })

  const [emptyCart, { loading: emptyingCart }] = useEmptyCartMutation({
    variables: {
      userId,
    },
    onCompleted: () => refetch(),
  })

  const [removeProductFromCart] = useRemoveProductFromCartMutation({
    onCompleted: () => {
      calculateTotalCartAmount()
    },
    refetchQueries: [{ query: userCart, variables: { userId } }],
  })

  const calculateTotalCartAmount = useCallback(() => {
    const totalAmount = data?.userCart.reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0)

    if (totalAmount) {
      setTotalCartAmount(round(totalAmount, 2))
    }
  }, [data?.userCart, setTotalCartAmount])

  useEffect(() => {
    if (data) {
      const totalNumberOfProducts = data.userCart.reduce((total, item) => {
        return total + item.quantity
      }, 0)
      setTotalCartItems(totalNumberOfProducts)
    }
  }, [data])

  useEffect(() => {
    calculateTotalCartAmount()
  }, [data])

  if (loading || !data) {
    return <SpinnerContainer height="60vh" />
  }

  return (
    <ContentLayout pageTitle="Cart" showFullPageScroll>
      <Flex
        display-name="main-user-cart-section"
        w="100%"
        gap={6}
        pt={{ base: '10px', xl: '30px' }}
        flexDir="column"
      >
        <Flex
          display-name="heading-flex"
          w="100%"
          align="center"
          gap={6}
          justify={isMobile ? 'space-between' : 'start'}
        >
          <Flex display-name="heading-flex" align="center">
            <Heading fontSize={{ base: 'md', xl: 'xl' }}>Your Cart</Heading>
          </Flex>
          {totalCartItems !== 0 && isMobile && (
            <Flex
              display-name="continue-shopping-flex"
              align="center"
              justify="end"
              onClick={() => navigate('/')}
            >
              <Text
                color="#00bb00"
                size="xs"
                _hover={{ cursor: 'pointer', textDecoration: 'underline' }}
              >
                Continue Shopping
              </Text>
            </Flex>
          )}
          {totalCartItems !== 0 && !isMobile && (
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
        {isMobile ? (
          <UserCartMobileView
            cartItems={data.userCart}
            onEmptyCart={emptyCart}
            showSpinner={emptyingCart}
            totalCartItems={totalCartItems}
            continueShopping={() => navigate('/')}
            removeProductFromCart={(productId, removeAll) => {
              void removeProductFromCart({
                variables: {
                  userId,
                  productId,
                  removeAll,
                },
              })
            }}
            onCheckout={() => navigate('/checkout')}
            totalCartAmount={totalCartAmount}
            onItemClick={(productId) => navigate(`/product/${productId}`)}
            calculateTotalCartAmount={calculateTotalCartAmount}
          />
        ) : (
          <UserCartDesktopView
            cartItems={data.userCart}
            totalCartItems={totalCartItems}
            continueShopping={() => navigate('/')}
            removeProductFromCart={(productId, removeAll) => {
              void removeProductFromCart({
                variables: {
                  userId,
                  productId,
                  removeAll,
                },
              })
            }}
            onCheckout={() => navigate('/checkout')}
            totalCartAmount={totalCartAmount}
            onItemClick={(productId) => navigate(`/product/${productId}`)}
            calculateTotalCartAmount={calculateTotalCartAmount}
          />
        )}
      </Flex>
    </ContentLayout>
  )
}

export default UserCart
