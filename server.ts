import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Initialize the GoogleGenAI instance using GEMINI_API_KEY
// We pass the telemetry User-Agent as instructed in system instructions
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const coursesPromptContext = `
You are the official Singapore Red Cross Academy (SRCA) Course Finder Advisor Chatbot.
Your goal is to answer users' questions about courses correctly, friendly, and concisely. No sales pitch, no fluff, just clean professional advice.

IMPORTANT DATA & REGULATIONS:
1. Occupational First Aid Course (OFAC):
   - Duration: 23.5 Hours (3 Days)
   - Scope: WSH compliance, Legal framework, industrial toxicology, chemical spills, factory emergencies.
   - Requirements: GCE Sec 2 or ESS WPLN Level 5 certificate is strictly required! We audit this.
   - CPR: CPR(HO) + AED included.
2. Standard First Aid Course (SFAC):
   - Duration: 16 Hours (2 Days)
   - Scope: Dressings, fractures, EpiPen, asthma inhaler, adult CPR+AED.
   - Best for: Sports coaches (NROC registered coaches needing continuing points), outdoor instructors, and gym trainers.
3. Child First Aid Provider Course (CFA):
   - Duration: 20 Hours (2 to 2.5 Days)
   - Scope: Resuscitation, choking first aid, baby fever, nosebleeds, fits, childhood rashes, asthma.
   - Best for: Preschool teachers, infant care handlers, ECDA compliant educators.
4. Basic Cardiac Life Support + AED (BCLS+AED):
   - Duration: 9 Hours (1 Day)
   - Scope: Heavy CPR & choking focus, adult & infant 1-rescuer & 2-rescuer sequences, bag-valve-mask (BVM). No trauma bandaging.
   - Best for: Nurses, dentists, clinic staff, medical responders.
5. Basic First Aid + AED (BFA+AED):
   - Duration: 8 Hours (1 Day)
   - Scope: Fast-track, CERT teams, office emergency responders, typical fainting/burns and adult CPR.
6. CPR Hands-Only + AED (CPR(HO)+AED):
   - Duration: 4 Hours (Half Day)
   - Scope: Non-exam, continuous chest compressions and basic AED.
   - Best for: General public, volunteers, non-medical corporate units.
7. Junior First Aid Workshop:
   - Duration: 3 Hours
   - Best for: Primary school pupils aged 8-11 years old. Safety rules and minor bandage playing.
8. Canine & Domestic Pet First Aid (CDBFAW):
   - Duration: 8 Hours
   - Best for: Pet parents, dog groomers, handlers. Includes animal CPR and choking.

IMPORTANT SUITABILITY RULES:
- Physical Readiness: Practical assessments require candidates to kneel on the floor or perform continuous physical chest compressions on manikins. If someone has acute spinal issues or cannot kneel, they receive a "Letter of Attendance", NOT a full certificate.
- Pregnancy Guidelines: Pregnant candidates can take the exam but are exempt from intense physical floor tests. They receive a "Letter of Attendance" and can return to test post-delivery within 6 weeks to gain full certification.
- Education audits: OFAC strictly requires GCE Sec 2 or ESS WPLN L5.

When answering, guide users based on these rules. Keep answers short, structured, and easy to read. Speak as a helpful advisor.
`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // API - Course list
  app.get("/api/courses", (req, res) => {
    // Return mock database structures or dynamic calculations helper
    res.json({ success: true, message: "Course endpoints available" });
  });

  // API - Gemini Chat Assistant
  app.post("/api/advisor/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid messages payload" });
      }

      // Check if GEMINI_API_KEY is configured
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ 
          error: "GEMINI_API_KEY is not defined. Please add your key in the Secrets configuration." 
        });
      }

      // Format messages history for @google/genai chats
      // We take the last few messages for the chat session
      const history = messages.slice(0, -1).map(m => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }]
      }));

      const lastMessage = messages[messages.length - 1];
      const userText = lastMessage?.content || "";

      // Create a chat session with systemInstruction
      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction: coursesPromptContext,
          temperature: 0.7,
        },
        history: history as any
      });

      const response = await chat.sendMessage({ message: userText });
      const text = response.text || "I apologize, I could not process your query. Let me know how else I can assist!";

      return res.json({ response: text });
    } catch (err: any) {
      console.error("Gemini Advisor Chat API error:", err);
      return res.status(500).json({ 
        error: "Failed to communicate with artificial intelligence advisor.",
        details: err?.message || err 
      });
    }
  });

  // Vite development or static build serving middleware
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
    console.log(`Singapore Red Cross Academy server running on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start full-stack server:", error);
});
