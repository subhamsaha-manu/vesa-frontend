import { Flex } from '@chakra-ui/react'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import SearchInput from '@/components/elements/SearchInput'
import { Button } from '@/components/ui/button'

type HeaderActionsProps = {
  setSearchText: (text: string) => void
}

export const HeaderActions: FC<HeaderActionsProps> = ({ setSearchText }) => {
  const navigate = useNavigate()

  return (
    <Flex flex=".5" justify="flex-end" align="center" gap={4}>
      <SearchInput onSearch={setSearchText} placeholder="Search Category" />
      <Button
        variant="solid"
        colorScheme="blue"
        minW="fit-content"
        onClick={() => navigate('/admin/category/add')}
      >
        Add Category
      </Button>
    </Flex>
  )
}
