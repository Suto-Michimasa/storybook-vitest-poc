# Storybook + Vitest PoC (Monorepo)

React + TanStack Router + Storybook + Vitest の統合環境のPoC実装です。
pnpm workspaceを使用したmonorepo構成で実装されています。

## 技術スタック

- **React 19** + TypeScript
- **TanStack Router** - ファイルベースルーティング
- **Storybook 9** - コンポーネント開発環境
- **Vitest** - 単体テスト
- **Testing Library** - コンポーネントテスト
- **Vite** - ビルドツール
- **pnpm workspace** - monorepoパッケージマネージャー

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
.
├── packages/
│   ├── ui/                  # UIコンポーネントライブラリ
│   │   └── src/
│   │       └── components/
│   │           ├── Card.tsx
│   │           ├── Card.stories.tsx
│   │           ├── Badge.tsx
│   │           └── Badge.stories.tsx
│   └── utils/               # ユーティリティコンポーネント
│       └── src/
│           └── components/
│               ├── DatePicker.tsx
│               ├── DatePicker.stories.tsx
│               ├── Toggle.tsx
│               └── Toggle.stories.tsx
├── src/                     # メインアプリケーション
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Button.stories.tsx
│   │   ├── Form.tsx
│   │   └── Form.stories.tsx
│   ├── routes/              # TanStack Routerのページ
│   └── test/               # テスト設定
├── .storybook/             # Storybook設定（ルート）
└── pnpm-workspace.yaml     # Workspace設定
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

3. **Storybook Vitest Addon** - StorybookストーリーをVitestで実行
   - `pnpm test:storybook` でPlaywrightを使用してブラウザ内でテスト実行
   - CIでのテスト自動化に最適

### 利点

- コンポーネント開発時はStorybookでビジュアル確認
- CI/CDではVitestで高速テスト実行
- 同じストーリーファイルをStorybookとVitestの両方で活用
- Playwrightによる実際のブラウザ環境でのテスト

## Monorepo構成の特徴

- **統合Storybook**: ルートで`pnpm storybook`を実行すると全パッケージのストーリーが表示
- **独立パッケージ**: 各パッケージは独自の`package.json`とTypeScript設定を保持
- **共有依存関係**: ReactやTypeScriptなどの共通依存関係はルートで管理
- **Vitestテスト統合**: 全パッケージのストーリーをまとめてテスト実行

## 今後の拡張案

- [ ] Storybook Compositionによる分散Storybook構成
- [ ] Visual Regression Testingの導入
- [ ] MSWによるAPIモック
- [ ] パッケージ間の依存関係デモ
- [ ] Changesetによるバージョン管理