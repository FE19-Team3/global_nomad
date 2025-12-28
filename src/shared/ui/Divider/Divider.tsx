import { CSSProperties, HTMLAttributes } from 'react';

import { cn } from '../../lib/cn';

import { styles } from './Divider.styles';

interface DividerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
  className?: string;
  color?: 'gray100' | 'gray300';
  width?: number;
  orientation?: 'vertical' | 'horizontal';
}

const Divider = ({
  className,
  color = 'gray100',
  width = 1,
  orientation = 'horizontal',
  ...props
}: DividerProps) => {
  const thickness = Math.max(1, Number.isFinite(width) ? Number(width) : 1);
  const dynamicStyle: CSSProperties =
    orientation === 'horizontal' ? { height: `${thickness}px` } : { width: `${thickness}px` };

  const classes = styles({ orientation, color });
  const mergedStyle: CSSProperties = {
    ...dynamicStyle,
  };
  return (
    <div
      className={cn(classes, className)}
      style={mergedStyle}
      role="separator"
      aria-orientation={orientation}
      {...props}
    />
  );
};

export default Divider;
