import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect, fn } from '@storybook/test';
import Form from './Form';

const meta = {
  title: 'Components/Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: fn(),
  },
};

export const WithInitialValues: Story = {
  args: {
    onSubmit: fn(),
    initialValues: {
      name: 'John Doe',
      email: 'john@example.com',
    },
  },
};

export const ValidationTest: Story = {
  args: {
    onSubmit: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 空のフォームを送信してバリデーションエラーを確認
    const submitButton = canvas.getByRole('button', { name: /submit/i });
    await userEvent.click(submitButton);
    
    // エラーメッセージが表示されることを確認
    await expect(canvas.getByText('Name is required')).toBeInTheDocument();
    await expect(canvas.getByText('Email is required')).toBeInTheDocument();
  },
};

export const SuccessfulSubmission: Story = {
  args: {
    onSubmit: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    
    // フォームに入力
    const nameInput = canvas.getByLabelText('Name');
    const emailInput = canvas.getByLabelText('Email');
    
    await userEvent.type(nameInput, 'Jane Smith');
    await userEvent.type(emailInput, 'jane@example.com');
    
    // フォームを送信
    const submitButton = canvas.getByRole('button', { name: /submit/i });
    await userEvent.click(submitButton);
    
    // onSubmitが正しいデータで呼ばれたことを確認
    await expect(args.onSubmit).toHaveBeenCalledWith({
      name: 'Jane Smith',
      email: 'jane@example.com',
    });
  },
};

export const EmailValidation: Story = {
  args: {
    onSubmit: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // まず空のフォームを送信してエラーを表示
    const submitButton = canvas.getByRole('button', { name: /submit/i });
    await userEvent.click(submitButton);
    
    // 必須項目のエラーが表示されることを確認
    await expect(canvas.getByText('Name is required')).toBeInTheDocument();
    await expect(canvas.getByText('Email is required')).toBeInTheDocument();
    
    // 名前を入力
    const nameInput = canvas.getByLabelText('Name');
    await userEvent.type(nameInput, 'Test User');
    
    // 無効なメールアドレスを入力
    const emailInput = canvas.getByLabelText('Email');
    await userEvent.type(emailInput, 'invalid-email');
    
    // フォームを送信
    await userEvent.click(submitButton);
    
    // メールのバリデーションエラーが表示されることを確認
    await expect(canvas.getByText('Email is invalid')).toBeInTheDocument();
    
    // 有効なメールアドレスに修正
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'valid@example.com');
    
    // 再度送信
    await userEvent.click(submitButton);
    
    // エラーメッセージが消えることを確認
    await expect(canvas.queryByText('Email is invalid')).not.toBeInTheDocument();
  },
};