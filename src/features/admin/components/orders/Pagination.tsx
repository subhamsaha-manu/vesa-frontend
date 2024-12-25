import { Flex, IconButton, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'

type PaginationProps = {
  totalPages: number
  currentPage: number
  setCurrentPage: (page: number) => void
}

export const Pagination: FC<PaginationProps> = ({ totalPages, currentPage, setCurrentPage }) => {
  return (
    <Flex
      display-name="pagination-container"
      w="100%"
      justify="center"
      align="center"
      p={1}
      gap="32px"
      mt={8}
    >
      <IconButton
        aria-label="Previous page"
        disabled={currentPage === 0}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        <FaAngleLeft />
      </IconButton>

      <Text color="primary.default">
        {currentPage + 1} of {totalPages}
      </Text>

      <IconButton
        aria-label="Next Page"
        disabled={currentPage + 1 === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        <FaAngleRight />
      </IconButton>
    </Flex>
  )
}
