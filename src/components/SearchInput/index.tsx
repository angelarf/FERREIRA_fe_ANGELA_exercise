import React, {useCallback, useState} from 'react';
import {debounce} from 'lodash';

import {Container, Input} from './styles';
import IconSearch from './IconSearch';

type SearchInputProps = {
  setSearchTerm: (value: string) => void;
  placeholder?: string;
}

const SearchInput = ({setSearchTerm, placeholder = 'Search ...'}: SearchInputProps) => {
  const [value, setValue] = useState('');

  const debouncedSave = useCallback(
    debounce((nextValue: string) => setSearchTerm(nextValue), 500),
    [],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event?.target?.value;
    setValue(inputValue);
    debouncedSave(inputValue);
  };

  return <Container>
    <IconSearch width="1.5rem" height="1.5rem" fill="#2D56B2" />
    <Input
        type="search"
        value={value}
        onChange={handleChange}
        name="searchTeams"
        placeholder={placeholder}
    />
  </Container>;
};

export default SearchInput;