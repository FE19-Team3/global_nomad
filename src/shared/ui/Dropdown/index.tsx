import Dropdown from './Dropdown';
import DropdownItem from './DropdownItem';
import DropdownMenu from './DropdownMenu';
import DropdownTrigger from './DropdownTrigger';

// Compound Component 패턴으로 연결
// Object.assign: 객체에 속성을 추가하는 JavaScript 메서드
// Dropdown은 원래 함수 컴포넌트인데 여기에 속성을 추가하는것
export default Object.assign(Dropdown, {
  Trigger: DropdownTrigger,
  Menu: DropdownMenu,
  Item: DropdownItem,
});

// 개별 export도 가능하게
export { DropdownTrigger, DropdownMenu, DropdownItem };
