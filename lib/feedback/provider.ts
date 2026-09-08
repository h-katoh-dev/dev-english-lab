export type Feedback = {
  overall: string;
  intent: string;
  clarity: string;
  tone: string;
  technicalAccuracy: string;
  suggestion: {
    english: string;
    reason: string;
  };
};

export interface FeedbackProvider {
  evaluate(input: { scenario: string; answer: string }): Promise<Feedback>;
}
