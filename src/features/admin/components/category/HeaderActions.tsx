import { Button, Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { Search01Icon } from 'hugeicons-react'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

type HeaderActionsProps = {
  setSearchText: (text: string) => void
}

export const HeaderActions: FC<HeaderActionsProps> = ({ setSearchText }) => {
  const navigate = useNavigate()

  return (
    <Flex flex=".5" justify="flex-end" align="center" gap={4}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Search01Icon color="gray.300" size={20} />
        </InputLeftElement>
        <Input
          placeholder="Search category"
          size="md"
          background="#F9F9F9"
          borderRadius="8px"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </InputGroup>
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
