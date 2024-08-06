import { FC } from 'react'
import { MinifiedProduct } from '@/types'
import { Flex, Image } from '@chakra-ui/react'
import { Text } from '@chakra-ui/layout'
import { useNavigate } from 'react-router-dom'
import { INR_CURRENCY_SYMBOL } from '@/utils/constants'

type ProductTileProps = {
  product: MinifiedProduct
}
export const ProductTile: FC<ProductTileProps> = ({ product }) => {
  const navigate = useNavigate()
  return (
    <Flex
      display-name="product-tile-flex"
      flexDir="column"
      borderRadius={8}
      gap={8}
      flex="1 1 calc(25% - 20px)"
      boxSizing="border-box"
      m="10px"
      _hover={{ cursor: 'pointer' }}
      onClick={() => navigate(`/product/${product.productId}`)}
    >
      <Flex display-name="product-image-section">
        <Image
          src={product.imageUrl}
          alt={product.title}
          aspectRatio="3/4"
          loading="lazy"
          borderRadius={8}
          _hover={{
            transition: 'transform 0.2s',
            transform: 'scale(1.05)',
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
          }}
        />
      </Flex>
      <Flex display-name="product-title-price-flex" flexDir="column" w="100%" gap={4}>
        <Text size="lg" color="#1E355B">
          {product.title}
        </Text>
        <Text size="md" color="#1E355B">
          {`${INR_CURRENCY_SYMBOL} ${product.price}`}
        </Text>
      </Flex>
    </Flex>
  )
}
