import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect } from 'storybook/test';
import DatePicker from './DatePicker';

const meta = {
  title: 'Utils/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Select Date',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Birth Date',
    value: '2024-01-15',
  },
};

export const WithMinMax: Story = {
  args: {
    label: 'Appointment Date',
    min: '2024-01-01',
    max: '2024-12-31',
  },
};

export const Interactive: Story = {
  args: {
    label: 'Event Date',
    onChange: (date) => console.log('Date changed:', date),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    const input = canvas.getByLabelText('Event Date');
    await expect(input).toBeInTheDocument();
    
    // Type a date
    await userEvent.type(input, '2024-06-15');
    await expect(input).toHaveValue('2024-06-15');
  },
};