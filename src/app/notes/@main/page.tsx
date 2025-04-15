"use client";
import React, { useEffect, useState } from "react";
import { Stars } from "lucide-react";
import { getRoadmap } from "@/services/getRoadmap";
import Loading from "./loading";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import "github-markdown-css/github-markdown.css";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

interface SubPhase {
  name: string;
  description: string;
}

interface Phase {
  name: string;
  description: string;
  subPhases: Record<string, SubPhase>;
}

type RoadmapJSON = Record<string, Phase>;




const Page = () => {
  const [readme, setReadme] = useState<string>("");
  const [roadmapJson, setRoadmapJson] = useState();
  const [generatedNotes, setGeneratedNotes] = useState<string>();
  const [loading, setLoading] = useState(false);

  const generateAllNotes = async () => {
    setLoading(true);
    const json = localStorage.getItem("roadmapJSON");
    if (!json) return;
  
    const roadmap = JSON.parse(json) as RoadmapJSON;
  
    const phaseEntries = Object.entries(roadmap);
  
    const notePromises = phaseEntries.map(async ([key, phase]) => {
      const res = await fetch("/api/generateNotes", {
        method: "POST",
        body: JSON.stringify({ phase }),
      });
      const data = await res.json();
      return {
        phaseKey: key,
        title: phase.name,
        notes: data.response,
      };
    });
  
    const allNotes = await Promise.all(notePromises);
  
    const finalNotesMarkdown = allNotes
      .map(({ title, notes }) => `## ${title}\n\n${notes}`)
      .join("\n\n");
  
    console.log("🎉 All Notes Generated:", finalNotesMarkdown);
    setGeneratedNotes(finalNotesMarkdown);
    setLoading(false);
  };
  

  useEffect(() => {
    async function fetchReadme() {
      const userPrompt = localStorage.getItem("userPrompt");
      console.log("Main: ", userPrompt);
      const data = await getRoadmap(userPrompt!);
      setReadme(data.readme);
      console.log(data.roadmapjson);
    }

    fetchReadme();
  }, []);

  if (!readme) {
    return <Loading msg={"Generating Roadmap"} />;
  }

  if (loading) {
    return <Loading msg={"Hang Tight, Generating Notes"} />;
  }

  return (
    <div className="markdown-body w-[75%] h-full bg-[#212121] rounded-2xl p-12 overflow-y-auto relative text-white">
  
    {
      generatedNotes ? <ReactMarkdown children={generatedNotes} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight, rehypeSlug, rehypeAutolinkHeadings]} /> : (
        <ReactMarkdown
          children={readme}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight, rehypeSlug, rehypeAutolinkHeadings]}
        />
      )
    }

    {
      generatedNotes ? (
        <></>
      ) : (
      <div onClick={generateAllNotes} className="rounded-lg z-50 px-5 py-2 flex items-center justify-center gap-2 bg-black hover:bg-[#121212] duration-150 fixed bottom-10 right-15 w-fit cursor-pointer">
        <p className="text-md font-bold text-slate-200 mb-0!">Make Notes</p>
        <Stars className="text-green-500" />
      </div>
      )
    }
    </div>
  );
};

export default Page;
