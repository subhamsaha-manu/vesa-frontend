import { Flex, Text } from '@chakra-ui/react'
import { CheckListIcon, Logout04Icon } from 'hugeicons-react'
import { Link, useNavigate } from 'react-router-dom'

import useCurrentUserContext from '@/context/CurrentUserContextProvider'
import { TOKEN, USER_ID } from '@/utils/constants'
import { storage } from '@/utils/storage'

export const Sidebar = () => {
  const {
    currentUser: { name },
  } = useCurrentUserContext()

  const navigate = useNavigate()

  return (
    <Flex display-name="account-nav" color="#666" flexDir="column" boxShadow="md">
      <Flex p="30px 0" justify="center" align="center">
        <Text size={{ base: 'md', xl: 'lg' }} fontWeight="bold">
          Hi, {name}
        </Text>
      </Flex>
      <Flex flexDir="column" align="stretch">
        <Link to="">
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
            <Text fontSize="md">All Orders</Text>
          </Flex>
        </Link>
        <Link to="products">
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
            <Text fontSize="md">All Products</Text>
          </Flex>
        </Link>
        <Flex
          display-name="account-nav-item"
          align="center"
          gap={4}
          p={{ base: '0 10px', xl: '0 20px' }}
          cursor="pointer"
          h="53px"
          borderTop="1px solid #f6f6f6"
          _hover={{ bg: 'gray.200' }}
          onClick={() => {
            storage.clearItem(USER_ID)
            storage.clearItem(TOKEN)
            navigate('/')
          }}
        >
          <Logout04Icon size={20} color="#000000" />
          <Text fontSize="md">Logout</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
