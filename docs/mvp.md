# MVP Specification

## Goal

短時間で、ITエンジニアが実務で使う英語を書き、すぐフィードバックを受けられる最小体験を成立させる。

## Initial vertical slice

- 固定シナリオを1問表示する。
- ユーザーが英語回答を入力する。
- `/api/feedback` が構造化フィードバックを返す。
- UIで結果を表示する。
- Providerはサーバー側の抽象にし、現在はMockを使用する。
- APIキーはクライアントに渡さない。

## Feedback contract

```text
overall: string
intent: string
clarity: string
tone: string
technicalAccuracy: string
suggestion:
  english: string
  reason: string
```

## Non-goals for this slice

認証、匿名ID、Cookieによる識別、回答履歴、進捗保存、DB、Prisma、SQLite、外部GitHub連携、音声、発音、課金、チーム管理、複雑なモデルルーティングは実装しない。

## Error handling

- 空回答は400相当として入力エラーを表示する。
- API / Provider例外は500相当としてエラーを表示する。
- 送信中は二重送信を防止する。

## Security

実API導入時もキーはサーバー環境変数のみで保持する。`NEXT_PUBLIC_` 等の公開用環境変数には秘密情報を置かない。

## Future

初期スライスの動作確認後、シナリオ拡張、実Provider導入、学習履歴・進捗へ段階的に進む。
