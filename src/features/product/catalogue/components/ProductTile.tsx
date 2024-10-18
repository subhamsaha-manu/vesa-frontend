import { FC } from 'react'
import { MinifiedProduct } from '@/types'
import { Flex, Image } from '@chakra-ui/react'
import { Text } from '@chakra-ui/layout'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { INR_CURRENCY_SYMBOL } from '@/utils/constants'

type ProductTileProps = {
  product: Omit<MinifiedProduct, 'quantity'>
}

export const ProductTile: FC<ProductTileProps> = ({ product }) => {
  const navigate = useNavigate()
  const { imageUrl, price, productId, title, isOutOfStock } = product

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
        position: 'relative',
      }}
      onClick={() => navigate(`/product/${productId}`)}
    >
      <Flex flexDir="column" borderRadius={2}>
        <Image
          src={imageUrl}
          alt={title}
          borderRadius="4px"
          borderBottomRadius={0}
          loading="lazy"
          width="100%"
          aspectRatio="3/4"
          style={{ transition: 'transform 0.3s ease-in-out' }}
        />
        {isOutOfStock && (
          <Flex
            position="absolute"
            top="0"
            left="0"
            w="100%"
            h="100%"
            bg="rgba(0, 0, 0, 0.6)"
            alignItems="center"
            justifyContent="center"
            borderRadius="12px"
            zIndex="1"
          >
            <Text
              color="white"
              fontSize="xl"
              fontWeight="bold"
              textTransform="uppercase"
              textAlign="center"
              bg="rgba(255, 0, 0, 0.8)"
              px="10px"
              py="5px"
              borderRadius="8px"
              boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)"
            >
              Out of Stock
            </Text>
          </Flex>
        )}
        <Flex
          flexDir="column"
          p="15px"
          bgColor="rgba(255, 255, 255, 0.75)"
          backdropFilter="blur(10px)"
          borderRadius="0 0 12px 12px"
          boxShadow="0px 4px 12px rgba(0, 0, 0, 0.05)"
          position="relative"
        >
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
            {title}
          </Text>

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
              {INR_CURRENCY_SYMBOL} {price.toFixed(2)}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </motion.div>
  )
}
