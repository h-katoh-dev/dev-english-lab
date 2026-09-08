import { MockFeedbackProvider } from "./mock-provider";
import type { FeedbackProvider } from "./provider";

export function getFeedbackProvider(): FeedbackProvider {
  // Keep provider selection on the server. A real provider can be added later
  // without changing the API route or UI.
  return new MockFeedbackProvider();
}
