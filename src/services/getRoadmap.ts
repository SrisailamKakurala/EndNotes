import { getRoadmapPrompt } from "@/lib/prompts";

export const getRoadmap = async (userPrompt: string) => {

    // get the prompt
    const systemPrompt = getRoadmapPrompt(userPrompt);

    const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userPrompt, systemPrompt }),
    });
    
    const { response } = await res.json();
    
    try {
        const data = JSON.parse(response);
        console.log("README MARKDOWN:", data.readme);
        console.log("ROADMAP JSON:", data.roadmapjson);
    } catch (err) {
        console.error("Failed to parse AI JSON response:", err);
    }
}