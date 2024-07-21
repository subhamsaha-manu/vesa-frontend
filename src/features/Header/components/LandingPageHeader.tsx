import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Collapse,
  Flex,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'

import React from 'react'
import { useNavigate } from 'react-router-dom'

import logo from '@/assets/logo/vesa-logo.jpg'
import { Search01Icon, UserIcon } from 'hugeicons-react'
import { Text } from '@chakra-ui/layout'
import useCategoriesContextProvider from '@/context/CategoriesContextProvider'
import { UserCartHeaderIcon } from '@/features/user-cart'

export const LandingPageHeader = () => {
  const { isOpen, onToggle } = useDisclosure()
  const { categories } = useCategoriesContextProvider()

  const navigate = useNavigate()

  const handleSignUpClick = () => {
    navigate('/auth/register')
  }

  const categoryMenuOptions = categories.map(({ name }) => ({
    label: name,
    path: `/product-category/${name.toLowerCase()}`,
  }))

  const menuOptions = [
    {
      label: 'Home',
      path: '/',
    },
    ...categoryMenuOptions,
    {
      label: 'About Us',
      path: '/about-us',
    },
    {
      label: 'Contact Us',
      path: '/contact-us',
    },
  ]

  return (
    <Box display-name="landing-page-header-box" position="sticky" top="0" zIndex={2}>
      <Flex
        display-name="landing-page-header-flex"
        bg="#e5e2db"
        color={useColorModeValue('gray.600', 'white')}
        minH="60px"
        h="120px"
        p={{ base: '15px 100px' }}
        borderBottom={1}
        borderStyle="solid"
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align="center"
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </Flex>
        <Flex
          justify={{ base: 'center', md: 'start' }}
          alignItems={{ base: 'center', md: 'center' }}
          display-name="landing-page-header-logo-flex"
        >
          <Image src={logo} objectFit="scale-down" alt="VESA Logo" w="120px" />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: 'center', md: 'center' }}
          alignItems={{ base: 'center', md: 'center' }}
          display-name="landing-page-header-menu-options-flex"
          gap={8}
          flexGrow={1}
        >
          {menuOptions.map(({ label, path }) => (
            <Flex
              display-name="landing-page-header-menu-options-flex"
              key={label}
              _hover={{ cursor: 'pointer' }}
              onClick={() => navigate(path)}
            >
              <Text fontSize="md" color="subtle">
                {label}
              </Text>
            </Flex>
          ))}
        </Flex>
        <Flex display-name="landing-page-header-search-product-flex" mr="70px">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Search01Icon color="gray.300" size={20} />
            </InputLeftElement>
            <Input
              placeholder="Search for product"
              size="md"
              background="white"
              borderRadius="40px"
            />
          </InputGroup>
        </Flex>
        <Flex
          justify={{ base: 'center', md: 'end' }}
          alignItems={{ base: 'center', md: 'center' }}
          display-name="landing-page-header-icons-flex"
          gap={8}
        >
          <UserIcon size={22} />
          <UserCartHeaderIcon />
        </Flex>

        {/*<Stack flex={{ base: 1, md: 1 }} justify="flex-end" direction="row" spacing={6}>*/}
        {/*  <Button*/}
        {/*    fontSize="md"*/}
        {/*    fontWeight={400}*/}
        {/*    variant="link"*/}
        {/*    onClick={() => navigate('/auth/login')}*/}
        {/*  >*/}
        {/*    Sign In*/}
        {/*  </Button>*/}
        {/*  <Button*/}
        {/*    display={{ base: 'none', md: 'inline-flex' }}*/}
        {/*    fontSize="md"*/}
        {/*    fontWeight={600}*/}
        {/*    color="white"*/}
        {/*    bg="cyan.400"*/}
        {/*    onClick={() => handleSignUpClick()}*/}
        {/*    _hover={{*/}
        {/*      bg: 'cyan.300',*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    Sign Up*/}
        {/*  </Button>*/}
        {/*</Stack>*/}
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav handleSignUpClick={handleSignUpClick} />
      </Collapse>
    </Box>
  )
}

type MobileNavProps = {
  handleSignUpClick: () => void
}
const MobileNav: React.FC<MobileNavProps> = ({ handleSignUpClick }) => {
  return (
    <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
      <Flex justify="center">
        <Button
          fontSize="md"
          fontWeight={600}
          color="black"
          border="1px solid black"
          onClick={() => handleSignUpClick()}
          _hover={{
            bg: 'cyan.300',
          }}
        >
          Sign Up
        </Button>
      </Flex>
    </Stack>
  )
}
