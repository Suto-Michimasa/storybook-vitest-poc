import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Badge from './Badge';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Primary',
    color: 'primary',
  },
};

export const Success: Story = {
  args: {
    label: 'Success',
    color: 'success',
  },
};

export const Warning: Story = {
  args: {
    label: 'Warning',
    color: 'warning',
  },
};

export const Danger: Story = {
  args: {
    label: 'Danger',
    color: 'danger',
  },
};

export const Sizes: Story = {
  args: {
    label: 'Sizes',
  },
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Badge label="Small" size="small" />
      <Badge label="Medium" size="medium" />
      <Badge label="Large" size="large" />
    </div>
  ),
};