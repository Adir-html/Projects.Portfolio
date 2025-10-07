import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

// ✅ Allow both localhost and 127.0.0.1 for Live Server
app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

// ✅ Initialize OpenAI client
console.log("🔧 Initializing OpenAI client...");
console.log("🔧 API Key present:", !!process.env.OPENAI_API_KEY);
console.log("🔧 API Key format:", process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.substring(0, 10) + "..." : "MISSING");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  // Add timeout and retry settings for better reliability
  timeout: 30000, // 30 seconds
  maxRetries: 2,
});

// ✅ Optional root route (so “Cannot GET /” won’t appear)
app.get("/", (req, res) => {
  res.send("✅ MindSpark AI backend is running and ready!");
});

// ✅ Chat endpoint
app.post("/api/chat", async (req, res) => {
  console.log("\n" + "=".repeat(50));
  console.log("🔵 NEW MESSAGE RECEIVED");
  console.log("🔵 Message:", req.body.message);
  console.log("🔵 From:", req.headers.origin);
  console.log("🔵 Time:", new Date().toLocaleTimeString());
  console.log("=".repeat(50));
  
  const { message } = req.body;

  try {
    console.log("🔵 Sending request to OpenAI...");
    console.log("🔵 Using API key:", process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.substring(0, 20) + "..." : "NOT FOUND");
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
      max_tokens: 150, // Limit response length
      temperature: 0.7
    });

    console.log("🟢 OpenAI response received successfully");
    const aiReply = response.choices[0].message.content;
    console.log("🟢 RESPONSE SENT:", aiReply.substring(0, 50) + "...");
    console.log("=".repeat(50) + "\n");
    
    res.json({ reply: aiReply });
    
  } catch (error) {
    console.error("❌ OpenAI API Error Details:");
    console.error("❌ Error Type:", error.constructor.name);
    console.error("❌ Status Code:", error.status);
    console.error("❌ Error Code:", error.code);
    console.error("❌ Error Message:", error.message);
    
    // More specific error handling
    if (error.status === 429) {
      console.log("� Rate limit hit, but you have Plus... trying different approach");
      res.status(500).json({ reply: "Rate limit exceeded. Please try again in a moment." });
    } else if (error.status === 401) {
      console.log("🔑 Authentication issue with API key");
      res.status(500).json({ reply: "API authentication error. Please check your OpenAI API key." });
    } else if (error.status === 403) {
      console.log("� Permission denied - check API key permissions");
      res.status(500).json({ reply: "Permission denied. Please check your API key permissions." });
    } else {
      console.log("❓ Unknown error occurred");
      res.status(500).json({ reply: `Error: ${error.message || "AI could not respond."}` });
    }
    
    console.log("=".repeat(50) + "\n");
  }
});

// ✅ Start server
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`✅ MindSpark AI backend running on http://127.0.0.1:${PORT}`)
);