import { useState, FormEvent } from 'react';

import IC_Search from '@/shared/assets/icons/ic_search.svg';
import Button from '@/shared/ui/Button/Button';
import Input from '@/shared/ui/Input/Input';

import useIntervalPlaceholder from './useIntervalPlaceholder';

interface Props {
  onSearch: (keyword: string) => void;
}

const SearchForm = ({ onSearch }: Props) => {
  const [inputValue, setInputValue] = useState('');
  const placeholderWithCursor = useIntervalPlaceholder();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <form className="w-full relative" onSubmit={handleSubmit}>
      <Input
        icon={<IC_Search />}
        variant="secondary"
        radius="lg"
        placeholder={placeholderWithCursor}
        size="lg"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button type="submit" size="sm" className="absolute right-0 top-1/2 -translate-y-1/2 mr-3">
        검색하기
      </Button>
    </form>
  );
};

export default SearchForm;
