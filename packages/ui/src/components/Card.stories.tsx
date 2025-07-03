import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Card from './Card';

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'highlighted'],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Card Title',
    description: 'This is a card description',
  },
};

export const Highlighted: Story = {
  args: {
    title: 'Important Card',
    description: 'This card is highlighted for emphasis',
    variant: 'highlighted',
  },
};

export const WithChildren: Story = {
  args: {
    title: 'Card with Content',
    description: 'This card contains additional content',
    children: (
      <div>
        <button style={{ marginRight: '8px' }}>Action 1</button>
        <button>Action 2</button>
      </div>
    ),
  },
};