# Storybook + Vitest CLI テスト環境構築計画

## 目的
現在のプロジェクトで発生している`@storybook/addon-vitest`の問題を回避し、クリーンな環境で動作するStorybook + Vitest CLIテスト環境を構築する。

## 前提条件
- Node.js v23以上
- pnpm v10以上
- 最新のStorybook v9以上（addon-vitestが正式にサポートされているバージョン）

## 実装計画

### Phase 1: プロジェクトの初期化（10分）
1. 新規ディレクトリ作成
   ```bash
   mkdir storybook-vitest-poc
   cd storybook-vitest-poc
   ```

2. Reactプロジェクトの初期化
   ```bash
   pnpm create vite@latest . --template react-ts
   pnpm install
   ```

3. 基本的なコンポーネント作成
   - `src/components/Button/Button.tsx`
   - `src/components/Button/Button.stories.tsx`
   - play関数を含むストーリーを作成

### Phase 2: Storybook セットアップ（15分）
1. Storybook初期化
   ```bash
   pnpm dlx storybook@latest init
   ```

2. 必要な依存関係の追加
   ```bash
   pnpm add -D @storybook/addon-vitest @vitest/browser playwright
   ```

3. `.storybook/main.ts`の設定
   - `@storybook/addon-vitest`をaddonsに追加

### Phase 3: Vitest設定（20分）
1. **アプローチA: addon-vitestプラグインを使用**
   - `vitest.config.ts`を作成
   - `@storybook/addon-vitest/vitest-plugin`を設定
   - ブラウザモードの設定

2. **アプローチB: Portable Storiesを使用（フォールバック）**
   - `vitest.config.ts`でブラウザモードのみ設定
   - テストファイル生成スクリプトの作成
   - `composeStories`を使用したテストファイルのテンプレート

### Phase 4: テスト実行と検証
1. package.jsonスクリプトの追加
   ```json
   {
     "scripts": {
       "test-storybook": "vitest"
     }
   }
   ```

2. テスト実行
   ```bash
   pnpm run test-storybook
   ```

3. 動作確認
   - ストーリーが正しく検出されるか
   - play関数が実行されるか
   - アサーションが機能するか

### Phase 5: トラブルシューティング（15分）
1. よくある問題と解決策
   - "No test suite found"エラー
     - includeパターンの確認
     - プラグインの読み込み確認
   - Reactフックエラー
     - setupFilesでの初期化確認
     - 依存関係の重複確認

2. デバッグ方法
   - `--browser.headless=false`で視覚的デバッグ
   - verboseログの有効化

### Phase 6: ドキュメント化（10分）
1. 設定ファイルの最終形
   - `vitest.config.ts`
   - `.storybook/main.ts`
   - `.storybook/vitest.setup.ts`

2. 再現可能な手順書の作成
3. 現在のプロジェクトへの適用方法

## 成功基準
- [ ] `pnpm run test-storybook`でストーリーのテストが実行される
- [ ] play関数が正しく動作する
- [ ] エラーなくテストが完了する
- [ ] CI/CDで実行可能な形式になっている

## 期待される成果物
1. 動作するサンプルプロジェクト
2. 設定ファイル一式
3. 現在のプロジェクトへの移行ガイド
4. トラブルシューティングガイド


## リスクと対策
1. **リスク**: addon-vitestの最新版でも動作しない
   - **対策**: Portable Storiesアプローチを主軸に切り替え

2. **リスク**: 依存関係の競合
   - **対策**: package.jsonのoverridesで解決

3. **リスク**: モノレポ環境での動作
   - **対策**: 単一パッケージで検証後、段階的に適用
