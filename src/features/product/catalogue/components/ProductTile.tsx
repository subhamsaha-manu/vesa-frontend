import { FC } from 'react'
import { MinifiedProduct } from '@/types'
import { Flex, Image } from '@chakra-ui/react'
import { Text } from '@chakra-ui/layout'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { INR_CURRENCY_SYMBOL } from '@/utils/constants'

type ProductTileProps = {
  product: Omit<MinifiedProduct, 'quantity' | 'isOutOfStock'>
}

export const ProductTile: FC<ProductTileProps> = ({ product }) => {
  const navigate = useNavigate()

  const hoverAnimation = {
    scale: 1.05,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  }

  return (
    <motion.div
      whileHover={hoverAnimation}
      style={{
        flex: '1 1 20%',
        margin: '20px 10px',
        borderRadius: '4px',
        cursor: 'pointer',
        overflow: 'hidden',
        backgroundColor: '#fff',
      }}
      onClick={() => navigate(`/product/${product.productId}`)}
    >
      <Flex flexDir="column" borderRadius={2}>
        <Image
          src={product.imageUrl}
          alt={product.title}
          borderRadius="4px"
          borderBottomRadius={0}
          loading="lazy"
          width="100%"
          aspectRatio="3/4"
          style={{ transition: 'transform 0.3s ease-in-out' }}
        />
        <Flex
          flexDir="column"
          p="15px"
          bgColor="rgba(255, 255, 255, 0.75)"
          backdropFilter="blur(10px)"
          borderRadius="0 0 12px 12px"
          boxShadow="0px 4px 12px rgba(0, 0, 0, 0.05)"
          position="relative"
        >
          {/* Product Title */}
          <Text
            fontSize="lg"
            fontWeight="bold"
            color="#1E355B"
            textAlign="center"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            _hover={{
              color: '#FF6363',
              transition: 'color 0.3s',
            }}
          >
            {product.title}
          </Text>

          {/* Product Price */}
          <Flex alignItems="center" justifyContent="center" mt="8px">
            <Text
              fontSize="md"
              fontWeight="600"
              color="#555"
              ml="4px"
              _hover={{
                color: '#FF6363',
                transition: 'color 0.3s',
              }}
            >
              {INR_CURRENCY_SYMBOL} {product.price.toFixed(2)}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </motion.div>
  )
}
