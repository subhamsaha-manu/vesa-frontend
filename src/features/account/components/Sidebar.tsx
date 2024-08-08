import { Flex, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { CheckListIcon, Logout04Icon, MapsEditingIcon } from 'hugeicons-react'
import useCurrentUserContext from '@/context/CurrentUserContextProvider'
import { useWindowSize } from '@/hooks/useWindowSize'

export const Sidebar = () => {
  const {
    currentUser: { name },
  } = useCurrentUserContext()

  const size = useWindowSize()

  const { width } = size

  const isMobile = width && width < 768

  return (
    <Flex display-name="account-nav" color="#666" flexDir="column" boxShadow="md">
      <Flex p="30px 0" justify="center" align="center">
        <Text size={{ base: 'md', xl: 'lg' }} fontWeight="bold">
          Hi, {name}
        </Text>
      </Flex>
      <Flex flexDir="column" align="stretch">
        <Link to="addresses">
          <Flex
            display-name="account-nav-item"
            align="center"
            gap={4}
            p={{ base: '0 10px', xl: '0 20px' }}
            cursor="pointer"
            h="53px"
            borderTop="1px solid #f6f6f6"
            _hover={{ bg: 'gray.200' }}
          >
            <MapsEditingIcon size={20} color="#000000" />
            <Text fontSize="md">Addresses</Text>
          </Flex>
        </Link>
        <Link to="orders">
          <Flex
            display-name="account-nav-item"
            align="center"
            gap={4}
            p={{ base: '0 10px', xl: '0 20px' }}
            cursor="pointer"
            h="53px"
            borderTop="1px solid #f6f6f6"
            _hover={{ bg: 'gray.200' }}
          >
            <CheckListIcon size={20} color="#000000" />
            <Text fontSize="md">Orders</Text>
          </Flex>
        </Link>
        <Link to="orders">
          <Flex
            display-name="account-nav-item"
            align="center"
            gap={4}
            p={{ base: '0 10px', xl: '0 20px' }}
            cursor="pointer"
            h="53px"
            borderTop="1px solid #f6f6f6"
            _hover={{ bg: 'gray.200' }}
          >
            <Logout04Icon size={20} color="#000000" />
            <Text fontSize="md">Logout</Text>
          </Flex>
        </Link>
      </Flex>
    </Flex>
  )
}
