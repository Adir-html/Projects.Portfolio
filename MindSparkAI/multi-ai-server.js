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

// ✅ Initialize AI providers
console.log("🤖 Initializing AI providers...");

// OpenAI setup
let openai = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    timeout: 30000,
    maxRetries: 2,
  });
  console.log("✅ OpenAI initialized");
} else {
  console.log("⚠️ OpenAI API key not found");
}

// ✅ Optional root route
app.get("/", (req, res) => {
  res.send("✅ MindSpark AI backend is running and ready!");
});

// ✅ Enhanced Chat endpoint with multiple AI options
app.post("/api/chat", async (req, res) => {
  console.log("\n" + "=".repeat(50));
  console.log("🔵 NEW MESSAGE RECEIVED");
  console.log("🔵 Message:", req.body.message);
  console.log("🔵 From:", req.headers.origin);
  console.log("🔵 Time:", new Date().toLocaleTimeString());
  console.log("=".repeat(50));
  
  const { message } = req.body;

  // Try different AI providers in order of preference
  let response = await tryAIProviders(message);
  
  console.log("🟢 RESPONSE SENT:", response.substring(0, 50) + "...");
  console.log("=".repeat(50) + "\n");
  res.json({ reply: response });
});

// ✅ Try multiple AI providers with fallback
async function tryAIProviders(message) {
  
  // 1. Try OpenAI first (if available and has credits)
  if (openai) {
    try {
      console.log("🔵 Trying OpenAI...");
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system", 
            content: "You are MindSpark AI, a helpful programming mentor. Provide detailed, practical coding help with examples. Be enthusiastic and educational."
          },
          { role: "user", content: message }
        ],
        max_tokens: 500,
        temperature: 0.7
      });

      console.log("✅ OpenAI response received");
      return "🤖 **[OpenAI GPT-4]** " + response.choices[0].message.content;
      
    } catch (error) {
      console.log("❌ OpenAI failed:", error.message);
      
      if (error.status === 429) {
        console.log("🔄 OpenAI quota exceeded, trying alternatives...");
      }
    }
  }

  // 2. Try Groq (free alternative) - you can add this
  const groqResponse = await tryGroq(message);
  if (groqResponse) return groqResponse;

  // 3. Try Hugging Face API (free alternative)
  const hfResponse = await tryHuggingFace(message);
  if (hfResponse) return hfResponse;

  // 4. Fallback to enhanced local AI
  console.log("🤖 Using enhanced local AI...");
  return "🧠 **[Smart Local AI]** " + generateSmartResponse(message);
}

// ✅ Groq AI (Free ChatGPT alternative) - FIXED VERSION
async function tryGroq(message) {
  if (!process.env.GROQ_API_KEY) {
    console.log("⚠️ Groq API key not found");
    return null;
  }
  
  try {
    console.log("🔵 Trying Groq AI...");
    console.log("🔵 Groq API Key present:", process.env.GROQ_API_KEY.substring(0, 10) + "...");
    
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content: "You are MindSpark AI, an expert programming mentor and web development tutor. Provide detailed, practical coding help with clear examples. Be enthusiastic, educational, and always include working code examples. Format your responses with markdown for better readability."
          },
          { role: "user", content: message }
        ],
        max_tokens: 800,
        temperature: 0.8,
        top_p: 1,
        stream: false
      })
    });

    console.log("🔵 Groq response status:", response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log("✅ Groq response received successfully");
      return "🚀 **[Groq Llama3]** " + data.choices[0].message.content;
    } else {
      const errorText = await response.text();
      console.log("❌ Groq API error:", response.status, errorText);
      return null;
    }
  } catch (error) {
    console.log("❌ Groq network error:", error.message);
    return null;
  }
}

// ✅ Hugging Face AI (Free alternative)
async function tryHuggingFace(message) {
  if (!process.env.HUGGINGFACE_API_KEY) return null;
  
  try {
    console.log("🔵 Trying Hugging Face...");
    
    const response = await fetch("https://api-inference.huggingface.co/models/microsoft/DialoGPT-large", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: message,
        parameters: {
          max_length: 200,
          temperature: 0.7
        }
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log("✅ Hugging Face response received");
      return "🤗 **[Hugging Face]** " + data[0].generated_text;
    }
  } catch (error) {
    console.log("❌ Hugging Face failed:", error.message);
  }
  
  return null;
}

// ✅ Enhanced local AI (your current smart system)
function generateSmartResponse(message) {
  const msg = message.toLowerCase();
  
  // JavaScript functions explanation
  if (msg.includes('function') && msg.includes('javascript')) {
    return `Great question! JavaScript functions are reusable blocks of code. Here's how they work:

**Basic Function:**
\`\`\`javascript
function greet(name) {
    return "Hello, " + name + "!";
}
\`\`\`

**Arrow Functions:**
\`\`\`javascript
const greet = (name) => "Hello, " + name + "!";
\`\`\`

**Key concepts:**
• Functions can take parameters (like 'name' above)
• Use 'return' to send data back
• Call functions like: greet("John")
• Functions help organize and reuse code

Want to know more about a specific part?`;
  }
  
  // Programming help
  if (msg.includes('code') || msg.includes('program') || msg.includes('javascript')) {
    return `I can help you with programming! You mentioned: "${message}". 

I specialize in:
• **JavaScript**: Functions, variables, DOM manipulation
• **HTML**: Structure, elements, forms  
• **CSS**: Styling, layouts, responsive design
• **Debugging**: Finding and fixing errors
• **Web Development**: Building interactive websites

What specific coding challenge are you working on?`;
  }
  
  // Default response
  return `Hello! I'm MindSpark AI. You said: "${message}". I'm here to help with programming and web development. What would you like to learn?`;
}

// ✅ Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ MindSpark AI backend running on http://127.0.0.1:${PORT}`);
  console.log("🤖 Multi-AI system initialized:");
  console.log("   1. OpenAI GPT-4 (primary)");
  console.log("   2. Groq Llama3 (free alternative)"); 
  console.log("   3. Hugging Face (free alternative)");
  console.log("   4. Smart Local AI (fallback)");
  console.log("\n💡 Add API keys to .env file to enable more AIs!");
});