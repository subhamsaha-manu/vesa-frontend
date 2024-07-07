import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Collapse,
  Flex,
  IconButton,
  Stack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const LandingPageHeader = () => {
  const { isOpen, onToggle } = useDisclosure()
  const navigate = useNavigate()

  const handleSignUpClick = () => {
    navigate('/auth/register')
  }
  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
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

        <Stack flex={{ base: 1, md: 1 }} justify="flex-end" direction="row" spacing={6}>
          <Button
            fontSize="md"
            fontWeight={400}
            variant="link"
            onClick={() => navigate('/auth/login')}
          >
            Sign In
          </Button>
          <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize="md"
            fontWeight={600}
            color="white"
            bg="cyan.400"
            onClick={() => handleSignUpClick()}
            _hover={{
              bg: 'cyan.300',
            }}
          >
            Sign Up
          </Button>
        </Stack>
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
