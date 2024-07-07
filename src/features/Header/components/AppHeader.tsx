import {
  Avatar,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverTrigger,
} from '@chakra-ui/react'
import React from 'react'
import { FcSettings } from 'react-icons/fc'
import { IoMdLogOut } from 'react-icons/io'
import { MdPassword } from 'react-icons/md'
import { VscAccount } from 'react-icons/vsc'
import { useNavigate } from 'react-router'
import styled from 'styled-components'

import { SettingsMenu as AdminSettingsMenu } from '@/features/admin'
import { logoutFn, useCurrentUserContext } from '@/features/auth'
import { useLogoutMutation } from '@/features/auth/apis/logoutUser.generated'

const MenuItemWrapper = styled.div`
  margin: 10px 0 10px 11px;
  width: 100%;
`

export const AppHeader = () => {
  const { currentUser } = useCurrentUserContext()
  const { name, roles } = currentUser!
  const navigate = useNavigate()

  const [logout] = useLogoutMutation({
    onCompleted: (data) => {
      if (data.logout) {
        logoutFn()
      }
    },
  })
  return (
    <Menu>
      <MenuButton as={IconButton} isRound _focus={{ boxShadow: 'none' }}>
        <Avatar size="md" name={name} bg="cyan.400" />
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
        {roles.includes('ADMIN') && (
          <Popover trigger="hover" placement="left" closeOnBlur={false}>
            <PopoverTrigger>
              <MenuItemWrapper display-name="admin-settings-menu-item-wrapper">
                <MenuItem icon={<FcSettings fontSize="20px" />}>Admin Settings</MenuItem>
              </MenuItemWrapper>
            </PopoverTrigger>
            <AdminSettingsMenu />
          </Popover>
        )}
        <MenuItem icon={<IoMdLogOut fontSize="20px" />} onClick={() => logout()}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
