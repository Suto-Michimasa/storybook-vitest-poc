import type { Meta, StoryObj } from '@storybook/react'
import { within, expect } from 'storybook/test'
import { Example } from './Example'

const meta = {
  title: 'UI/Example (stories.tsx)',
  component: Example,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
  },
} satisfies Meta<typeof Example>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'This is stories.tsx file',
    description: 'This story should be recognized by Vitest but it is not.',
  },
}

export const WithoutDescription: Story = {
  args: {
    title: 'Title Only',
  },
}

export const WithInteraction: Story = {
  args: {
    title: 'Interactive Example',
    description: 'This has a play function',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Check that the title is rendered
    await expect(canvas.getByText('Interactive Example')).toBeInTheDocument()
    
    // Check that the description is rendered
    await expect(canvas.getByText('This has a play function')).toBeInTheDocument()
  },
}