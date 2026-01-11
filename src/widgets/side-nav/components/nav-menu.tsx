import { NavButton } from './nav-button';

type NavMenuItem = {
  value: string;
  href: string;
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  selected: boolean;
};

type NavMenuProps = {
  items: NavMenuItem[];
  className?: string;
};

export const NavMenu = ({ items, className }: NavMenuProps) => {
  return (
    <nav aria-label="마이페이지 메뉴" className={className}>
      {items.map((item) => {
        return (
          <NavButton key={item.href} value={item.value} href={item.href} selected={item.selected}>
            {item.icon}
          </NavButton>
        );
      })}
    </nav>
  );
};
