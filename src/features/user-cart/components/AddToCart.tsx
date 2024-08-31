import { FC, useState } from 'react'
import { Button, Flex } from '@chakra-ui/react'
import { ShoppingCartCheckIn01Icon } from 'hugeicons-react'
import { useAddProductToCartMutation } from '../apis/addProductToCart.generated'
import { SpinnerContainer } from '@/components/elements/Spinner'
import { useNavigate } from 'react-router-dom'
import { userCart } from '../apis/userCart'
import useCurrentUserContext from '@/context/CurrentUserContextProvider'

type AddToCartProps = {
  productId: string
  mobileView?: boolean
}
export const AddToCart: FC<AddToCartProps> = ({ productId, mobileView }) => {
  const [addedToCart, setAddedToCart] = useState<boolean>(false)

  const {
    currentUser: { userId },
  } = useCurrentUserContext()

  const navigate = useNavigate()

  const [addToCart, { loading }] = useAddProductToCartMutation({
    variables: {
      userId,
      productId,
    },
    refetchQueries: [{ query: userCart, variables: { userId } }],
    onCompleted: () => {
      setAddedToCart(true)
    },
  })

  return (
    <Flex display-name="add-to-cart-button-wrapper" style={{ width: 'calc(100%-148px)' }} flex={1}>
      {addedToCart ? (
        <Button
          variant="solid"
          size={mobileView ? 'sm' : 'lg'}
          color="white"
          background="black"
          _hover={{ background: 'white', color: 'black', border: '1px solid black' }}
          borderRadius="40px"
          onClick={() => navigate('/cart')}
          width="100%"
        >
          View Cart
        </Button>
      ) : (
        <Button
          variant="solid"
          size={mobileView ? 'sm' : 'lg'}
          color="white"
          background="black"
          leftIcon={
            loading ? (
              <SpinnerContainer size={mobileView ? '5px' : '20px'} overflow="unset" />
            ) : (
              <ShoppingCartCheckIn01Icon size={mobileView ? 18 : 22} />
            )
          }
          _hover={{ background: 'white', color: 'black', border: '1px solid black' }}
          borderRadius="40px"
          onClick={() => {
            if (userId) {
              void addToCart()
            } else {
              navigate('/auth')
            }
          }}
          isDisabled={loading}
          width="100%"
        >
          Add to Cart
        </Button>
      )}
    </Flex>
  )
}
