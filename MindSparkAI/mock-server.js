import express from "express";
import cors from "cors";
import dotenv from "dotenv";

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

// ✅ Optional root route (so "Cannot GET /" won't appear)
app.get("/", (req, res) => {
  res.send("✅ MindSpark AI backend is running and ready!");
});

// ✅ Chat endpoint with smart mock AI
app.post("/api/chat", async (req, res) => {
  console.log("\n" + "=".repeat(50));
  console.log("🔵 NEW MESSAGE RECEIVED");
  console.log("🔵 Message:", req.body.message);
  console.log("🔵 From:", req.headers.origin);
  console.log("🔵 Time:", new Date().toLocaleTimeString());
  console.log("=".repeat(50));
  
  const { message } = req.body;

  // Smart mock AI responses
  console.log("🤖 Generating smart AI-like response...");
  const smartResponse = generateSmartResponse(message);
  
  console.log("🟢 SMART RESPONSE SENT:", smartResponse.substring(0, 50) + "...");
  console.log("=".repeat(50) + "\n");
  res.json({ reply: smartResponse });
});

// Enhanced Smart response generator function
function generateSmartResponse(message) {
  const msg = message.toLowerCase();
  
  // Advanced JavaScript functions explanation
  if (msg.includes('function') && msg.includes('javascript')) {
    return `🚀 **JavaScript Functions - Complete Guide**

Functions are the building blocks of JavaScript! Here's everything you need to know:

**1. Function Declaration:**
\`\`\`javascript
function calculateArea(width, height) {
    const area = width * height;
    console.log("Calculating area...");
    return area;
}

// Usage:
let result = calculateArea(10, 5); // Returns 50
\`\`\`

**2. Arrow Functions (Modern Way):**
\`\`\`javascript
const calculateArea = (width, height) => {
    return width * height;
};

// Short version:
const multiply = (a, b) => a * b;
\`\`\`

**3. Function with Default Parameters:**
\`\`\`javascript
function greetUser(name = "Friend", time = "day") {
    return \`Good \${time}, \${name}!\`;
}

console.log(greetUser()); // "Good day, Friend!"
console.log(greetUser("John", "morning")); // "Good morning, John!"
\`\`\`

**4. Functions in Real Projects:**
\`\`\`javascript
// Validate email
function isValidEmail(email) {
    return email.includes("@") && email.includes(".");
}

// Handle button clicks
function handleButtonClick() {
    document.getElementById("message").innerText = "Button clicked!";
    playSound();
}

// API calls
async function fetchUserData(userId) {
    const response = await fetch(\`/api/users/\${userId}\`);
    return await response.json();
}
\`\`\`

**Key Concepts:**
• **Parameters**: Input values (width, height)
• **Return**: Output value 
• **Scope**: Variables inside functions are private
• **Hoisting**: Function declarations are "moved" to the top

**Next Steps:** Try creating a function that takes your name and age, then returns a personalized message!`;
  }
  
  // Advanced function usage
  if ((msg.includes('how to use') || msg.includes('how do i use')) && (msg.includes('function') || msg.includes('them'))) {
    return `🎯 **How to Use JavaScript Functions - Step by Step**

**Step 1: Create Your First Function**
\`\`\`javascript
function sayHello(name) {
    return "Hello, " + name + "! Welcome to coding!";
}
\`\`\`

**Step 2: Call the Function**
\`\`\`javascript
let message = sayHello("Alex");
console.log(message); // "Hello, Alex! Welcome to coding!"
\`\`\`

**Step 3: Use in HTML (Interactive)**
\`\`\`html
<!DOCTYPE html>
<html>
<head><title>My App</title></head>
<body>
    <input type="text" id="nameInput" placeholder="Enter your name">
    <button onclick="greetUser()">Say Hello</button>
    <p id="output"></p>

    <script>
        function greetUser() {
            const name = document.getElementById("nameInput").value;
            const greeting = sayHello(name);
            document.getElementById("output").innerText = greeting;
        }
        
        function sayHello(name) {
            if (name === "") {
                return "Please enter your name!";
            }
            return "Hello, " + name + "! Welcome to coding!";
        }
    </script>
</body>
</html>
\`\`\`

**Step 4: Advanced Patterns**
\`\`\`javascript
// Multiple functions working together
function calculateTax(price, taxRate = 0.08) {
    return price * taxRate;
}

function calculateTotal(price, taxRate) {
    const tax = calculateTax(price, taxRate);
    return price + tax;
}

function formatCurrency(amount) {
    return "$" + amount.toFixed(2);
}

// Use them together:
const itemPrice = 100;
const total = calculateTotal(itemPrice, 0.1);
const formatted = formatCurrency(total);
console.log("Total: " + formatted); // "Total: $110.00"
\`\`\`

**Pro Tips:**
• Always use descriptive function names
• Keep functions small and focused on one task
• Test your functions with different inputs
• Use console.log() to debug

**Challenge:** Create a function that checks if a number is even or odd!`;
  }
  
  // Programming concepts
  if (msg.includes('variable') || msg.includes('loop') || msg.includes('array') || msg.includes('object')) {
    return `💡 **JavaScript Fundamentals**

Based on your question about "${message}", here's what you need to know:

**Variables (Data Storage):**
\`\`\`javascript
let name = "John";           // String
let age = 25;               // Number
let isStudent = true;       // Boolean
let hobbies = ["reading", "coding"]; // Array
let person = {name: "John", age: 25}; // Object
\`\`\`

**Arrays (Lists of Data):**
\`\`\`javascript
let fruits = ["apple", "banana", "orange"];

// Add items
fruits.push("grape");

// Loop through items
fruits.forEach(function(fruit) {
    console.log("I like " + fruit);
});

// Find specific item
let banana = fruits.find(fruit => fruit === "banana");
\`\`\`

**Loops (Repeat Actions):**
\`\`\`javascript
// For loop
for (let i = 0; i < 5; i++) {
    console.log("Count: " + i);
}

// While loop
let count = 0;
while (count < 3) {
    console.log("While count: " + count);
    count++;
}
\`\`\`

**Objects (Complex Data):**
\`\`\`javascript
let student = {
    name: "Sarah",
    grade: "A",
    subjects: ["Math", "Science"],
    getInfo: function() {
        return this.name + " has grade " + this.grade;
    }
};

console.log(student.getInfo()); // "Sarah has grade A"
\`\`\`

What specific concept would you like me to explain in more detail?`;
  }
  
  // HTML and CSS help
  if (msg.includes('html') || msg.includes('css') || msg.includes('styling') || msg.includes('website')) {
    return `🎨 **Web Development Help**

You mentioned: "${message}". Here's how to build modern websites:

**HTML Structure:**
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Awesome Website</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section id="hero">
            <h1>Welcome to My Site</h1>
            <p>This is an amazing website!</p>
            <button onclick="showMessage()">Click Me!</button>
        </section>
    </main>
    
    <script src="script.js"></script>
</body>
</html>
\`\`\`

**CSS Styling:**
\`\`\`css
/* Modern, responsive design */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
}

header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 1rem 0;
}

nav ul {
    display: flex;
    justify-content: center;
    list-style: none;
}

nav li {
    margin: 0 20px;
}

nav a {
    color: white;
    text-decoration: none;
    transition: opacity 0.3s;
}

nav a:hover {
    opacity: 0.8;
}

#hero {
    text-align: center;
    padding: 4rem 2rem;
    background: #f4f4f4;
}

button {
    background: #667eea;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: transform 0.2s;
}

button:hover {
    transform: translateY(-2px);
}
\`\`\`

**JavaScript Interaction:**
\`\`\`javascript
function showMessage() {
    alert("Hello! You clicked the button!");
}

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
\`\`\`

Want help with a specific part of web development?`;
  }
  
  // Error handling and debugging
  if (msg.includes('error') || msg.includes('bug') || msg.includes('debug') || msg.includes('not working')) {
    return `🐛 **Debugging Help - Let's Fix This!**

You mentioned: "${message}". Here's how to debug like a pro:

**Common JavaScript Errors & Solutions:**

**1. TypeError: Cannot read property**
\`\`\`javascript
// ❌ Error:
let user = null;
console.log(user.name); // TypeError!

// ✅ Solution:
if (user && user.name) {
    console.log(user.name);
}
// Or use optional chaining:
console.log(user?.name);
\`\`\`

**2. ReferenceError: Variable not defined**
\`\`\`javascript
// ❌ Error:
console.log(myVariable); // ReferenceError!

// ✅ Solution:
let myVariable = "Hello World";
console.log(myVariable);
\`\`\`

**3. Function not working**
\`\`\`javascript
// ❌ Problem:
function calculate() {
    let result = 5 + 3;
    // Forgot to return!
}

// ✅ Solution:
function calculate() {
    let result = 5 + 3;
    return result; // Always return values!
}
\`\`\`

**Debugging Tools:**
\`\`\`javascript
// 1. Console logging
console.log("Debug: variable value is", myVariable);

// 2. Type checking
console.log("Type of myVariable:", typeof myVariable);

// 3. Check if element exists
let element = document.getElementById("myButton");
if (element) {
    console.log("Element found!");
} else {
    console.log("Element not found - check your HTML!");
}

// 4. Try-catch for error handling
try {
    let result = riskyOperation();
    console.log("Success:", result);
} catch (error) {
    console.log("Error occurred:", error.message);
}
\`\`\`

**Browser DevTools (F12):**
• **Console**: See errors and log messages
• **Elements**: Inspect HTML/CSS
• **Sources**: Set breakpoints in code
• **Network**: Check API calls

What specific error are you getting? Share the error message and I'll help you fix it!`;
  }
  
  // Greeting responses
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
    return `👋 **Hello! I'm MindSpark AI - Your Coding Mentor**

I'm here to help you become an amazing developer! I can assist with:

🎯 **JavaScript Mastery**
• Functions, variables, arrays, objects
• DOM manipulation and events
• Async/await and API calls
• Modern ES6+ features

🎨 **Web Development**
• HTML structure and semantic markup
• CSS styling and responsive design
• Interactive user interfaces
• Form handling and validation

🐛 **Problem Solving**
• Debugging techniques and tools
• Code optimization tips
• Best practices and patterns
• Project architecture advice

💡 **Learning Path**
• Step-by-step tutorials
• Practical coding examples
• Real-world project ideas
• Career guidance

**What would you like to learn today?** Just ask me anything like:
• "How do I create an interactive website?"
• "Explain JavaScript promises"
• "Help me debug this error"
• "Show me how to style buttons with CSS"

I give detailed explanations with working code examples! 🚀`;
  }
  
  // How are you responses
  if (msg.includes('how are you') || msg.includes('how do you')) {
    return `🤖 **I'm doing fantastic, thanks for asking!**

I'm energized and ready to help you with any coding challenges! I love helping developers learn and grow.

**What I'm great at:**
• Breaking down complex concepts into simple steps
• Providing working code examples you can actually use
• Debugging errors and explaining what went wrong
• Teaching modern web development best practices
• Giving practical project ideas to build your skills

**What are you working on today?** 
• Building a new website?
• Learning a specific JavaScript concept?
• Stuck on a coding problem?
• Planning your next development project?

I'm here to help you succeed! What coding adventure should we tackle together? 🚀`;
  }
  
  // Default intelligent response
  return `🧠 **Interesting! Let me help you with that.**

You said: "${message}"

I'm MindSpark AI, your personal coding mentor! I specialize in:

**🎯 JavaScript & Web Development**
• Interactive websites and web apps
• Modern JavaScript (ES6+, async/await, modules)
• DOM manipulation and event handling
• API integration and data handling

**🎨 Frontend Technologies**
• HTML5 semantic structure
• CSS3 animations and responsive design
• User experience (UX) best practices
• Accessibility and performance optimization

**🔧 Problem Solving**
• Code debugging and optimization
• Architecture and design patterns
• Testing and quality assurance
• Deployment and hosting strategies

**To give you the BEST help, could you be more specific?** For example:
• "How do I make a responsive navigation menu?"
• "Explain how JavaScript closures work"
• "Help me build a todo list app"
• "Why isn't my CSS animation working?"

The more specific your question, the more detailed and helpful my answer will be! 

**What coding challenge can I help you solve today?** 🚀`;
}

// ✅ Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ MindSpark AI backend running on http://127.0.0.1:${PORT}`);
  console.log("🤖 Running in SMART MOCK mode");
  console.log("💰 To enable real OpenAI: Add API credits at https://platform.openai.com/settings/organization/billing");
});