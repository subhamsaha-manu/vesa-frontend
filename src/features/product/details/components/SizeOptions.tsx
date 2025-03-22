import { Flex, Text } from '@chakra-ui/react'
import React, { FC } from 'react'

type SizeOptionsProps = {
  sizes: string[]
  selectedSize: string
  onSelectSize: (size: string) => void
}

export const SizeOptions: FC<SizeOptionsProps> = ({ sizes, selectedSize, onSelectSize }) => (
  <Flex flexDir="column" gap={4} w="100%">
    <Text fontSize="lg">SELECT SIZE</Text>
    <Flex gap={2}>
      {sizes.map((size) => (
        <Flex
          key={size}
          w="50px"
          h="50px"
          borderRadius="50%"
          border={selectedSize === size ? '2px solid #000' : '2px solid #E5E5E5'}
          justify="center"
          align="center"
          cursor="pointer"
          onClick={() => onSelectSize(size)}
        >
          <Text fontSize="sm">{size}</Text>
        </Flex>
      ))}
    </Flex>
  </Flex>
)
