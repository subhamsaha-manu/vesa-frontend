import { Flex, PopoverArrow, PopoverBody, PopoverContent, Text, VStack } from '@chakra-ui/react'
import { FC } from 'react'
import { BiAddToQueue } from 'react-icons/bi'
import { HiOutlineUsers } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

export const SettingsMenu: FC = () => {
  const menuOptions = [
    {
      testId: 'upload-question',
      title: 'Upload Question',
      icon: <BiAddToQueue />,
      url: '/app/admin-settings/questions/',
    },
    {
      testId: 'modify-user-privilege',
      title: 'Modify User privilege',
      icon: <HiOutlineUsers />,
      url: '',
    },
  ]

  const navigate = useNavigate()

  return (
    <PopoverContent w="230px">
      <PopoverArrow />
      <PopoverBody cursor="pointer">
        <VStack display-name="admin-settings-options" p={2} align="start" spacing={2}>
          {menuOptions.map(({ testId, title, icon, url }) => {
            return (
              <Flex
                key={testId}
                display-name={`${testId}-setting-option`}
                _hover={{ background: 'gray.100' }}
                alignItems="center"
                flexDir="row"
                w="100%"
                gap={3}
                p={1}
                onClick={() => navigate(url)}
              >
                {icon}
                <Text fontSize="md">{title}</Text>
              </Flex>
            )
          })}
        </VStack>
      </PopoverBody>
    </PopoverContent>
  )
}
