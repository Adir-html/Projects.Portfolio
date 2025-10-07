import express from "express";
import cors from "cors";

const app = express();

// ✅ Allow both localhost and 127.0.0.1 for Live Server
app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

// ✅ Test root route
app.get("/", (req, res) => {
  console.log("GET / route hit");
  res.send("✅ MindSpark AI backend is running and ready!");
});

// ✅ Test chat endpoint without OpenAI
app.post("/api/chat", async (req, res) => {
  console.log("POST /api/chat route hit");
  console.log("Request body:", req.body);
  
  const { message } = req.body;
  
  // Simple test response
  res.json({ reply: `You said: "${message}". This is a test response.` });
});

// ✅ Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ MindSpark AI backend running on http://127.0.0.1:${PORT}`);
  console.log("Server is ready to receive requests...");
});

// Keep the process alive
process.on('SIGINT', () => {
  console.log('Received SIGINT. Graceful shutdown...');
  process.exit(0);
});