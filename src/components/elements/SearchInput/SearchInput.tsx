import { Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react'
import { CancelCircleIcon, Search01Icon } from 'hugeicons-react'
import { FC, useState } from 'react'

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
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <Search01Icon color="gray.300" size={20} />
      </InputLeftElement>
      <Input
        placeholder={placeholder}
        size="md"
        background="white"
        borderRadius="40px"
        onChange={(e) => onSearchInputChange(e.target.value)}
        value={searchText}
      />
      {searchText && (
        <InputRightElement style={{ cursor: 'pointer' }}>
          <CancelCircleIcon
            size={20}
            color="#000000"
            onClick={() => {
              setSearchText('')
              onSearch('')
            }}
          />
        </InputRightElement>
      )}
    </InputGroup>
  )
}

export default SearchInput
