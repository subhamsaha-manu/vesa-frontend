import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Circle, Flex, IconButton } from '@chakra-ui/react'
import React from 'react'

import { DOTS, usePagination } from './usePagination'

export const Pagination = (props: {
  onPageChange: (param: number) => void
  totalCount: number
  siblingCount?: 1 | undefined
  currentPage: number
  pageSize: number
}) => {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize } = props

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  if (paginationRange) {
    if (currentPage === 0 || paginationRange.length < 2) {
      return null
    }

    const onNext = () => {
      onPageChange(currentPage + 1)
    }

    const onPrevious = () => {
      onPageChange(currentPage - 1)
    }

    const lastPage = paginationRange[paginationRange.length - 1]
    return (
      <Flex
        display-name="pagination-bar"
        w="100%"
        align="center"
        justify="center"
        gap={5}
        mb="20px !important"
      >
        <IconButton
          aria-label="Search database"
          icon={<ChevronLeftIcon />}
          disabled={currentPage === 1}
          onClick={onPrevious}
        />
        {paginationRange.map((pageNumber: any) => {
          if (pageNumber === DOTS) {
            return (
              <li className="pagination-item dots" key={pageNumber}>
                &#8230;
              </li>
            )
          }

          return (
            <Circle
              size="50px"
              key={pageNumber}
              background={currentPage === pageNumber ? '#0bc5ea' : 'transparent'}
              onClick={() => onPageChange(pageNumber)}
              _hover={{ cursor: 'pointer' }}
            >
              {pageNumber}
            </Circle>
          )
        })}
        <IconButton
          aria-label="Search database"
          icon={<ChevronRightIcon />}
          disabled={currentPage === lastPage}
          onClick={onNext}
        />
      </Flex>
    )
  }
  return <></>
}
