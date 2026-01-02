import * as React from 'react';

import { cn } from '@/shared/lib/cn';

export const TEXT_VARIANTS = {
  '11_M': 'text-[11px] leading-[1.3] font-[500]',
  '11_B': 'text-[11px] leading-[1.3] font-[700]',
  '12_M': 'text-[12px] leading-[1.3] font-[500]',
  '12_B': 'text-[12px] leading-[1.3] font-[700]',
  '13_M': 'text-[13px] leading-[1.3] font-[500]',
  '13_B': 'text-[13px] leading-[1.3] font-[700]',
  '14_M': 'text-[14px] leading-[1.3] font-[500]',
  '14_B': 'text-[14px] leading-[1.3] font-[700]',
  '16_M': 'text-[16px] leading-[1.3] font-[500]',
  '16_B': 'text-[16px] leading-[1.3] font-[700]',
  '18_M': 'text-[18px] leading-[1.3] font-[500]',
  '18_B': 'text-[18px] leading-[1.3] font-[700]',
  '20_M': 'text-[20px] leading-[1.3] font-[500]',
  '20_B': 'text-[20px] leading-[1.3] font-[700]',
  '24_M': 'text-[24px] leading-[1.3] font-[500]',
  '24_B': 'text-[24px] leading-[1.3] font-[700]',
  '32_M': 'text-[32px] leading-[1.3] font-[500]',
  '32_B': 'text-[32px] leading-[1.3] font-[700]',
  '14_body_M': 'text-[14px] leading-[1.8] font-[500]',
  '16_body_M': 'text-[16px] leading-[1.8] font-[500]',
  '18_body_B': 'text-[18px] leading-[1.4] font-[700]',
  '20_body_B': 'text-[20px] leading-[1.6] font-[700]',
} as const;

type Size = 11 | 12 | 13 | 14 | 16 | 18 | 20 | 24 | 32;
type BodySize = 14 | 16 | 18 | 20;
type Weight = 'M' | 'B';
type Line = 'tight' | 'body';

export type TextVariant = keyof typeof TEXT_VARIANTS;

export type TextProps = React.HTMLAttributes<HTMLElement> & {
  as?: React.ElementType;
  size?: Size;
  weight?: Weight;
  line?: Line;
};

const resolveVariant = (size: Size, weight: Weight, line: Line): TextVariant => {
  if (line === 'body') {
    const key = `${size}_body_${weight}` as TextVariant;
    if (key in TEXT_VARIANTS) return key;
  }
  return `${size}_${weight}` as TextVariant;
};

const TextRoot = ({
  as: Component = 'span',
  size = 16,
  weight = 'M',
  line = 'tight',
  className,
  ...props
}: TextProps) => {
  const variant = resolveVariant(size, weight, line);
  return <Component {...props} className={cn(TEXT_VARIANTS[variant], className)} />;
};

const TextBody = ({ as, size = 16, weight = 'M', ...props }: TextProps) => (
  <TextRoot {...props} as={as ?? 'p'} size={size} weight={weight} line="body" />
);
TextBody.displayName = 'TextBody';

type TextBaseComponent = (props: TextProps) => React.ReactElement;

type TextComponent = TextBaseComponent & {
  displayName?: string;

  M11: TextBaseComponent;
  B11: TextBaseComponent;
  M12: TextBaseComponent;
  B12: TextBaseComponent;
  M13: TextBaseComponent;
  B13: TextBaseComponent;
  M14: TextBaseComponent;
  B14: TextBaseComponent;
  M16: TextBaseComponent;
  B16: TextBaseComponent;
  M18: TextBaseComponent;
  B18: TextBaseComponent;
  M20: TextBaseComponent;
  B20: TextBaseComponent;
  M24: TextBaseComponent;
  B24: TextBaseComponent;
  M32: TextBaseComponent;
  B32: TextBaseComponent;

  Body: typeof TextBody;
  Body14: TextBaseComponent;
  Body16: TextBaseComponent;
  Body18B: TextBaseComponent;
  Body20B: TextBaseComponent;
};

const shorthand = (size: Size, weight: Weight): TextBaseComponent => {
  const Comp = (p: TextProps) => <TextRoot {...p} size={size} weight={weight} />;
  Comp.displayName = `Text${weight}${size}`;
  return Comp;
};

const bodyShorthand = (size: BodySize, weight: Weight): React.FC<TextProps> => {
  const Comp: React.FC<TextProps> = (p: TextProps) => (
    <TextRoot {...p} as={p.as ?? 'p'} size={size} weight={weight} line="body" />
  );
  Comp.displayName = `TextBody${weight}${size}`;
  return Comp;
};

export const Text = Object.assign(TextRoot, {
  M11: shorthand(11, 'M'),
  B11: shorthand(11, 'B'),
  M12: shorthand(12, 'M'),
  B12: shorthand(12, 'B'),
  M13: shorthand(13, 'M'),
  B13: shorthand(13, 'B'),
  M14: shorthand(14, 'M'),
  B14: shorthand(14, 'B'),
  M16: shorthand(16, 'M'),
  B16: shorthand(16, 'B'),
  M18: shorthand(18, 'M'),
  B18: shorthand(18, 'B'),
  M20: shorthand(20, 'M'),
  B20: shorthand(20, 'B'),
  M24: shorthand(24, 'M'),
  B24: shorthand(24, 'B'),
  M32: shorthand(32, 'M'),
  B32: shorthand(32, 'B'),
  Body: TextBody,
  Body14: bodyShorthand(14, 'M'),
  Body16: bodyShorthand(16, 'M'),
  Body18B: bodyShorthand(18, 'B'),
  Body20B: bodyShorthand(20, 'B'),
}) as TextComponent;

Text.displayName = 'Text';

export default Text;
