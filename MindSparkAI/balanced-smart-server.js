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

console.log("🤖 Initializing Balanced Smart AI system...");
console.log("🔑 Groq API Key:", process.env.GROQ_API_KEY ? "✅ Found" : "❌ Missing");

app.get("/", (req, res) => {
  res.send("✅ MindSpark AI Balanced Smart backend is running!");
});

// ✅ Balanced Smart Chat endpoint
app.post("/api/chat", async (req, res) => {
  console.log("\n" + "⭐".repeat(15));
  console.log("🔵 NEW MESSAGE:", req.body.message);
  console.log("🔵 Time:", new Date().toLocaleTimeString());
  console.log("⭐".repeat(15));
  
  const { message } = req.body;

  // Try Groq first
  const groqResponse = await tryGroqAI(message);
  if (groqResponse) {
    console.log("✅ GROQ SUCCESS!");
    console.log("⭐".repeat(15) + "\n");
    return res.json({ reply: groqResponse });
  }

  // Fallback to BALANCED smart local AI
  console.log("🧠 Using BALANCED smart AI...");
  const smartResponse = generateBalancedResponse(message);
  console.log("✅ BALANCED RESPONSE READY!");
  console.log("⭐".repeat(15) + "\n");
  res.json({ reply: smartResponse });
});

// ✅ Groq Integration (with updated model)
async function tryGroqAI(message) {
  if (!process.env.GROQ_API_KEY) {
    console.log("❌ No Groq API key found");
    return null;
  }

  try {
    console.log("🔵 Connecting to Groq AI...");
    
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
            content: "You are MindSpark AI, a helpful programming mentor. Provide clear, concise, and practical coding help with examples. Keep responses focused and readable - aim for 200-400 words with 1-2 code examples. Be enthusiastic but concise!"
          },
          { 
            role: "user", 
            content: message 
          }
        ],
        max_tokens: 600,
        temperature: 0.7,
        stream: false
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log("❌ Groq API error:", response.status, errorText);
      return null;
    }

    const data = await response.json();
    console.log("✅ Groq responded successfully!");
    
    return "🚀 **[Groq Llama3 - Real AI]** " + data.choices[0].message.content;

  } catch (error) {
    console.log("❌ Groq connection failed:", error.message);
    return null;
  }
}

// ✅ BALANCED Smart Local AI (Helpful but not overwhelming)
function generateBalancedResponse(message) {
  const msg = message.toLowerCase();
  
  // Todo app - Concise but complete
  if (msg.includes('todo') && (msg.includes('app') || msg.includes('build'))) {
    return `🎯 **Todo App - Quick Start Guide**

Here's a simple but complete todo app:

**HTML (index.html):**
\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>Todo App</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>My Todo App</h1>
        <div class="input-section">
            <input type="text" id="todoInput" placeholder="Add new task...">
            <button onclick="addTodo()">Add</button>
        </div>
        <ul id="todoList"></ul>
    </div>
    <script src="script.js"></script>
</body>
</html>
\`\`\`

**JavaScript (script.js):**
\`\`\`javascript
let todos = [];

function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    
    if (text) {
        todos.push({id: Date.now(), text: text, done: false});
        input.value = '';
        renderTodos();
    }
}

function toggleTodo(id) {
    todos = todos.map(todo => 
        todo.id === id ? {...todo, done: !todo.done} : todo
    );
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

function renderTodos() {
    const list = document.getElementById('todoList');
    list.innerHTML = todos.map(todo => \`
        <li class="\${todo.done ? 'done' : ''}">
            <span onclick="toggleTodo(\${todo.id})">\${todo.text}</span>
            <button onclick="deleteTodo(\${todo.id})">❌</button>
        </li>
    \`).join('');
}
\`\`\`

**CSS (style.css):**
\`\`\`css
.container { max-width: 500px; margin: 50px auto; padding: 20px; }
.input-section { display: flex; margin-bottom: 20px; }
input { flex: 1; padding: 10px; border: 1px solid #ddd; }
button { padding: 10px 15px; background: #007bff; color: white; border: none; cursor: pointer; }
li { display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid #eee; }
.done span { text-decoration: line-through; opacity: 0.6; }
\`\`\`

**🚀 Next Steps:** Add local storage, editing, or drag-and-drop!

Want help with any specific feature?`;
  }
  
  // DOM Manipulation - Focused guide
  if (msg.includes('dom') && (msg.includes('manipulation') || msg.includes('javascript'))) {
    return `🎯 **DOM Manipulation Essentials**

DOM lets you make websites interactive! Here are the key methods:

**🔍 Selecting Elements:**
\`\`\`javascript
// Modern selectors (recommended)
const element = document.querySelector('#myId');
const elements = document.querySelectorAll('.myClass');

// Legacy selectors
const element = document.getElementById('myId');
const elements = document.getElementsByClassName('myClass');
\`\`\`

**✏️ Changing Content:**
\`\`\`javascript
// Change text safely
element.textContent = 'New text';

// Change HTML (be careful!)
element.innerHTML = '<strong>Bold text</strong>';

// Change attributes
element.src = 'newimage.jpg';
element.setAttribute('data-value', '123');
\`\`\`

**🎯 Event Handling:**
\`\`\`javascript
// Click events
button.addEventListener('click', function() {
    console.log('Button clicked!');
});

// Input events
input.addEventListener('input', (e) => {
    console.log('User typed:', e.target.value);
});
\`\`\`

**🏗️ Creating Elements:**
\`\`\`javascript
const newDiv = document.createElement('div');
newDiv.textContent = 'Hello World';
newDiv.className = 'my-class';
document.body.appendChild(newDiv);
\`\`\`

**💡 Quick Example - Dynamic List:**
\`\`\`javascript
function addItem(text) {
    const li = document.createElement('li');
    li.innerHTML = \`\${text} <button onclick="this.parentElement.remove()">Delete</button>\`;
    document.getElementById('myList').appendChild(li);
}
\`\`\`

**Want to learn more?** Ask about specific DOM operations!`;
  }
  
  // JavaScript Functions - Focused
  if (msg.includes('function') && msg.includes('javascript')) {
    return `🚀 **JavaScript Functions - Core Concepts**

Functions are reusable code blocks. Here's what you need to know:

**📝 Function Declaration:**
\`\`\`javascript
function greetUser(name, age = 18) {
    console.log(\`Hello \${name}, you are \${age} years old\`);
    return \`Welcome, \${name}!\`;
}

// Usage
const message = greetUser('Alice', 25);
\`\`\`

**⚡ Arrow Functions (Modern):**
\`\`\`javascript
// Multi-line
const calculateTotal = (price, tax) => {
    const total = price + (price * tax);
    return total;
};

// Single line
const double = x => x * 2;
const isEven = num => num % 2 === 0;
\`\`\`

**🔄 Array Functions (Super Useful):**
\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];

// Transform each item
const doubled = numbers.map(n => n * 2);

// Filter items
const evens = numbers.filter(n => n % 2 === 0);

// Execute for each item
numbers.forEach(n => console.log(n));

// Combine into single value
const sum = numbers.reduce((total, n) => total + n, 0);
\`\`\`

**🌟 Async Functions (For APIs):**
\`\`\`javascript
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// Usage
fetchData('/api/users').then(users => {
    console.log('Users:', users);
});
\`\`\`

**💡 Pro Tip:** Start with simple functions and gradually learn arrow functions and async patterns!

**What specific function concept would you like to explore?**`;
  }
  
  // General programming help
  if (msg.includes('code') || msg.includes('program') || msg.includes('javascript') || msg.includes('help')) {
    return `💻 **Programming Help - I'm Here to Help!**

You asked: "${message}"

**🎯 I can help you with:**

**JavaScript Fundamentals:**
• Variables, functions, and objects
• DOM manipulation and events
• Arrays and modern methods (map, filter, reduce)
• Async programming (promises, async/await)

**Web Development:**
• HTML structure and semantics
• CSS styling and responsive design
• Interactive user interfaces
• API integration and data handling

**🔥 Quick Examples:**

**Interactive Button:**
\`\`\`javascript
document.getElementById('myButton').addEventListener('click', () => {
    alert('Hello World!');
});
\`\`\`

**Fetch Data:**
\`\`\`javascript
async function getData() {
    const response = await fetch('/api/data');
    const data = await response.json();
    console.log(data);
}
\`\`\`

**Dynamic Content:**
\`\`\`javascript
const container = document.querySelector('.container');
container.innerHTML = '<h2>New Content!</h2>';
\`\`\`

**💡 For better help, ask specific questions like:**
• "How do I create a responsive navbar?"
• "Explain JavaScript promises"
• "Help me build a weather app"
• "Show me array methods"

**What coding challenge can I help you solve?** 🚀`;
  }
  
  // Default response
  return `🧠 **Smart AI Ready to Help!**

Hey! You said: "${message}"

I'm MindSpark AI, your coding companion! I love helping with:

**🔥 JavaScript & Web Development:**
• Interactive websites and web apps
• Modern JavaScript features
• DOM manipulation and events
• API integration and async programming

**🎨 Frontend Technologies:**
• HTML structure and accessibility
• CSS styling and responsive design
• User interface design
• Performance optimization

**💡 Quick Start Ideas:**
• "Build a todo app" → Complete tutorial
• "Explain DOM manipulation" → Interactive guide
• "How do functions work?" → Core concepts
• "Create a responsive layout" → CSS guide

**🎯 Pro Tip:** Be specific with your questions for the best help!

**What coding adventure should we tackle today?** 🚀`;
}

// ✅ Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ MindSpark AI Balanced Smart backend running on http://127.0.0.1:${PORT}`);
  console.log("🎯 Balanced AI system ready - helpful but not overwhelming!");
  console.log("💡 Perfect response length for easy reading!");
});