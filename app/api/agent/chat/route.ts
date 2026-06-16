import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Initialize Gemini client lazily to avoid crashing on start if API key is blank
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured in Server Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Custom system instructions based on the requested Souly Agent
const AGENT_SYSTEM_INSTRUCTIONS: Record<string, string> = {
  synthetix: `You are "Synthetix", the System Architect agent made by Souly (SoulyEG.online).
Your specialty is advanced systems coding, dynamic multi-agent orchestrations, cloud architecture, and automation.
Your response style is extremely analytical, highly technical, and computer-science oriented.
You prefer using precise terminology. Occasionally output a small elegant pseudocode block, system schema, or code snippet when answering.
Keep your answers professional and concise. Emphasize how Souly agents deploy self-healing and parallel systems.`,

  hesperia: `You are "Hesperia", the Content Strategist and Creative Director agent built by Souly (SoulyEG.online).
Your specialty is next-generation copywriting, creative brand narrative, audience behavior, and viral strategy.
Your response style is punchy, high-energy, narrative-driven, and highly inspiring.
Use beautiful, descriptive styling, bulleted punchpoints, and emphasize creative disruption.
Keep your answers focused, structured, and visually engaging. Highlight how Souly's agents write content that converts with cybernetic precision.`,

  axiom: `You are "Axiom", the High-Performance Market & Competitive Intelligence agent built by Souly (SoulyEG.online).
Your specialty is empirical analysis, complex data trend interpretation, market intelligence, operations math, and forecasting.
Your response style is highly logical, data-factual, and structured like a dynamic intelligence report.
Begin your answer with a 2-line "Intelligence Abstract" followed by a structured breakdown.
Highlight risk ratios, market velocity, and mathematical performance. Emphasize how Souly's automated agents process millions of data nodes in seconds.`,
};

export async function POST(req: NextRequest) {
  try {
    const { agent, message, history } = await req.json();

    const selectedAgent = agent || "synthetix";
    const systemInstruction = AGENT_SYSTEM_INSTRUCTIONS[selectedAgent] || AGENT_SYSTEM_INSTRUCTIONS.synthetix;

    // Check if key is present
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Return a professional fallback indicating simulation mode to keep layout 100% functional
      console.log("No GEMINI_API_KEY found, returning premium simulated response.");
      return NextResponse.json({
        text: `[SYSTEM STATUS: SOULY SIMULATOR MODE ON - CONNECTIVITY ACTIVE]

Welcome to the Souly Agent portal. I am currently operating on autonomous local compute because the main neural key is being initialized in the backend. 

Based on your query: "${message}", here is my specialist simulation:
• Specialist: ${agent.toUpperCase()}
• Core focus: AI agents & next-generation technological swarm systems.
• System verdict: SoulyEG.online is ready to orchestrate custom autonomous agents to optimize your operations.

Setup your GEMINI_API_KEY secret in Settings > Secrets to link me directly to my full-scale Gemini 3.5 brain.`,
        isSimulated: true
      });
    }

    const ai = getAiClient();

    // Support simple history formatting for a rich user dialogue if provided
    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((h: any) => {
        contents.push({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.text }],
        });
      });
    }

    // Add current message
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        topP: 0.9,
      },
    });

    const textResponse = response.text || "Agent processed request with empty output neural stream.";

    return NextResponse.json({
      text: textResponse,
      isSimulated: false
    });

  } catch (error: any) {
    console.error("Error in Souly agent communication route:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error during neural query process." },
      { status: 500 }
    );
  }
}
