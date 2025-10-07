import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({
  origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
  methods: ["GET", "POST"],
}));

app.use(express.json());

console.log("🎯 Concise AI system starting...");
console.log("🔑 Groq API Key:", process.env.GROQ_API_KEY ? "✅ Found" : "❌ Missing");

app.get("/", (req, res) => {
  res.send("✅ MindSpark AI Concise backend is running!");
});

// ✅ Concise Chat endpoint
app.post("/api/chat", async (req, res) => {
  console.log("💬 Message:", req.body.message);
  
  const { message } = req.body;

  // Try Groq first
  const groqResponse = await tryGroqAI(message);
  if (groqResponse) {
    console.log("✅ Groq responded");
    return res.json({ reply: groqResponse });
  }

  // Fallback to CONCISE local AI
  console.log("🎯 Using concise AI...");
  const conciseResponse = generateConciseResponse(message);
  res.json({ reply: conciseResponse });
});

// ✅ Groq Integration with CONCISE instructions
async function tryGroqAI(message) {
  if (!process.env.GROQ_API_KEY) {
    return null;
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: "You are MindSpark AI. Give SHORT, focused answers (2-3 sentences max). Only use the programming language the user mentions. If they ask about JavaScript, only show JavaScript. Keep it simple and direct. No long tutorials unless specifically requested."
          },
          { 
            role: "user", 
            content: message 
          }
        ],
        max_tokens: 150,
        temperature: 0.7,
        stream: false
      })
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return "🚀 **[Groq AI]** " + data.choices[0].message.content;

  } catch (error) {
    return null;
  }
}

// ✅ CONCISE Local AI - Short & Sweet responses
function generateConciseResponse(message) {
  const msg = message.toLowerCase();
  
  // Todo app request
  if (msg.includes('todo') && (msg.includes('app') || msg.includes('build') || msg.includes('add'))) {
    return `🎯 **Quick Todo App (JavaScript)**

**HTML:**
\`\`\`html
<input id="todoInput" placeholder="Add task...">
<button onclick="addTodo()">Add</button>
<ul id="todoList"></ul>
\`\`\`

**JavaScript:**
\`\`\`javascript
function addTodo() {
  const input = document.getElementById('todoInput');
  const li = document.createElement('li');
  li.textContent = input.value;
  document.getElementById('todoList').appendChild(li);
  input.value = '';
}
\`\`\`

That's it! Want to add delete or toggle features?`;
  }
  
  // DOM questions
  if (msg.includes('dom')) {
    return `🎯 **DOM Basics**

\`\`\`javascript
// Select elements
const element = document.querySelector('#myId');

// Change content
element.textContent = 'New text';

// Add event
element.addEventListener('click', () => {
  console.log('Clicked!');
});
\`\`\`

Need help with a specific DOM operation?`;
  }
  
  // Functions
  if (msg.includes('function')) {
    return `🎯 **JavaScript Functions**

\`\`\`javascript
// Regular function
function greet(name) {
  return 'Hello ' + name;
}

// Arrow function  
const greet = (name) => 'Hello ' + name;

// Usage
console.log(greet('Alice'));
\`\`\`

What specific function concept do you need help with?`;
  }
  
  // Arrays
  if (msg.includes('array')) {
    return `🎯 **JavaScript Arrays**

\`\`\`javascript
const arr = [1, 2, 3];

// Add items
arr.push(4);

// Transform
const doubled = arr.map(x => x * 2);

// Filter
const evens = arr.filter(x => x % 2 === 0);
\`\`\`

What array operation do you need help with?`;
  }
  
  // Events
  if (msg.includes('event')) {
    return `🎯 **JavaScript Events**

\`\`\`javascript
// Click event
button.addEventListener('click', () => {
  console.log('Clicked!');
});

// Input event
input.addEventListener('input', (e) => {
  console.log(e.target.value);
});
\`\`\`

What type of event do you want to handle?`;
  }
  
  // CSS
  if (msg.includes('css') || msg.includes('style')) {
    return `🎯 **Quick CSS**

\`\`\`css
/* Center content */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Responsive */
@media (max-width: 768px) {
  .container { flex-direction: column; }
}
\`\`\`

What specific styling do you need help with?`;
  }
  
  // Default response
  return `🤖 **MindSpark AI - Ready to Help!**

You asked: "${message}"

I can help with:
• JavaScript (functions, DOM, events, arrays)
• HTML (structure, forms, elements)  
• CSS (styling, layout, responsive)
• Web apps (todo lists, calculators, etc)

**Be specific!** Ask things like:
• "How do I add a click event?"
• "Show me a simple calculator"
• "Help with CSS flexbox"

What exactly do you want to build or learn?`;
}

// ✅ Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Concise AI running on http://127.0.0.1:${PORT}`);
  console.log("🎯 SHORT responses only - no overwhelming walls of text!");
});