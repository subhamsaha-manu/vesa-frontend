import { FC, useState } from 'react'
import { Button, Flex } from '@chakra-ui/react'
import { ShoppingCartCheckIn01Icon } from 'hugeicons-react'
import { useAddProductToCartMutation } from '@/features/user-cart/apis/addProductToCart.generated'
import { SpinnerContainer } from '@/components/elements/Spinner'
import { useNavigate } from 'react-router-dom'
import { userCart } from '../apis/userCart'

type AddToCartProps = {
  productId: string
}
export const AddToCart: FC<AddToCartProps> = ({ productId }) => {
  const [addedToCart, setAddedToCart] = useState<boolean>(false)

  const navigate = useNavigate()

  const [addToCart, { loading }] = useAddProductToCartMutation({
    variables: {
      userId: '286ead03-759a-4748-a802-e2a5e1fc1371',
      productId,
    },
    refetchQueries: [
      { query: userCart, variables: { userId: '286ead03-759a-4748-a802-e2a5e1fc1371' } },
    ],
    onCompleted: () => {
      setAddedToCart(true)
    },
  })

  return (
    <Flex display-name="add-to-cart-button-wrapper" style={{ width: 'calc(100%-148px)' }}>
      {addedToCart ? (
        <Button
          variant="solid"
          size="lg"
          color="white"
          background="black"
          _hover={{ background: 'white', color: 'black', border: '1px solid black' }}
          borderRadius="40px"
          onClick={() => navigate('/cart')}
        >
          View Cart
        </Button>
      ) : (
        <Button
          variant="solid"
          size="lg"
          color="white"
          background="black"
          leftIcon={
            loading ? (
              <SpinnerContainer size="20px" overflow="unset" />
            ) : (
              <ShoppingCartCheckIn01Icon />
            )
          }
          _hover={{ background: 'white', color: 'black', border: '1px solid black' }}
          borderRadius="40px"
          onClick={() => addToCart()}
          disabled={loading}
        >
          Add to Cart
        </Button>
      )}
    </Flex>
  )
}
