import { NextResponse } from "next/server";
import { genAI } from "../openai.config";
import { getNotesPrompt } from "@/lib/prompts";

interface SubPhase {
  name: string;
  description: string;
}

interface Phase {
  name: string;
  description: string;
  subPhases: Record<string, SubPhase>;
}

export async function POST(req: Request) {
  try {
    const { phase }: { phase: Phase } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const chatSession = model.startChat({
      generationConfig: {
        temperature: 0.8,
        topP: 0.9,
        topK: 64,
        maxOutputTokens: 8192,
      },
    });

    const systemPrompt = getNotesPrompt();

    const userPrompt = `
Phase: ${phase.name}
Description: ${phase.description}

SubPhases:
${Object.values(phase.subPhases)
  .map((sub) => `- ${sub.name}: ${sub.description}`)
  .join("\n")}
`;

    const result = await chatSession.sendMessage(systemPrompt + "\n\n" + userPrompt);

    let rawText = result.response.text();
    rawText = rawText.replace(/^```[a-z]*\n?/i, "").replace(/```$/, "").trim();

    console.log(rawText);

    return NextResponse.json({ response: rawText });
  } catch (error) {
    console.error("Note Generation API Error:", error);
    return NextResponse.json({ error: "Failed to generate notes" }, { status: 500 });
  }
}
