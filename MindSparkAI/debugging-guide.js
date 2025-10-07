// Debugging checklist for MindSparkAI

// 1. SERVER HEALTH CHECK
// Open browser to: http://127.0.0.1:5000
// Should show: "✅ MindSpark AI backend is running and ready!"

// 2. FRONTEND FETCH ERROR DEBUGGING
// Add this to your script.js catch block for better error info:
catch (err) {
  console.error("Full error details:", err);
  console.error("Error name:", err.name);
  console.error("Error message:", err.message);
  
  thinkingMsg.innerHTML = `<b>MindSpark AI:</b> ⚠️ Error: ${err.message}`;
}

// 3. SERVER LOGGING
// Add this to your server.js /api/chat route:
app.post("/api/chat", async (req, res) => {
  console.log("🔵 POST /api/chat received");
  console.log("🔵 Request body:", req.body);
  console.log("🔵 Headers:", req.headers);
  
  const { message } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
    });

    console.log("🟢 OpenAI response received");
    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error("❌ OpenAI API Error:", error);
    res.status(500).json({ reply: "Error: AI could not respond." });
  }
});

// 4. NETWORK CONNECTIVITY TEST
// Add this function to your script.js for testing:
async function testConnection() {
  try {
    console.log("Testing server connection...");
    const response = await fetch("http://127.0.0.1:5000");
    const text = await response.text();
    console.log("Server response:", text);
    return true;
  } catch (error) {
    console.error("Connection test failed:", error);
    return false;
  }
}

// Call this before your main fetch:
// testConnection();

// 5. BROWSER CONSOLE CHECKS
// Open F12 Developer Tools → Console tab
// Look for:
// - CORS errors
// - Network errors  
// - Failed fetch requests
// - Any JavaScript errors

// 6. NETWORK TAB DEBUGGING
// Open F12 Developer Tools → Network tab
// Send a message and check:
// - Is the request showing up?
// - What's the status code? (should be 200)
// - What's the response body?
// - Are there any CORS preflight requests?