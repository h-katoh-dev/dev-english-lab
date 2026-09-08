export const scenario = {
  id: "code-review-001",
  title: "コードレビューで修正を依頼する",
  context:
    "あなたはPRをレビューしています。実装自体は良いですが、エラーハンドリングを追加してほしい箇所があります。開発者に丁寧に修正を依頼してください。",
  prompt: "Write a short review comment asking the author to add error handling.",
} as const;
