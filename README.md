# Dev English Lab

日本語話者のITエンジニア向け、実務英語トレーニングアプリです。GitHub Issue / PR / コードレビュー / 障害報告など、開発現場で実際に使う英語に集中します。

## Current vertical slice

現在は最小の縦切り実装として、次を提供します。

1. 固定のコードレビューシナリオを表示
2. 英語回答を入力・送信
3. サーバーAPIで構造化フィードバックを返却
4. UIに Intent / Clarity / Tone / Technical accuracy / Suggested English を表示
5. APIキー不要のMock Providerで動作

認証、回答履歴、進捗保存、DB、外部GitHub連携、音声、課金はこの段階では実装しません。将来フェーズで追加します。

## Architecture

`UI -> /api/feedback -> FeedbackProvider -> MockFeedbackProvider`

Providerの選択と評価処理はサーバー側に閉じ込めています。将来Gemini等の実APIを追加してもUI/API契約を変更しない構成です。実APIキーはサーバー環境変数だけで管理し、クライアントへ公開しません。

## Development

```bash
npm install
npm run dev
```

ブラウザで `http://localhost:3000` を開きます。

```bash
npm run lint
npm run build
```

実APIは無料枠・利用規約・レート制限を確認した上で別フェーズで導入します。現在のMVPはMockのみなのでAPIキー不要です。

## Roadmap

詳細は `ROADMAP.md` と `docs/mvp.md` を参照してください。
