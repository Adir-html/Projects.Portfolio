// 🎯 MindSpark AI - Enhanced with Memory, Animations & Dark Mode
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

  try {
    console.log("🔵 Sending request to server...");
    const res = await fetch("http://127.0.0.1:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    console.log("🔵 Response status:", res.status);
    
    if (!res.ok) {
      throw new Error(`Server responded with status: ${res.status}`);
    }

    const data = await res.json();
    console.log("🟢 Response data:", data);
    
    // Remove typing animation and add real response
    typingMsg.remove();
    addMessage("MindSpark AI", data.reply, "bot");
    
  } catch (err) {
    console.error("❌ Full error details:", err);
    typingMsg.remove();
    addMessage("MindSpark AI", `⚠️ Error: ${err.message}`, "bot");
  }
});

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
  
  console.log("🤖 MindSpark AI Enhanced - Ready!");
});