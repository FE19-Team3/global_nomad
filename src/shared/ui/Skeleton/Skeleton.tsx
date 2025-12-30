import { ReactNode } from 'react';

interface SkeletonBaseProps {
  children: ReactNode;
  className?: string;
}

interface CircleProps {
  size?: number | string;
  className?: string;
}

interface RowProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const SkeletonBase = ({ children, className }: SkeletonBaseProps) => {
  return <div className={`border border-black p-5 ${className}`}>{children}</div>;
};

const Circle = ({ size, className }: CircleProps) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`bg-gray-200 rounded-full animate-pulse ${className}`}
    ></div>
  );
};

const Row = ({ width, height, className }: RowProps) => {
  return (
    <div
      style={{ width, height }}
      className={`bg-gray-200 rounded animate-pulse ${className}`}
    ></div>
  );
};

const Rect = ({ width, height, className }: RowProps) => {
  return (
    <div
      style={{ width, height }}
      className={`bg-gray-200 rounded-md animate-pulse ${className}`}
    ></div>
  );
};

export const Skeleton = Object.assign(SkeletonBase, {
  Circle,
  Row,
  Rect,
});
