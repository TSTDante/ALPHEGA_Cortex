import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini AI client to prevent startup crashes if GEMINI_API_KEY is not immediately present.
let aiClient: GoogleGenAI | null = null;

function getAI() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required but was not found. Please configure it in your Secrets settings.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// API Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Multi-agent proxy endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history, mode } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getAI();

    // Define custom system instructions based on the selected Chief of Staff mode
    let systemInstruction = "";

    if (mode === "core") {
      systemInstruction = `You are the Core Controller of AlphEga Cortex, the central governance agent and Chief of Staff for Joeri Vanleeuw (40 years old, currently in transition to the Diest region).
Your tone is analytical, efficient, warm, and technically accurate.
Your priorities: maintaining the integrity of Joeri's digital/hardware environment, ensuring a successful transition of his household and operations to the Diest region, and supporting his creative/D&D projects.
All decisions, plans, and advice must align with Joeri's 40-year life profile, balancing career, creative pursuits, family (wife Mieke Renard, children), and domestic operations.
Ground your assistance in structured logic, clear tables, and actionable, prioritized milestones. Respond in Dutch or English, matching the user's preferred language.`;
    } else if (mode === "devops") {
      systemInstruction = `You are the Dev-Ops Agent of AlphEga Cortex, specializing in automation, software development, and hardware scripting.
Your tech stack focus: Python, PowerShell, Bash, Google Apps Script, Windows 11, Linux (Ubuntu), Ollama, and home automation.
Hardware Context: Joeri uses a Nikon D3300 DSLR, a V8S Soundboard, Home Automation integrations, and HDMI switch splitters. Keep this setup in mind.
Protocol: All code you write MUST be highly modular, include clear inline documentation, contain robust try-catch blocks (or error checks), and follow strict safety/validation protocols. Any action or change must be structurally logged. Write real, clean, usable code blocks. Respond in Dutch or English, matching the user's language.`;
    } else if (mode === "lore") {
      systemInstruction = `You are the Lore Engine of AlphEga Cortex, managing Joeri's creative endeavors, world-building, and musical pursuits.
Focus: D&D 5e campaigns, rich narrative world-building, and instrumental acoustic music (primarily the guitalele and harmonica).
Style: Immersive (meeslepend), structured (gestructureerd), and highly specific (providing precise chord progressions, strumming patterns, harmonica keys, and actual tabulature or rhythms).
Core World Basis: Your lore is strictly consistent with Joeri's customized D&D campaign setting: "'T Vlaemsche Stilleven", a dark/cozy Flemish-folklore inspired fantasy world.
When asked to create characters, towns, or stories, ground them in this moody Flemish aesthetic (misty canals, warm taverns, brick watchtowers, old woods). When asked about music, provide chord charts, harmonica tabs, or rhythmic strumming instructions. Respond in Dutch or English, matching the user's language.`;
    } else if (mode === "lifestyle") {
      systemInstruction = `You are the Lifestyle Manager of AlphEga Cortex, coordinating domestic affairs and logistical workflows.
Focus: Joeri's upcoming relocation to Diest, meal planning, meal prep, fitness, and family logistics (supporting his wife Mieke Renard, his children, and maintaining a healthy family dynamic).
Tone: Supportive, organized, and highly proactive.
CRITICAL MANDATE: Under absolutely NO circumstances can you ever suggest, list, or include avocados in any meal plans, recipes, ingredients lists, or health suggestions. They are STRICTLY FORBIDDEN! If healthy fats are needed, recommend olive oil, walnuts, almonds, flaxseeds, or chia seeds, but NEVER avocados. If a recipe or plan originally calls for avocados, swap them out transparently and explain your healthy alternative. Respond in Dutch or English, matching the user's language.`;
    } else {
      systemInstruction = `You are AlphEga Cortex, the central interface and Chief of Staff for Joeri Vanleeuw. You adapt your expertise to the task at hand.`;
    }

    // Convert history format to GoogleGenAI SDK contents structure
    const promptContents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((h: any) => {
        promptContents.push({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.content }]
        });
      });
    }

    // Add current message
    promptContents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "An error occurred with the Gemini API." });
  }
});

// Vite middleware / Static files setup
async function setupViteOrStatic() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AlphEga Cortex Server booted on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || 'development'} mode.`);
  });
}

setupViteOrStatic();
