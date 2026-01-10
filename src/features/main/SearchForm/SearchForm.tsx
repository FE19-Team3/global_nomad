'use client';
import Image from 'next/image';
import { useState, FormEvent } from 'react';

import Button from '@/shared/ui/Button/Button';
import Input from '@/shared/ui/Input/Input';

import Icon from '@/shared/assets/images/ic_search.png';

const SearchForm = () => {
  const [value, setValue] = useState('');

  // TODO: 제출 api 연결
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('제출');
  };

  return (
    <form className="relative" onSubmit={handleSubmit}>
      <Input
        variant="secondary"
        placeholder="내가 원하는 체험은?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button iconOnly className="absolute top-1.5 right-2" type="submit" aria-label="검색하기">
        <Button.Icon>
          <Image src={Icon} alt="검색" width={24} height={24} />
        </Button.Icon>
      </Button>
    </form>
  );
};

export default SearchForm;
