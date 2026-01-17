import IC_Kebab from '@/shared/assets/icons/ic_kebab.svg';
import Popover from '@/shared/ui/Popover';
import Text from '@/shared/ui/Text';
// TODO: 키보드 화살표 입력 접근성 추가

const KebabMenuPopover = () => {
  const menuStyle = 'px-5 py-4.5 cursor-pointer bg-white hover:bg-gray-50 transition-colors';
  return (
    <Popover>
      <Popover.Trigger popoverKey="kebab">
        <IC_Kebab className="w-7 h-7 hover:bg-gray-50 transition-colors rounded-full" />
      </Popover.Trigger>
      <Popover.Content popoverKey="kebab" placement="left-start" className="border border-gray-50">
        <div>
          <ul>
            <li>
              <button className={menuStyle}>
                <Text.M16>수정하기</Text.M16>
              </button>
            </li>
            <li>
              <button className={menuStyle}>
                <Text.M16>삭제하기</Text.M16>
              </button>
            </li>
          </ul>
        </div>
      </Popover.Content>
    </Popover>
  );
};

export default KebabMenuPopover;
