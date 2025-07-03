# Storybook + Vitest PoC

React + TanStack Router + Storybook + Vitest の統合環境のPoC実装です。

## 技術スタック

- **React 19** + TypeScript
- **TanStack Router** - ファイルベースルーティング
- **Storybook 9** - コンポーネント開発環境
- **Vitest** - 単体テスト
- **Testing Library** - コンポーネントテスト
- **Vite** - ビルドツール
- **pnpm** - パッケージマネージャー

## セットアップ

```bash
# 依存関係のインストール
pnpm install

# 開発サーバー起動
pnpm dev

# Storybook起動
pnpm storybook

# テスト実行
pnpm test

# テストUI起動
pnpm test:ui
```

## プロジェクト構成

```
src/
├── components/        # 共通コンポーネント
│   ├── Button.tsx
│   ├── Button.test.tsx    # Vitestテスト
│   ├── Button.stories.tsx # Storybookストーリー
│   └── Button.spec.stories.tsx # インタラクションテスト
├── routes/           # TanStack Routerのページ
│   ├── __root.tsx
│   ├── index.tsx
│   ├── about.tsx
│   └── demo.tsx
├── test/            # テスト設定
│   └── setup.ts
└── main.tsx         # エントリーポイント
```

## 実装内容

### コンポーネントテスト戦略

1. **Vitest** - 高速な単体テスト実行
   - `*.test.tsx` ファイルで実装
   - Testing Library使用
   - happy-domで高速実行

2. **Storybook** - ビジュアルテスト・インタラクションテスト
   - `*.stories.tsx` - コンポーネントカタログ
   - `*.spec.stories.tsx` - playファンクションによるインタラクションテスト

### 利点

- コンポーネント開発時はStorybookでビジュアル確認
- CI/CDではVitestで高速テスト実行
- 同じテストコードをStorybookとVitestで共有可能

## 今後の拡張案

- [ ] Storybook Test Runnerの追加
- [ ] Visual Regression Testingの導入
- [ ] MSWによるAPIモック
- [ ] GitHub Actionsでの自動テスト