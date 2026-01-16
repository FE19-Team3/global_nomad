import { ActivitySortValues, ActivitySort } from '@/shared/constants/activity';
import Dropdown from '@/shared/ui/Dropdown';

interface Props {
  selected?: ActivitySort['values'];
  setSelected: (value: ActivitySort['values']) => void;
}

const SortDropdown = ({ selected, setSelected }: Props) => {
  const handleSelect = (value: string) => {
    setSelected(value as ActivitySort['values']);
  };

  const selectedLabel = ActivitySortValues.find((s) => s.values === selected)?.label ?? '';

  return (
    <Dropdown value={selected} onChange={handleSelect}>
      <Dropdown.Trigger>{selectedLabel}</Dropdown.Trigger>
      <Dropdown.Menu>
        {ActivitySortValues.map((sort) => (
          <Dropdown.Item key={sort.values} value={sort.values}>
            {sort.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SortDropdown;
