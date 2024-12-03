import { Button, Flex } from '@chakra-ui/react'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

export const HeaderActions: FC = () => {
  const navigate = useNavigate()

  return (
    <Flex flex=".5" justify="flex-end" align="center" gap={4}>
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
