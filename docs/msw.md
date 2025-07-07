# MSW (Mock Service Worker) 実装計画と結果

## 目的
psi-web-console-v2プロジェクトで発生している「No test suite found」エラーがMSWの設定に起因する可能性を検証するため、storybook-vitest-pocプロジェクトにMSWを実装し、動作確認を行う。

## 実装計画

### 1. MSWのセットアップ

#### 1.1 必要なパッケージのインストール
```bash
pnpm add -D msw@latest
```

#### 1.2 MSWの初期化
```bash
pnpm msw init ./public --save
```

### 2. MSWの設定ファイル作成

#### 2.1 モックハンドラーの作成
- `src/mocks/handlers.ts` - APIモックハンドラー
- `src/mocks/server.ts` - Node.js環境用（テスト用）
- `src/mocks/browser.ts` - ブラウザ環境用（Storybook用）

#### 2.2 Storybookとの統合
- `.storybook/preview.ts` にMSWの初期化コードを追加
- MSW addon for Storybookの設定

### 3. テストケースの実装

#### 3.1 APIを使用するコンポーネントの作成
- `packages/ui/src/components/UserList.tsx` - ユーザー一覧を表示するコンポーネント
- APIからデータを取得する機能を実装

#### 3.2 MSWを使用したストーリーの作成
- `packages/ui/src/components/UserList.stories.tsx`
- MSWでAPIレスポンスをモック
- インタラクションテストでAPIコールを検証

### 4. Vitestでのテスト実行

#### 4.1 セットアップファイルの更新
- `vitest.setup.ts` にMSWサーバーの起動/停止処理を追加
- `.storybook/vitest.setup.ts` でのMSW設定

#### 4.2 テストの実行と検証
- `pnpm test-storybook` でテストを実行
- エラーの有無を確認

## 実装手順

### Phase 1: 基本的なMSWセットアップ
1. MSWパッケージのインストール
2. publicディレクトリにservice workerを配置
3. 基本的なハンドラーとサーバー設定

### Phase 2: Storybookとの統合
1. Storybook preview.tsでMSWを初期化
2. MSW addon for Storybookの設定（必要に応じて）
3. 簡単なモックハンドラーでテスト

### Phase 3: 実際のコンポーネントでテスト
1. APIを呼び出すコンポーネントを作成
2. MSWでAPIをモック
3. ストーリーでインタラクションテストを実装

### Phase 4: Vitestでの動作確認
1. vitest.setup.tsでMSWサーバーの設定
2. test-storybookコマンドでテスト実行
3. エラーの確認と対処

## 検証ポイント

### 1. MSWの初期化タイミング
- Storybookのpreviewでの初期化が正しく行われているか
- Vitestテスト実行時のMSWサーバー起動タイミング

### 2. モックハンドラーの登録
- ハンドラーが正しく登録されているか
- リクエストがMSWでインターセプトされているか

### 3. エラーの再現性
- MSWを導入することで「No test suite found」エラーが発生するか
- エラーが発生した場合の原因特定

### 4. 設定の差異
- psi-web-console-v2との設定の違い
- monorepo構成での影響

## 期待される結果

1. MSWが正常に動作し、APIモックが機能する
2. Storybookのインタラクションテストが正常に実行される
3. psi-web-console-v2で発生しているエラーの原因が特定できる

## トラブルシューティング

### よくある問題と対処法

1. **Service Workerが登録されない**
   - publicディレクトリの確認
   - Viteの静的ファイル配信設定

2. **MSWがリクエストをインターセプトしない**
   - ハンドラーのURLパターン確認
   - MSWの初期化順序

3. **Vitestでのテスト失敗**
   - setupFilesでのMSW設定
   - テスト環境（happy-dom vs jsdom）の影響

4. **「No test suite found」エラー**
   - MSWのインポートがテストスイートの認識に影響しているか
   - 非同期初期化の問題

## 参考リンク

- [MSW公式ドキュメント](https://mswjs.io/)
- [Storybook MSW Addon](https://storybook.js.org/addons/msw-storybook-addon)
- [Vitest + MSW設定ガイド](https://mswjs.io/docs/integrations/vitest)