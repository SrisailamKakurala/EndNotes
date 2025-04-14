import { NextResponse } from "next/server";
import { openai } from "../openai.config";

export async function POST(req: Request) {
  try {
    const { userPrompt, systemPrompt } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Generate roadmap for: ${userPrompt}` },
      ],
    });

    const aiMessage = completion.choices[0]?.message?.content || "";

    return NextResponse.json({ response: aiMessage });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }
}
