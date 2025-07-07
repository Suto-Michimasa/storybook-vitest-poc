import type { Meta, StoryObj } from '@storybook/react'
import { within, userEvent, expect, fn, waitFor } from 'storybook/test'
import { http, HttpResponse } from 'msw'
import { UserList } from './UserList'
import type { User } from '../mocks/handlers'

const meta = {
  title: 'UI/UserList',
  component: UserList,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof UserList>

export default meta
type Story = StoryObj<typeof meta>

// 基本的なストーリー
export const Default: Story = {
  args: {},
}

// クリックイベントのテスト
export const WithClickHandler: Story = {
  args: {
    onUserClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    // ローディング状態を確認
    await expect(canvas.getByTestId('loading')).toBeInTheDocument()

    // データが読み込まれるまで待機
    await waitFor(async () => {
      await expect(canvas.queryByTestId('loading')).not.toBeInTheDocument()
    })

    // ユーザーリストが表示されることを確認
    const user1 = await canvas.findByTestId('user-1')
    await expect(user1).toBeInTheDocument()
    await expect(user1).toHaveTextContent('John Doe')
    await expect(user1).toHaveTextContent('john@example.com')

    // ユーザーをクリック
    await userEvent.click(user1)

    // クリックハンドラーが呼ばれたことを確認
    await expect(args.onUserClick).toHaveBeenCalledWith({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
    })
  },
}

// エラー状態のテスト
export const ErrorState: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/users', () => {
          return new HttpResponse(null, { status: 500 })
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // エラーメッセージが表示されることを確認
    await waitFor(async () => {
      const errorElement = canvas.getByTestId('error')
      await expect(errorElement).toBeInTheDocument()
      await expect(errorElement).toHaveTextContent('Error: 500')
    })
  },
}

// カスタムデータのテスト
export const CustomUsers: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/users', () => {
          return HttpResponse.json<User[]>([
            {
              id: 100,
              name: 'Custom User',
              email: 'custom@example.com',
              role: 'Custom Role',
            },
          ])
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // カスタムユーザーが表示されることを確認
    await waitFor(async () => {
      const customUser = canvas.getByTestId('user-100')
      await expect(customUser).toBeInTheDocument()
      await expect(customUser).toHaveTextContent('Custom User')
      await expect(customUser).toHaveTextContent('custom@example.com')
      await expect(customUser).toHaveTextContent('Role: Custom Role')
    })
  },
}

// 空のリストのテスト
export const EmptyList: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/users', () => {
          return HttpResponse.json<User[]>([])
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // リストが空であることを確認
    await waitFor(async () => {
      await expect(canvas.queryByTestId('loading')).not.toBeInTheDocument()
      await expect(canvas.queryByTestId('error')).not.toBeInTheDocument()
      
      // ユーザーアイテムが存在しないことを確認
      await expect(canvas.queryByTestId('user-1')).not.toBeInTheDocument()
    })
  },
}