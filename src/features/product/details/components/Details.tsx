import { Flex, Heading, Text } from '@chakra-ui/react'
import { Accordion, AccordionItem } from '@heroui/react'
import { FC } from 'react'

type DetailsProps = {
  productDetail: string
}

export const Details: FC<DetailsProps> = ({ productDetail }) => {
  const defaultContent =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

  return (
    <Accordion defaultExpandedKeys={['1']}>
      <AccordionItem key="1" aria-label="PRODUCT DETAILS" title="PRODUCT DETAILS">
        <Flex w="100%" flexDir="column" gap={4} mt={4}>
          <Heading as="h3" size="md">
            Description
          </Heading>
          <Text fontSize="md">{productDetail}</Text>
        </Flex>
      </AccordionItem>
      <AccordionItem key="2" aria-label="PRODUCT DECLARATION" title="PRODUCT DECLARATION">
        <Flex w="100%" flexDir="column" gap={4} mt={4}>
          <Heading as="h3" size="md">
            Manufacturer
          </Heading>
          <Text fontSize="md">
            Manufacturer Vedant Fashions Limited,Paridhan Garment Park, 19, Canal South Road, SDF-1,
            4th Floor, A501-A502, Kolkata, West Bengal 700015 INDIA
          </Text>
        </Flex>
      </AccordionItem>
      <AccordionItem key="3" aria-label="SHIPPING & RETURNS" title="SHIPPING & RETURNS">
        <Flex w="100%" flexDir="column" gap={4} mt={4}>
          <Text fontSize="md">
            All ready to ship products are shipped within 48 hours of placing the order. A standard
            date of delivery shall be provided in the order confirmation email. We also provide an
            easy Exchange/Return Policy for all garments except Accessories.
          </Text>
          <Text fontSize="md">For details visit Shipping & Returns page.</Text>
        </Flex>
      </AccordionItem>
    </Accordion>
  )
}
