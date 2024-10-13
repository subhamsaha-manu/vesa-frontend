import { Avatar, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react'
import { IoMdLogOut } from 'react-icons/io'
import { MdPassword } from 'react-icons/md'
import { VscAccount } from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import useCurrentUserContext from '@/context/CurrentUserContextProvider'
import { storage } from '@/utils/storage'
import { TOKEN, USER_ID } from '@/utils/constants'

const MenuItemWrapper = styled.div`
  margin: 10px 0 10px 11px;
  width: 100%;
`

export const AppHeader = () => {
  const { currentUser } = useCurrentUserContext()

  const navigate = useNavigate()

  return (
    <Menu>
      <MenuButton as={IconButton} isRound _focus={{ boxShadow: 'none' }}>
        <Avatar size="md" name={currentUser?.name} bg="#025a8f" />
      </MenuButton>
      <MenuList zIndex="10">
        <MenuItem icon={<VscAccount fontSize="20px" />} onClick={() => navigate('/app/my-account')}>
          My Account
        </MenuItem>
        <MenuItem
          icon={<MdPassword fontSize="20px" />}
          onClick={() => navigate('/app/change-password')}
        >
          Change Password
        </MenuItem>
        <MenuItem
          icon={<IoMdLogOut fontSize="20px" />}
          onClick={() => {
            storage.clearItem(USER_ID)
            storage.clearItem(TOKEN)
            navigate('/')
          }}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
