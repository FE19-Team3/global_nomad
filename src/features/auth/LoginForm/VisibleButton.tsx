import Button from '@/shared/ui/Button/Button';

import InVisible from '@/shared/assets/images/visibility_off.svg';
import Visible from '@/shared/assets/images/visibility_on.svg';

interface VisibleButtonProps {
  isVisible: boolean;
  onClick: () => void;
}
const VisibleButton = ({ isVisible, onClick }: VisibleButtonProps) => {
  return (
    <Button
      variant="icon"
      iconOnly
      onClick={onClick}
      className="absolute right-0 top-0 m-1.5 text-gray-400"
    >
      <Button.Icon>{isVisible ? <InVisible /> : <Visible />}</Button.Icon>
    </Button>
  );
};

export default VisibleButton;
