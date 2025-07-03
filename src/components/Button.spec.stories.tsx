import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect } from '@storybook/test';
import Button from './Button';

const meta = {
  title: 'Components/Button/Tests',
  component: Button,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

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