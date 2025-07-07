import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect, fn } from 'storybook/test';
import Toggle from './Toggle';

const meta = {
  title: 'Utils/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Enable notifications',
  },
};

export const Checked: Story = {
  args: {
    label: 'Dark mode',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Premium feature',
    disabled: true,
  },
};

export const Interactive: Story = {
  args: {
    label: 'Toggle me',
    checked: false,
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    
    // Find the toggle by its label
    const toggle = canvas.getByText('Toggle me').parentElement;
    await expect(toggle).toBeInTheDocument();
    
    // Click the toggle
    await userEvent.click(toggle!);
    
    // Verify the onChange was called
    await expect(args.onChange).toHaveBeenCalledWith(true);
  },
};