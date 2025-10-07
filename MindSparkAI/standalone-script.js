// 🎯 MindSpark AI - Standalone Version (No Backend Required)
const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const clearBtn = document.getElementById("clear-btn");
const darkModeToggle = document.getElementById("dark-mode-toggle");

let conversationHistory = [];

// 🌙 Initialize Dark Mode
function initializeDarkMode() {
  const isDarkMode = localStorage.getItem("darkMode") === "true";
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
    darkModeToggle.textContent = "☀️";
  }
}

// 🌙 Toggle Dark Mode
darkModeToggle.addEventListener("click", () => {
  const isDarkMode = document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", isDarkMode);
  darkModeToggle.textContent = isDarkMode ? "☀️" : "🌙";
});

// 💾 Load conversation history from localStorage
function loadConversationHistory() {
  const saved = localStorage.getItem("mindsparkHistory");
  if (saved) {
    conversationHistory = JSON.parse(saved);
    conversationHistory.forEach(msg => {
      addMessage(msg.sender, msg.text, msg.type, msg.timestamp, false);
    });
  }
}

// 💾 Save conversation to localStorage
function saveConversationHistory() {
  localStorage.setItem("mindsparkHistory", JSON.stringify(conversationHistory));
}

// 🗑️ Clear chat history
clearBtn.addEventListener("click", () => {
  if (confirm("Clear all chat history?")) {
    conversationHistory = [];
    localStorage.removeItem("mindsparkHistory");
    chatBox.innerHTML = "";
  }
});

// ⚡ Send message with Enter key
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendBtn.click();
  }
});

// 🚀 Enhanced send message function
sendBtn.addEventListener("click", async () => {
  const message = input.value.trim();
  if (!message) return;

  // Add user message
  addMessage("You", message, "user");
  input.value = "";

  // Show typing animation
  const typingMsg = showTypingAnimation();

  // Simulate AI thinking time
  setTimeout(() => {
    typingMsg.remove();
    const aiResponse = generateSmartResponse(message);
    addMessage("MindSpark AI", aiResponse, "bot");
  }, 1000 + Math.random() * 2000); // 1-3 seconds
});

// 🧠 Smart AI Response Generator
function generateSmartResponse(message) {
  const msg = message.toLowerCase();
  
  // Greetings
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
    const greetings = [
      "Hello! I'm MindSpark AI. How can I help you today?",
      "Hi there! Ready to chat or need coding help?",
      "Hey! I'm here to help with programming or just chat!"
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
  
  // Todo app request - improved detection
  if ((msg.includes('todo') || msg.includes('to do') || msg.includes('task')) && 
      (msg.includes('app') || msg.includes('list') || msg.includes('build') || msg.includes('make') || msg.includes('create') || msg.includes('code'))) {
    return `🎯 **Complete Todo List App**

**HTML:**
\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>Todo App</title>
    <style>
        body { font-family: Arial; max-width: 500px; margin: 50px auto; }
        .todo-container { padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
        .input-section { display: flex; margin-bottom: 20px; }
        input { flex: 1; padding: 10px; border: 1px solid #ccc; border-radius: 4px; }
        button { padding: 10px 15px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; margin-left: 5px; }
        .todo-item { display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #eee; }
        .completed { text-decoration: line-through; opacity: 0.6; }
    </style>
</head>
<body>
    <div class="todo-container">
        <h1>📝 My Todo List</h1>
        <div class="input-section">
            <input type="text" id="todoInput" placeholder="Add new task...">
            <button onclick="addTodo()">Add</button>
        </div>
        <div id="todoList"></div>
    </div>
    <script src="script.js"></script>
</body>
</html>
\`\`\`

**JavaScript (script.js):**
\`\`\`javascript
let todos = [];
let todoId = 1;

function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    
    if (text) {
        const todo = {
            id: todoId++,
            text: text,
            completed: false
        };
        
        todos.push(todo);
        input.value = '';
        renderTodos();
    }
}

function toggleTodo(id) {
    todos = todos.map(todo => 
        todo.id === id ? {...todo, completed: !todo.completed} : todo
    );
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

function renderTodos() {
    const container = document.getElementById('todoList');
    
    if (todos.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666;">No tasks yet. Add one above!</p>';
        return;
    }
    
    container.innerHTML = todos.map(todo => \`
        <div class="todo-item \${todo.completed ? 'completed' : ''}">
            <span onclick="toggleTodo(\${todo.id})" style="cursor: pointer; flex: 1;">
                \${todo.completed ? '✅' : '⭕'} \${todo.text}
            </span>
            <button onclick="deleteTodo(\${todo.id})" style="background: #dc3545;">❌</button>
        </div>
    \`).join('');
}

// Add task with Enter key
document.getElementById('todoInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});
\`\`\`

**Features:**
✅ Add tasks with button or Enter key
✅ Click to mark complete/incomplete  
✅ Delete tasks
✅ Clean, responsive design
✅ Task counter and empty state

**Ready to use! Just save as HTML file and open in browser!** 🚀`;
  }
  
  // DOM questions
  if (msg.includes('dom')) {
    return `🎯 **DOM Essentials**

\`\`\`javascript
// Select elements
const element = document.querySelector('#myId');

// Change content
element.textContent = 'New text';

// Add events
element.addEventListener('click', () => {
  console.log('Clicked!');
});
\`\`\`

What specific DOM operation do you need help with?`;
  }
  
  // JavaScript questions
  if (msg.includes('javascript') || msg.includes('js') || msg.includes('code') || msg.includes('program')) {
    return `🚀 **JavaScript Help**

I can help you with:
• **Todo/Task apps** - Complete working examples
• **Functions** and arrow functions  
• **Arrays** (map, filter, reduce)
• **DOM manipulation** - selecting, changing elements
• **Events** - clicks, inputs, keyboard
• **Async/await** and promises
• **Objects** and classes

**Popular requests:**
• "make a todo list" → Complete app with code
• "explain functions" → Core concepts
• "how to use arrays" → Practical examples
• "DOM manipulation" → Interactive tutorials

What specific JavaScript help do you need?`;
  }
  
  // General conversation responses
  const generalResponses = [
    `That's interesting! You said: "${message}". I'm MindSpark AI and I love helping with both coding and general conversation. What would you like to explore?`,
    
    `Great question! About "${message}" - I can help you with programming, web development, or just chat about topics that interest you. What's on your mind?`,
    
    `I see you mentioned "${message}". As MindSpark AI, I'm here to assist with JavaScript, HTML, CSS, or we can discuss whatever you'd like to talk about!`,
    
    `Interesting! "${message}" - I'm equipped to help with coding projects, explain programming concepts, or have general conversations. How can I assist you today?`
  ];
  
  return generalResponses[Math.floor(Math.random() * generalResponses.length)];
}

// ⏰ Format timestamp
function formatTimestamp(date = new Date()) {
  return date.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
}

// 💬 Enhanced add message function
function addMessage(sender, text, cls, timestamp = null, saveToHistory = true) {
  const currentTime = timestamp || new Date();
  const timeStr = typeof currentTime === 'string' ? currentTime : formatTimestamp(currentTime);
  
  const msg = document.createElement("div");
  msg.classList.add("message", cls);
  
  msg.innerHTML = `
    <div class="message-content">
      <div class="message-text">
        <strong>${sender}:</strong> ${text}
      </div>
      <div class="message-time">${timeStr}</div>
    </div>
  `;
  
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;

  // Save to conversation history
  if (saveToHistory) {
    conversationHistory.push({
      sender,
      text,
      type: cls,
      timestamp: timeStr
    });
    saveConversationHistory();
  }

  return msg;
}

// ⌨️ Show typing animation
function showTypingAnimation() {
  const typingMsg = document.createElement("div");
  typingMsg.classList.add("message", "bot", "typing-animation");
  
  typingMsg.innerHTML = `
    <div class="message-content">
      <div class="message-text">
        <strong>MindSpark AI:</strong> 
        <span class="typing-dots">
          <span>.</span><span>.</span><span>.</span>
        </span>
      </div>
      <div class="message-time">${formatTimestamp()}</div>
    </div>
  `;
  
  chatBox.appendChild(typingMsg);
  chatBox.scrollTop = chatBox.scrollHeight;
  
  return typingMsg;
}

// 🚀 Initialize everything when page loads
document.addEventListener("DOMContentLoaded", () => {
  initializeDarkMode();
  loadConversationHistory();
  
  // Focus on input
  input.focus();
  
  // Welcome message if no history
  if (conversationHistory.length === 0) {
    setTimeout(() => {
      addMessage("MindSpark AI", "👋 Welcome! I'm MindSpark AI. I can help you with programming, web development, or just have a friendly chat. What would you like to talk about?", "bot");
    }, 500);
  }
  
  console.log("🤖 MindSpark AI Standalone - Ready!");
});