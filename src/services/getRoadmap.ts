import { getRoadmapPrompt } from "@/lib/prompts";

export const getRoadmap = (userPrompt: string) => {

    // get the prompt
    const prompt = getRoadmapPrompt(userPrompt);

    // get the response from llm
    let roadmapReadme = 'yo yo';
    let roadmapJSON = 'hi hello ';

    return { roadmapReadme, roadmapJSON };
}