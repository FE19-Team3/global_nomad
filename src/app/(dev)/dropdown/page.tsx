// app/dropdown/page.tsx
'use client';

import { useState } from 'react';

import Divider from '@/shared/ui/Divider/Divider';
import Dropdown from '@/shared/ui/Dropdown';

export default function DropdownPage() {
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-6">Dropdown 테스트</h1>
      <p className="mt-4">선택된 값: {selectedValue || '없음'}</p>

      <div className="max-w-md">
        <Dropdown value={selectedValue} onChange={setSelectedValue}>
          <Dropdown.Trigger placeholder="가격" />
          <Dropdown.Menu>
            <Dropdown.Item value="low">가격이 낮은 순</Dropdown.Item>
            <Divider />
            <Dropdown.Item value="high">가격이 높은 순</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}
