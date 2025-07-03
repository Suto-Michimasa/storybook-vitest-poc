import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import { within, userEvent, expect } from 'storybook/test';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    disabled: true,
  },
};

export const WithClick: Story = {
  args: {
    label: 'Click Me!',
    onClick: () => alert('Button clicked!'),
  },
};


export const ClickTest: Story = {
  args: {
    label: 'Click to test',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /click to test/i });
    
    await expect(button).toBeInTheDocument();
    await userEvent.click(button);
  },
};

export const DisabledTest: Story = {
  args: {
    label: 'Disabled button',
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /disabled button/i });
    
    await expect(button).toBeDisabled();
    await expect(button).toHaveStyle({ cursor: 'not-allowed' });
  },
};

export const VariantTest: Story = {
  args: {
    label: 'Secondary variant',
    variant: 'secondary',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /secondary variant/i });
    
    await expect(button).toHaveStyle({ backgroundColor: 'rgb(102, 102, 102)' });
  },
};