import { Flex, Heading, Image, Text, useColorModeValue } from '@chakra-ui/react'
import { Mail01Icon, WhatsappIcon } from 'hugeicons-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Copyright } from './Copyright'
import { SEOContent } from './SEOContent'

import { useWindowSize } from '@/hooks/useWindowSize'
import { VESA_LOGO_URL } from '@/utils/constants'

export const Footer = () => {
  const size = useWindowSize()
  const navigate = useNavigate()

  const { width } = size

  const isMobile = width && width < 768

  return (
    <Flex
      w="100%"
      flexDir="column"
      color={useColorModeValue('gray.700', 'gray.200')}
      borderTop="1px solid #e6e6e6"
      display-name="app-footer"
      id="app-footer"
      position="relative"
      bottom="0"
      left="0"
      background="#e5e2db"
      p={{ base: '20px 0 10px 0', xl: '30px 173px' }}
    >
      <Flex
        w="100%"
        display-name="app-footer-flex"
        gap="32px"
        flexDir={{ base: 'column', xl: 'row' }}
        p={{ base: '0 20px', xl: '0' }}
      >
        <Flex flexDir="column" gap={4} display-name="about-vesa">
          <Flex display-name="mobile" gap={2} flexDir="column">
            <Image src={VESA_LOGO_URL} objectFit="fill" alt="VESA Logo" h="200px" w="200px" />
            <Text fontSize="sm">
              Discover a consciously elevated & responsibly crafted fashion brand, with an Indian
              heart.
            </Text>
          </Flex>
          <Flex display-name="mobile" gap={2} flexDir="column">
            <Heading fontSize={{ base: 'sm', xl: 'md' }}>Shop Securely Using:</Heading>
            <Text fontSize="sm">mail.vesa.team@gmail.com</Text>
          </Flex>
        </Flex>

        <Flex flexDir="column" gap={4} display-name="important-links">
          <Heading fontSize={{ base: 'sm', xl: 'md' }}>Quick Links</Heading>
          <Flex display-name="mobile" gap={2} flexDir="column">
            <Link to="/about-us">
              <Text fontSize="sm" color="subtle">
                About Us
              </Text>
            </Link>
            <Link to="/contact-us">
              <Text fontSize="sm" color="subtle">
                Contact Us
              </Text>
            </Link>
            <Link to="">
              <Text fontSize="sm" color="subtle">
                Terms & Conditions
              </Text>
            </Link>
          </Flex>
        </Flex>
        <Flex flexDir="column" gap={4} display-name="account-related-links">
          <Heading fontSize={{ base: 'sm', xl: 'md' }}>Account</Heading>
          <Flex display-name="mobile" gap={2} flexDir="column">
            <Link to="/about-us">
              <Text fontSize="sm" color="subtle">
                My Account
              </Text>
            </Link>
            <Link to="/contact-us">
              <Text fontSize="sm" color="subtle">
                Refund Policy
              </Text>
            </Link>
            <Link to="">
              <Text fontSize="sm" color="subtle">
                Privacy Policy
              </Text>
            </Link>
            <Link to="">
              <Text fontSize="sm" color="subtle">
                Shipping Policy
              </Text>
            </Link>
            <Link to="">
              <Text fontSize="sm" color="subtle">
                FAQ
              </Text>
            </Link>
            <Link to="">
              <Text fontSize="sm" color="subtle">
                Return/Exchange
              </Text>
            </Link>
          </Flex>
        </Flex>
        <Flex flexDir="column" gap={4} display-name="customer-care">
          <Heading fontSize={{ base: 'sm', xl: 'md' }}>Reach us at</Heading>
          <Flex display-name="mobile" gap={2}>
            <WhatsappIcon size={isMobile ? 18 : 24} color="#25d366" />
            <Text fontSize="sm">+91-9876543210</Text>
          </Flex>
          <Flex display-name="mobile" gap={2}>
            <Mail01Icon size={isMobile ? 18 : 24} color="#25d366" />
            <Text fontSize="sm">mail.vesa.team@gmail.com</Text>
          </Flex>
        </Flex>
      </Flex>
      <SEOContent />
      <Copyright />
    </Flex>
  )
}
