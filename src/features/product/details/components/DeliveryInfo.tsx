import { Box, Flex, Icon, Link, Text } from '@chakra-ui/react'
import { Calendar01Icon, TruckIcon, TruckReturnIcon, Video01Icon } from 'hugeicons-react'
import React, { FC } from 'react'

export const DeliveryInfo: FC = () => {
  return (
    <Box bg="#FEF6E4" p="4" borderRadius="md">
      <Flex align="center" mb="2">
        <Icon as={Calendar01Icon} boxSize={4} color="#8B5E3C" />
        <Text ml="2" fontSize="sm" fontWeight="bold" color="#8B5E3C">
          Est Delivery by: Wed Mar 26 2025.
        </Text>
      </Flex>
      <Text fontSize="xs" color="gray.600">
        The exact delivery date will be shown on checkout page*
      </Text>

      <Flex justify="space-between" align="center" mt="4">
        <Flex align="center">
          <Icon as={TruckIcon} boxSize={5} color="gray.700" />
          <Text ml="2" fontSize="sm" fontWeight="medium">
            Free delivery
          </Text>
        </Flex>

        <Flex align="center">
          <Icon as={TruckReturnIcon} boxSize={5} color="gray.700" />
          <Text ml="2" fontSize="sm" fontWeight="medium">
            Easy Exchange in 10 days
          </Text>
        </Flex>
      </Flex>

      <Flex align="center" mt="4">
        <Icon as={Video01Icon} boxSize={5} color="red.500" />
        <Link
          ml="2"
          fontSize="sm"
          fontWeight="bold"
          color="red.500"
          href="/contact-us"
          _hover={{ textDecoration: 'underline' }}
        >
          Book a video call
        </Link>
      </Flex>
    </Box>
  )
}
