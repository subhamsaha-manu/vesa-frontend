import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { Text } from '@chakra-ui/layout'
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  Flex,
  IconButton,
  Image,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { UserIcon } from 'hugeicons-react'
import { debounce } from 'lodash'
import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import SearchInput from '@/components/elements/SearchInput'
import useCategoriesContextProvider from '@/context/CategoriesContextProvider'
import useCurrentUserContext from '@/context/CurrentUserContextProvider'
import { UserCartHeaderIcon } from '@/features/user-cart'
import { UserWishlistHeaderIcon } from '@/features/user-wishlist'
import { useEvent } from '@/hooks'
import { useWindowSize } from '@/hooks/useWindowSize'
import { MOBILE_VESA_LOGO_URL, USER_ID } from '@/utils/constants'
import { storage } from '@/utils/storage'

export const LandingPageHeader = () => {
  const { isOpen, onToggle } = useDisclosure()
  const { categories } = useCategoriesContextProvider()

  const { currentUser } = useCurrentUserContext()

  const userId = storage.getItem(USER_ID)

  const size = useWindowSize()

  const { width } = size

  const isMobile = width && width < 768

  const navigate = useNavigate()

  const { dispatch } = useEvent('onSearchInputChange')

  const handleUserIconClick = () => {
    if (userId) {
      if (currentUser?.isAdmin) {
        navigate('/admin')
      } else {
        navigate('/account/orders')
      }
    } else {
      navigate('/auth')
    }
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
  ]

  const onSearchInputChange = debounce((text: string) => {
    if (text === '') {
      dispatch(undefined)
    }
    if (text.length > 2) {
      dispatch(text)
    }
  }, 500)

  return (
    <Box display-name="landing-page-header-box" position="sticky" top="0" zIndex={1500}>
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
        <Flex ml={{ base: -2 }} display={{ base: 'flex', md: 'none' }} flex={1}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? (
                <CloseIcon
                  w={5}
                  h={5}
                  style={{ transition: 'transform 0.3s', transform: 'rotate(180deg)' }}
                />
              ) : (
                <HamburgerIcon
                  w={5}
                  h={5}
                  style={{ transition: 'transform 0.3s', transform: 'rotate(0deg)' }}
                />
              )
            }
            variant="outline"
            aria-label="Toggle Navigation"
            border="none"
            _hover={{ bg: 'transparent' }}
          />
        </Flex>
        <Link to="/">
          <Flex
            justify={{ base: 'center', md: 'start' }}
            alignItems={{ base: 'center', md: 'center' }}
            display-name="landing-page-header-logo-flex-for-larger-screen"
            display={{ base: 'none', md: 'flex' }}
            maxW="200px"
            cursor="pointer"
          >
            <Image src={MOBILE_VESA_LOGO_URL} objectFit="scale-down" alt="VESA Logo" w="200px" />
          </Flex>
        </Link>
        <Link to="/">
          <Flex
            justify="center"
            alignItems="center"
            display-name="landing-page-header-logo-flex-for-smaller-screen"
            display={{ base: 'flex', md: 'none' }}
            flex={1}
            cursor="pointer"
          >
            <Image src={MOBILE_VESA_LOGO_URL} objectFit="scale-down" alt="VESA Logo" w="120px" />
          </Flex>
        </Link>

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
            <Link to={path} key={label}>
              <Flex
                display-name="landing-page-header-menu-options-flex"
                key={label}
                _hover={{ cursor: 'pointer' }}
              >
                <Text fontSize="xl" color="subtle">
                  {label}
                </Text>
              </Flex>
            </Link>
          ))}
        </Flex>
        <Flex
          display-name="landing-page-header-search-product-flex"
          mr="20px"
          w="400px"
          display={{ base: 'none', md: 'flex' }}
        >
          <SearchInput onSearch={onSearchInputChange} placeholder="Search for products" />
        </Flex>
        <Flex
          justify="end"
          alignItems={{ base: 'center', md: 'center' }}
          display-name="landing-page-header-icons-flex"
          gap={{ base: 4, md: 8 }}
          flex={{ base: 1, xl: 0 }}
        >
          <Flex
            display-name="user-account-header-icon"
            gap={2}
            _hover={{ color: '#FFFFFF', cursor: 'pointer', position: 'relative' }}
          >
            <UserIcon
              size={isMobile ? 18 : 22}
              style={{ cursor: 'pointer' }}
              onClick={handleUserIconClick}
            />
          </Flex>
          {!currentUser?.isAdmin && (
            <>
              <UserWishlistHeaderIcon />
              <UserCartHeaderIcon />
            </>
          )}
        </Flex>
      </Flex>

      <Drawer isOpen={isOpen} onClose={onToggle} placement="left" size="xs" preserveScrollBarGap>
        <DrawerContent
          sx={{
            top: '60px !important',
          }}
        >
          <DrawerBody p={0}>
            <MobileNav menuOptions={menuOptions} onToggle={onToggle} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

type MobileNavProps = {
  menuOptions: { label: string; path: string }[]
  onToggle: () => void
}
const MobileNav: FC<MobileNavProps> = ({ menuOptions, onToggle }) => {
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
          onClick={() => {
            onToggle()
            navigate(path)
          }}
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
