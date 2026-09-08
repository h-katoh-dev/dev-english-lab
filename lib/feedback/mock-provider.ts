import type { Feedback, FeedbackProvider } from "./provider";

export class MockFeedbackProvider implements FeedbackProvider {
  async evaluate({ answer }: { scenario: string; answer: string }): Promise<Feedback> {
    const trimmed = answer.trim();
    const mentionsErrorHandling = /error handling|error|exception|handle/i.test(trimmed);
    const mentionsRequest = /please|could you|would you|can you|add|handle|consider/i.test(trimmed);

    return {
      overall: trimmed.length >= 10
        ? "レビューで修正してほしい内容は概ね伝わっています。"
        : "意図は推測できますが、もう少し具体的に書くと伝わりやすくなります。",
      intent: mentionsErrorHandling && mentionsRequest
        ? "修正依頼の意図が明確に伝わります。"
        : "エラーハンドリングを追加してほしい、という意図をもう少し明示するとよいです。",
      clarity: trimmed.length >= 10
        ? "対象と依頼内容が比較的わかりやすいです。"
        : "短すぎるため、何を変更してほしいのか具体化しましょう。",
      tone: /please|could you|would you/i.test(trimmed)
        ? "丁寧な依頼表現になっています。"
        : "コードレビューでは、please / could you などを使うと柔らかく伝えられます。",
      technicalAccuracy: mentionsErrorHandling
        ? "コードレビューの文脈に合った技術的な依頼です。"
        : "今回のシナリオでは error handling に触れると技術的な意図がより正確になります。",
      suggestion: {
        english: "Could you add error handling here? This will help us handle unexpected failures gracefully.",
        reason: "修正対象を明示しつつ、レビューコメントとして自然で丁寧な依頼にしています。",
      },
    };
  }
}
