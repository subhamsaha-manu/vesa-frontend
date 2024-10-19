import { Button, Flex, Heading, Text } from '@chakra-ui/react'
import { Delete02Icon } from 'hugeicons-react'
import round from 'lodash/round'
import { FC, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { UserCartDesktopView } from './UserCartDesktopView'

import { useEmptyCartMutation } from '../apis/emptyCart.generated'
import { useRemoveProductFromCartMutation } from '../apis/removeProductFromCart.generated'
import { userCart } from '../apis/userCart'
import { useUserCartQuery } from '../apis/userCart.generated'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { ContentLayout } from '@/components/Layout'
import useUserWishlistCartContextProvider from '@/context/UserWishlistCartContextProvider'
import { useMinifiedProductDetailsQuery } from '@/features/user-cart/apis/minifiedProductDetails.generated'
import { UserCartMobileView } from '@/features/user-cart/components/UserCartMobileView'
import { useWindowSize } from '@/hooks/useWindowSize'

const UserCart: FC = () => {
  const navigate = useNavigate()
  const size = useWindowSize()

  useUserWishlistCartContextProvider()
  const { width } = size

  const isMobile = width && width < 768

  const [totalCartItems, setTotalCartItems] = useState<number>(0)
  const [totalCartAmount, setTotalCartAmount] = useState<number>(0)

  const { data, loading, refetch } = useUserCartQuery({
    fetchPolicy: 'network-only',
  })

  const { data: minifiedProductDetails } = useMinifiedProductDetailsQuery({
    variables: {
      productFilter: {
        ids: data?.userCart.map((item) => item.productId),
      },
      pageNumber: 0,
      pageSize: 100,
    },
    skip: !data?.userCart || loading,
  })

  const [emptyCart, { loading: emptyingCart }] = useEmptyCartMutation({
    onCompleted: () => refetch(),
  })

  const [removeProductFromCart] = useRemoveProductFromCartMutation({
    onCompleted: () => {
      calculateTotalCartAmount()
    },
    refetchQueries: [{ query: userCart }],
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
  }, [calculateTotalCartAmount, data])

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
                  productId,
                  removeAll,
                },
              })
            }}
            onCheckout={() => navigate('/checkout')}
            totalCartAmount={totalCartAmount}
            onItemClick={(productId) => navigate(`/product/${productId}`)}
            calculateTotalCartAmount={calculateTotalCartAmount}
            minifiedProductDetails={minifiedProductDetails?.products.products}
          />
        ) : (
          <UserCartDesktopView
            cartItems={data.userCart}
            totalCartItems={totalCartItems}
            continueShopping={() => navigate('/')}
            removeProductFromCart={(productId, removeAll) => {
              void removeProductFromCart({
                variables: {
                  productId,
                  removeAll,
                },
              })
            }}
            onCheckout={() => navigate('/checkout')}
            totalCartAmount={totalCartAmount}
            onItemClick={(productId) => navigate(`/product/${productId}`)}
            calculateTotalCartAmount={calculateTotalCartAmount}
            minifiedProductDetails={minifiedProductDetails?.products.products}
          />
        )}
      </Flex>
    </ContentLayout>
  )
}

export default UserCart
