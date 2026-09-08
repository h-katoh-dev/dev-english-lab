import { NextResponse } from "next/server";
import { getFeedbackProvider } from "@/lib/feedback/provider-factory";
import type { Feedback } from "@/lib/feedback/provider";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { answer?: unknown; scenario?: unknown };
    const answer = typeof body.answer === "string" ? body.answer.trim() : "";
    const scenario = typeof body.scenario === "string" ? body.scenario : "";

    if (!answer) {
      return NextResponse.json({ error: "Answer is required." }, { status: 400 });
    }
    if (!scenario) {
      return NextResponse.json({ error: "Scenario is required." }, { status: 400 });
    }

    const feedback: Feedback = await getFeedbackProvider().evaluate({ scenario, answer });
    return NextResponse.json(feedback);
  } catch {
    return NextResponse.json({ error: "Feedback could not be generated." }, { status: 500 });
  }
}
