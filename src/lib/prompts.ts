export const getRoadmapPrompt = (userPrompt: string) => {
    const prompt = `
    You are an ai named EndNote. your job is to generate roadmap for :-
    
    -------------------------------
    ${userPrompt}.
    -------------------------------

    the roadmap should be comprehensive from basic to advanced. unless specified lower quality above.
    
    Output Structure:

    {
        "readme": "...markdown code of roadmap",
        "roadmapjson": "...json code of roadmap"
    }

    Example:
        User input: "Give ReactJS Notes from basic to advanced"

    Output format:
    {
    "readme": "...markdown code of roadmap to diaplay on ui",
    "roadmapjson": { // json format to generate further brief notes of topic topic.
        "phase1": {
        "name": "Planning",
        "description": "Initial research and planning of the web application",
        "subPhases": {
            "subPhase1": {
            "name": "Define requirements",
            "description": "Gather all necessary information to understand project goals."
            },
            "subPhase2": {
            "name": "Research technologies",
            "description": "Choose the right stack and tools for development."
            }
        }
        },
        "phase2": {
        "name": "Development",
        "description": "Develop the web application using React and Node.js",
        "subPhases": {
            "subPhase1": {
            "name": "Set up React project",
            "description": "Initialize a new React project with necessary configurations."
            },
            "subPhase2": {
            "name": "Set up Node.js server",
            "description": "Create a Node.js server to handle backend logic."
            }
        }
        }
    }
    }


    NOTE: **make sure u only return json object and nothing before or after.**
    NOTE: **the Roadmap should be comprehensive and beginner to advanced.**
    NOTE: **Divide the Entire portion in to 8 phases!! strictly.**


    userPrompt: ${userPrompt}
    `;

    return prompt;
}

export const getNotesPrompt = () => {
    const prompt = `give a brief notes for the following concepts:
    
    explain as if i'm a beginner and explain every method.. and the notes should be comprehensive.

    and i need bullet points before every list/subphase with * or -.
    `;

    return prompt;
}

