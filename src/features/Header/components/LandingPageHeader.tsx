import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'

import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import logo from '@/assets/logo/vesa-logo.jpg'
import mobileLogo from '@/assets/logo/vesa-logo-mobile.jpg'
import { Search01Icon, UserIcon } from 'hugeicons-react'
import { Text } from '@chakra-ui/layout'
import useCategoriesContextProvider from '@/context/CategoriesContextProvider'
import { UserCartHeaderIcon } from '@/features/user-cart'
import { UserWishlistHeaderIcon } from '@/features/user-wishlist'
import { useWindowSize } from '@/hooks/useWindowSize'

export const LandingPageHeader = () => {
  const { isOpen, onToggle } = useDisclosure()
  const { categories } = useCategoriesContextProvider()

  const size = useWindowSize()

  const { width } = size

  const isMobile = width && width < 768

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
    <Box display-name="landing-page-header-box" position="sticky" top="0" zIndex={10}>
      <Flex
        display-name="landing-page-header-flex"
        bg="#e5e2db"
        color={useColorModeValue('gray.600', 'white')}
        minH="60px"
        h={{ base: '60px', xl: '120px' }}
        p={{ base: '5px 10px', xl: '15px 100px' }}
        borderBottom={1}
        borderStyle="solid"
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align="center"
      >
        <Flex ml={{ base: -2 }} display={{ base: 'flex', md: 'none' }}>
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
          display={{ base: 'none', md: 'flex' }}
        >
          <Image src={logo} objectFit="scale-down" alt="VESA Logo" w="120px" />
        </Flex>
        <Flex
          justify="center"
          alignItems="center"
          display-name="landing-page-header-logo-flex"
          display={{ base: 'flex', md: 'none' }}
          flex={1}
        >
          <Image src={mobileLogo} objectFit="scale-down" alt="VESA Logo" w="120px" />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: 'center', md: 'center' }}
          alignItems={{ base: 'center', md: 'center' }}
          display-name="landing-page-header-menu-options-flex"
          gap={8}
          flexGrow={1}
          display={{ base: 'none', md: 'flex' }}
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
        <Flex
          display-name="landing-page-header-search-product-flex"
          mr="70px"
          display={{ base: 'none', md: 'flex' }}
        >
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
          gap={{ base: 4, md: 8 }}
        >
          <Flex
            display-name="user-account-header-icon"
            gap={2}
            _hover={{ color: '#FFFFFF', cursor: 'pointer', position: 'relative' }}
          >
            <UserIcon
              size={isMobile ? 18 : 22}
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/account/orders')}
            />
          </Flex>
          <UserWishlistHeaderIcon />
          <UserCartHeaderIcon />
        </Flex>
      </Flex>

      <Drawer
        isOpen={isOpen}
        onClose={onToggle}
        placement="left"
        size="xs"
        isFullHeight={false}
        // styleConfig={{ top: '60px', opacity: '.7' }}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody p={0}>
            <MobileNav menuOptions={menuOptions} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

type MobileNavProps = {
  menuOptions: { label: string; path: string }[]
}
const MobileNav: FC<MobileNavProps> = ({ menuOptions }) => {
  const navigate = useNavigate()

  return (
    <Flex
      flexDir="column"
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {menuOptions.map(({ label, path }) => (
        <Flex
          display-name="mobile-nav-menu-options-flex"
          key={label}
          _hover={{ cursor: 'pointer', background: 'gray.100' }}
          onClick={() => navigate(path)}
          h="50px"
          p={2}
          align="center"
        >
          <Text fontSize="md" color="subtle">
            {label}
          </Text>
        </Flex>
      ))}
    </Flex>
  )
}
