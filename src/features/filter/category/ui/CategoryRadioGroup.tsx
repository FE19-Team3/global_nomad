'use client';

import Art from '@/shared/assets/icons/icon_art.svg';
import Bus from '@/shared/assets/icons/icon_bus.svg';
import Food from '@/shared/assets/icons/icon_food.svg';
import Tour from '@/shared/assets/icons/icon_tour.svg';
import Wellbeing from '@/shared/assets/icons/icon_wellbeing.svg';
import { Button } from '@/shared/ui/Button/Button';

// **추후 수정**
// 라디오 필터 로직 추가 후 수정 예정
// 커스텀 스크롤 추가 후 수정 예정
export const CatecoryRadioGroup = () => {
  return (
    <div className="flex-1 overflow-x-auto scrollbar-hide">
      <ul className="flex gap-2 whitespace-nowrap" role="radiogroup">
        <li>
          <Button
            variant="badge"
            radius="full"
            className="px-4 py-2.5"
            iconSize="md"
            role="radio"
            aria-checked={false}
            selected
          >
            <Button.Icon>
              <Art />
            </Button.Icon>
            <Button.Label>문화·예술</Button.Label>
          </Button>
        </li>
        <li>
          <Button
            variant="badge"
            radius="full"
            className="px-4 py-2.5"
            iconSize="md"
            role="radio"
            aria-checked={false}
          >
            <Button.Icon>
              <Food />
            </Button.Icon>
            <Button.Label>식음료</Button.Label>
          </Button>
        </li>
        <li>
          <Button
            variant="badge"
            radius="full"
            className="px-4 py-2.5"
            iconSize="md"
            role="radio"
            aria-checked={false}
          >
            <Button.Icon>
              <Tour />
            </Button.Icon>
            <Button.Label>투어</Button.Label>
          </Button>
        </li>
        <li>
          <Button
            variant="badge"
            radius="full"
            className="px-4 py-2.5"
            iconSize="md"
            role="radio"
            aria-checked={false}
          >
            <Button.Icon>
              <Bus />
            </Button.Icon>
            <Button.Label>관광</Button.Label>
          </Button>
        </li>
        <li>
          <Button
            variant="badge"
            radius="full"
            className="px-4 py-2.5"
            iconSize="md"
            role="radio"
            aria-checked={false}
          >
            <Button.Icon>
              <Wellbeing />
            </Button.Icon>
            <Button.Label>웰빙</Button.Label>
          </Button>
        </li>
      </ul>
    </div>
  );
};
