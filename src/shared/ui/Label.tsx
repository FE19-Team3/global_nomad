import { forwardRef, LabelHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

import { TEXT_VARIANTS, type TextVariant } from './Text';

type LabelTextSize = Extract<TextVariant, '14_M' | '14_B' | '16_M' | '16_B'>;

interface LabelProps extends Omit<LabelHTMLAttributes<HTMLLabelElement>, 'children'> {
  className?: string;
  textSize?: LabelTextSize;
  textColor?: 'gray_950' | 'white' | 'primary';
  children: ReactNode;
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, textSize = '14_M', textColor = 'gray_950', ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(TEXT_VARIANTS[textSize], `text-${textColor}`, className)}
        {...props}
      >
        {children}
      </label>
    );
  },
);

Label.displayName = 'Label';
export default Label;
