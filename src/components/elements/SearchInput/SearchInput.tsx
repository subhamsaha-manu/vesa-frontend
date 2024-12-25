import { Input } from '@chakra-ui/react'
import { CancelCircleIcon, Search01Icon } from 'hugeicons-react'
import { FC, useState } from 'react'

import { InputGroup } from '@/components/ui/input-group'

type SearchInputProps = {
  onSearch: (text: string) => void
  placeholder: string
}

const SearchInput: FC<SearchInputProps> = ({ onSearch, placeholder }) => {
  const [searchText, setSearchText] = useState<string>('')

  const onSearchInputChange = (text: string) => {
    setSearchText(text)
    onSearch(text)
  }

  return (
    <InputGroup
      flex="1"
      startElement={<Search01Icon color="gray.300" size={20} />}
      endElement={
        searchText && (
          <CancelCircleIcon
            size={20}
            color="#000000"
            onClick={() => {
              setSearchText('')
              onSearch('')
            }}
          />
        )
      }
    >
      <Input
        placeholder={placeholder}
        size="md"
        background="white"
        borderRadius="40px"
        onChange={(e) => onSearchInputChange(e.target.value)}
        value={searchText}
      />
    </InputGroup>
  )
}

export default SearchInput
