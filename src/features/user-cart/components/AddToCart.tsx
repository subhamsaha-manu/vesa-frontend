import { Button, Flex } from '@chakra-ui/react'
import { ShoppingCartCheckIn01Icon } from 'hugeicons-react'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAddProductToCartMutation } from '../apis/addProductToCart.generated'
import { userCart } from '../apis/userCart'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { TOKEN } from '@/utils/constants'
import { storage } from '@/utils/storage'

type AddToCartProps = {
  productId: string
  mobileView?: boolean
}
export const AddToCart: FC<AddToCartProps> = ({ productId, mobileView }) => {
  const authToken = storage.getItem(TOKEN)

  const [addedToCart, setAddedToCart] = useState<boolean>(false)

  const navigate = useNavigate()

  const [addToCart, { loading }] = useAddProductToCartMutation({
    variables: {
      productId,
    },
    refetchQueries: [{ query: userCart }],
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
            if (authToken) {
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
