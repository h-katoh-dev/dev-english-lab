"use client";

import { FormEvent, useState } from "react";
import { scenario } from "@/lib/scenario";
import type { Feedback } from "@/lib/feedback/provider";

export default function Home() {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!answer.trim()) {
      setError("英語の回答を入力してください。");
      setFeedback(null);
      return;
    }

    setSubmitting(true);
    setError("");
    setFeedback(null);
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenario: scenario.context, answer }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Feedback could not be generated.");
      setFeedback(data);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "フィードバックの取得に失敗しました。");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="page">
      <section className="container">
        <header>
          <p className="eyebrow">DEV ENGLISH LAB</p>
          <h1>実務で使う英語を、コードレビューから。</h1>
          <p className="lead">ITエンジニア向けの実践英語トレーニング。まずは1問、レビューコメントを書いてみましょう。</p>
        </header>

        <article className="card">
          <span className="tag">Code Review</span>
          <h2>{scenario.title}</h2>
          <p>{scenario.context}</p>
          <div className="prompt">{scenario.prompt}</div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="answer">Your answer</label>
            <textarea
              id="answer"
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              placeholder="例: Could you add error handling here?"
              rows={6}
              disabled={submitting}
            />
            {error && <p className="error" role="alert">{error}</p>}
            <button type="submit" disabled={submitting}>
              {submitting ? "Checking..." : "Submit answer"}
            </button>
          </form>
        </article>

        {feedback && (
          <section className="feedback" aria-live="polite">
            <div className="feedbackHeader">
              <span className="tag">Feedback</span>
              <h2>レビュー結果</h2>
            </div>
            <div className="overall">{feedback.overall}</div>
            <div className="grid">
              <FeedbackItem title="Intent" text={feedback.intent} />
              <FeedbackItem title="Clarity" text={feedback.clarity} />
              <FeedbackItem title="Tone" text={feedback.tone} />
              <FeedbackItem title="Technical accuracy" text={feedback.technicalAccuracy} />
            </div>
            <div className="suggestion">
              <h3>Suggested English</h3>
              <p className="english">{feedback.suggestion.english}</p>
              <p>{feedback.suggestion.reason}</p>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}

function FeedbackItem({ title, text }: { title: string; text: string }) {
  return <div className="feedbackItem"><h3>{title}</h3><p>{text}</p></div>;
}
