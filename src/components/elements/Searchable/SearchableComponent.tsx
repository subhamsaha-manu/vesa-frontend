import { Flex } from '@chakra-ui/react'
import React, { FC } from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Searchable from 'react-searchable-dropdown'
import styled from 'styled-components'

import { DropdownItemsType } from './index'

type SearchableComponentProps = {
  items: Array<DropdownItemsType>
  selectedItem?: string
  onSelectionChange: (param: string) => void
}

const SearchableWrapper = styled.div`
  .searchable {
    width: 300px;
  }
`
export const SearchableComponent: FC<SearchableComponentProps> = ({
  items,
  selectedItem,
  onSelectionChange,
}) => {
  return (
    <Flex mt={2}>
      <SearchableWrapper>
        <Searchable
          placeholder="Search"
          notFoundText="No friend online"
          value={selectedItem}
          options={items}
          listMaxHeight={200}
          onSelect={(value: string) => {
            onSelectionChange(value)
          }}
        />
      </SearchableWrapper>
    </Flex>
  )
}
