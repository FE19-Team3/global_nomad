import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import IC_Close from '@/shared/assets/images/modal/modal-close.svg';
import Button from '@/shared/ui/Button/Button';
import { Text } from '@/shared/ui/Text';

const meta = {
  title: 'shared/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'tertiary', 'text', 'badge', 'selectable', 'icon'],
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'full'],
    },
    radius: {
      control: 'inline-radio',
      options: ['sm', 'md', 'full'],
    },
    iconSize: {
      control: 'inline-radio',
      options: ['sm', 'md'],
    },
    disabled: { control: 'boolean' },
    selected: { control: 'boolean' },
    iconOnly: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
  args: {
    variant: 'primary',
    size: 'md',
    radius: 'md',
    iconSize: 'md',
    disabled: false,
    selected: false,
    iconOnly: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Primary
export const Primary: Story = {
  render: () => (
    <Button variant="primary" size="md">
      <Button.Label>Primary</Button.Label>
    </Button>
  ),
};

// 2. Secondary
export const Secondary: Story = {
  render: () => (
    <Button variant="secondary" size="md">
      <Button.Label>Secondary</Button.Label>
    </Button>
  ),
};

// 3. Tertiary
export const Tertiary: Story = {
  render: () => (
    <Button variant="tertiary" size="md">
      <Button.Label>Tertiary</Button.Label>
    </Button>
  ),
};

// Link Button (as="link")
export const AsLink: Story = {
  render: () => (
    <Button as="link" href="/" variant="primary" size="md">
      <Button.Label>
        <Text.M16>Link Button</Text.M16>
      </Button.Label>
    </Button>
  ),
};

// 4. Badge
export const Badge: Story = {
  render: () => (
    <Button variant="badge" radius="full" className="px-4 py-2.5" iconSize="md">
      <Button.Icon>
        <IC_Close />
      </Button.Icon>
      <Button.Label>
        <Text.M16>음악 · 예술</Text.M16>
      </Button.Label>
    </Button>
  ),
};

// 5. Badge Selected
export const BadgeSelected: Story = {
  render: () => (
    <Button variant="badge" radius="full" selected className="px-4 py-2.5" iconSize="md">
      <Button.Icon>
        <IC_Close />
      </Button.Icon>
      <Button.Label>
        <Text.B16>음악 · 예술</Text.B16>
      </Button.Label>
    </Button>
  ),
};

// 6. Selectable
export const Selectable: Story = {
  render: () => (
    <Button variant="selectable" size="md" radius="sm">
      <Button.Label>
        <Text.M16>14:00~15:00</Text.M16>
      </Button.Label>
    </Button>
  ),
};

// 7. Selectable Selected
export const SelectableSelected: Story = {
  render: () => (
    <Button variant="selectable" size="md" selected radius="sm">
      <Button.Label>
        <Text.B16>14:00~15:00</Text.B16>
      </Button.Label>
    </Button>
  ),
};

// 8. Icon Only
export const IconOnly: Story = {
  render: () => (
    <Button variant="icon" iconOnly>
      <Button.Icon>
        <IC_Close />
      </Button.Icon>
    </Button>
  ),
};

// 9. Text Button
export const TextButton: Story = {
  render: () => (
    <Button variant="text">
      <Button.Label>로그인</Button.Label>
    </Button>
  ),
};

// 10. With Icon
export const WithIcon: Story = {
  render: () => (
    <Button variant="tertiary" size="md" iconSize="md">
      <Button.Icon>
        <IC_Close />
      </Button.Icon>
      <Button.Label>tertiary</Button.Label>
    </Button>
  ),
};

// 10. With Icon
export const SelectableWithIcon: Story = {
  render: () => (
    <Button variant="tertiary" size="md" iconSize="md" selected>
      <Button.Icon>
        <IC_Close />
      </Button.Icon>
      <Button.Label>tertiary</Button.Label>
    </Button>
  ),
};

// 11. Disabled
export const Disabled: Story = {
  render: () => (
    <Button variant="secondary" disabled size="md">
      <Button.Label>Disabled Secondary</Button.Label>
    </Button>
  ),
};

// 12. All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <Button variant="primary" size="sm">
        <Button.Label>Small</Button.Label>
      </Button>
      <Button variant="primary" size="md">
        <Button.Label>Medium</Button.Label>
      </Button>
      <div className="w-[300px]">
        <Button variant="primary" size="full">
          <Button.Label>Full Width</Button.Label>
        </Button>
      </div>
    </div>
  ),
};

// 13. All Radius
export const AllRadius: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button variant="primary" size="md" radius="sm">
        <Button.Label>Radius Small</Button.Label>
      </Button>
      <Button variant="primary" size="md" radius="md">
        <Button.Label>Radius Medium</Button.Label>
      </Button>
      <Button variant="primary" size="md" radius="full">
        <Button.Label>Radius Full</Button.Label>
      </Button>
    </div>
  ),
};
