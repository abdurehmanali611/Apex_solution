import { NextRequest, NextResponse } from "next/server";
import { buildSystemPrompt } from "@/lib/systemPrompt";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { message: "AI assistant is not configured yet. Please contact us directly at +251 930 272 975." },
        { status: 200 }
      );
    }

    const systemPrompt = buildSystemPrompt();

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 512,
        temperature: 0.6,
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Groq API error ${response.status}: ${err}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? "I couldn't process that. Please try again.";

    return NextResponse.json({ message: reply });
  } catch {
    return NextResponse.json(
      { message: "Connection issue — please try again or contact us directly at +251 930 272 975." },
      { status: 200 }
    );
  }
}
