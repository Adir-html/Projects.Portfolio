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

console.log("🤖 Initializing Super Smart AI system...");
console.log("🔑 Groq API Key:", process.env.GROQ_API_KEY ? "✅ Found" : "❌ Missing");

app.get("/", (req, res) => {
  res.send("✅ MindSpark AI Super Smart backend is running!");
});

// ✅ Super Smart Chat endpoint
app.post("/api/chat", async (req, res) => {
  console.log("\n" + "🚀".repeat(20));
  console.log("🔵 NEW MESSAGE:", req.body.message);
  console.log("🔵 Time:", new Date().toLocaleTimeString());
  console.log("🚀".repeat(20));
  
  const { message } = req.body;

  // Try Groq first (with better error handling)
  const groqResponse = await tryGroqAI(message);
  if (groqResponse) {
    console.log("✅ GROQ SUCCESS!");
    console.log("🚀".repeat(20) + "\n");
    return res.json({ reply: groqResponse });
  }

  // Fallback to SUPER SMART local AI
  console.log("🧠 Using SUPER SMART local AI...");
  const smartResponse = generateSuperSmartResponse(message);
  console.log("✅ SUPER SMART RESPONSE READY!");
  console.log("🚀".repeat(20) + "\n");
  res.json({ reply: smartResponse });
});

// ✅ Enhanced Groq Integration
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
        model: "llama-3.1-8b-instant", // Updated to current model
        messages: [
          {
            role: "system",
            content: "You are MindSpark AI, an expert programming mentor and web development tutor. You are enthusiastic, detailed, and always provide practical working code examples. Format responses with markdown, use emojis, and make learning fun! Always include step-by-step instructions and real-world examples."
          },
          { 
            role: "user", 
            content: message 
          }
        ],
        max_tokens: 1000,
        temperature: 0.8,
        top_p: 0.9,
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

// ✅ SUPER SMART Local AI
function generateSuperSmartResponse(message) {
  const msg = message.toLowerCase();
  
  // DOM Manipulation - Expert Level
  if (msg.includes('dom') && (msg.includes('manipulation') || msg.includes('javascript'))) {
    return `🎯 **DOM Manipulation - Complete Expert Guide**

DOM (Document Object Model) is your gateway to making websites interactive! Let me show you everything:

**🎪 1. Element Selection (The Foundation):**
\`\`\`javascript
// Modern selectors (use these!)
const button = document.querySelector('#submit-btn');
const items = document.querySelectorAll('.menu-item');
const firstParagraph = document.querySelector('p');

// Legacy selectors (still useful)
const element = document.getElementById('header');
const collection = document.getElementsByClassName('active');
\`\`\`

**🎨 2. Content Manipulation:**
\`\`\`javascript
// Change text content (safe, no HTML)
element.textContent = 'New safe text';

// Change HTML content (powerful, but be careful)
element.innerHTML = '<strong>Bold text</strong>';

// Change attributes
const image = document.querySelector('#hero-image');
image.src = 'new-image.jpg';
image.alt = 'Updated description';
image.setAttribute('data-loaded', 'true');
\`\`\`

**⚡ 3. Event Handling (Make it Interactive!):**
\`\`\`javascript
// Click events
button.addEventListener('click', function(event) {
    console.log('Button clicked!', event);
    // Prevent default behavior if needed
    event.preventDefault();
});

// Modern arrow function syntax
button.addEventListener('click', (e) => {
    console.log('Modern click handler');
});

// Multiple event types
const input = document.querySelector('#username');
input.addEventListener('focus', () => console.log('Input focused'));
input.addEventListener('blur', () => console.log('Input lost focus'));
input.addEventListener('input', (e) => console.log('Value:', e.target.value));
\`\`\`

**🏗️ 4. Creating and Adding Elements:**
\`\`\`javascript
// Create new elements dynamically
function addTodoItem(text) {
    const todoItem = document.createElement('div');
    todoItem.className = 'todo-item';
    todoItem.innerHTML = \`
        <span class="todo-text">\${text}</span>
        <button class="delete-btn" onclick="deleteTodo(this)">❌</button>
        <button class="complete-btn" onclick="completeTodo(this)">✅</button>
    \`;
    
    // Add to the DOM
    document.getElementById('todo-list').appendChild(todoItem);
}

// Alternative insertion methods
const container = document.querySelector('.container');
container.insertAdjacentHTML('beforeend', '<p>Added at the end</p>');
container.insertAdjacentHTML('afterbegin', '<p>Added at the beginning</p>');
\`\`\`

**🎮 5. Real-World Interactive Example - Smart Todo App:**
\`\`\`javascript
class TodoApp {
    constructor() {
        this.todos = [];
        this.init();
    }
    
    init() {
        const addBtn = document.querySelector('#add-todo');
        const input = document.querySelector('#todo-input');
        
        addBtn.addEventListener('click', () => this.addTodo());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });
        
        this.render();
    }
    
    addTodo() {
        const input = document.querySelector('#todo-input');
        const text = input.value.trim();
        
        if (text) {
            this.todos.push({
                id: Date.now(),
                text: text,
                completed: false
            });
            input.value = '';
            this.render();
        }
    }
    
    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.render();
        }
    }
    
    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.render();
    }
    
    render() {
        const container = document.querySelector('#todo-list');
        container.innerHTML = '';
        
        this.todos.forEach(todo => {
            const item = document.createElement('div');
            item.className = \`todo-item \${todo.completed ? 'completed' : ''}\`;
            item.innerHTML = \`
                <span onclick="app.toggleTodo(\${todo.id})">\${todo.text}</span>
                <button onclick="app.deleteTodo(\${todo.id})">Delete</button>
            \`;
            container.appendChild(item);
        });
    }
}

// Initialize the app
const app = new TodoApp();
\`\`\`

**🎯 Next Challenge:** Try building this todo app! What specific DOM technique would you like to master next?`;
  }
  
  // JavaScript Functions - Master Class
  if (msg.includes('function') && msg.includes('javascript')) {
    return `🚀 **JavaScript Functions - Master Class Tutorial**

Functions are the building blocks of all programming! Let me teach you everything:

**🎯 1. Function Declaration (Classic Way):**
\`\`\`javascript
function calculateTotalPrice(price, taxRate = 0.08, discount = 0) {
    console.log(\`Calculating: $\${price} with \${taxRate * 100}% tax\`);
    
    const taxAmount = price * taxRate;
    const discountAmount = price * discount;
    const total = price + taxAmount - discountAmount;
    
    return {
        subtotal: price,
        tax: taxAmount,
        discount: discountAmount,
        total: total
    };
}

// Usage
const receipt = calculateTotalPrice(100, 0.1, 0.05);
console.log(receipt);
// { subtotal: 100, tax: 10, discount: 5, total: 105 }
\`\`\`

**⚡ 2. Arrow Functions (Modern Way):**
\`\`\`javascript
// Long form with multiple statements
const processOrder = (items) => {
    const total = items.reduce((sum, item) => sum + item.price, 0);
    const tax = total * 0.08;
    return { total, tax, grandTotal: total + tax };
};

// Short form for simple operations
const double = x => x * 2;
const isEven = num => num % 2 === 0;
const formatCurrency = amount => \`$\${amount.toFixed(2)}\`;

// Array processing (super useful!)
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((total, n) => total + n, 0);
\`\`\`

**🎪 3. Higher-Order Functions (Advanced!):**
\`\`\`javascript
// Function that returns a function
function createValidator(minLength) {
    return function(input) {
        return {
            isValid: input.length >= minLength,
            message: input.length >= minLength 
                ? 'Valid!' 
                : \`Must be at least \${minLength} characters\`
        };
    };
}

// Create specific validators
const validatePassword = createValidator(8);
const validateUsername = createValidator(3);

console.log(validatePassword('abc')); // { isValid: false, message: "Must be at least 8 characters" }
console.log(validatePassword('mypassword123')); // { isValid: true, message: "Valid!" }
\`\`\`

**🌟 4. Async Functions (Modern JavaScript):**
\`\`\`javascript
// Fetch data from an API
async function fetchUserProfile(userId) {
    try {
        console.log(\`Fetching user \${userId}...\`);
        
        const response = await fetch(\`https://api.example.com/users/\${userId}\`);
        
        if (!response.ok) {
            throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        
        const userData = await response.json();
        console.log('User data received:', userData);
        
        return userData;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        return null;
    }
}

// Usage with error handling
fetchUserProfile(123)
    .then(user => {
        if (user) {
            displayUserProfile(user);
        } else {
            showErrorMessage('Failed to load user profile');
        }
    });
\`\`\`

**🏆 5. Real-World Example - Form Validation System:**
\`\`\`javascript
class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.rules = {};
        this.init();
    }
    
    // Add validation rules
    addRule(fieldName, validator, message) {
        if (!this.rules[fieldName]) {
            this.rules[fieldName] = [];
        }
        this.rules[fieldName].push({ validator, message });
        return this; // Enable chaining
    }
    
    // Validate single field
    validateField(fieldName, value) {
        const fieldRules = this.rules[fieldName] || [];
        const errors = [];
        
        fieldRules.forEach(rule => {
            if (!rule.validator(value)) {
                errors.push(rule.message);
            }
        });
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
    
    // Validate entire form
    validate() {
        const formData = new FormData(this.form);
        const results = {};
        let isFormValid = true;
        
        for (const [fieldName, value] of formData.entries()) {
            const result = this.validateField(fieldName, value);
            results[fieldName] = result;
            if (!result.isValid) {
                isFormValid = false;
            }
        }
        
        return {
            isValid: isFormValid,
            fields: results
        };
    }
    
    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            const result = this.validate();
            
            if (result.isValid) {
                console.log('Form is valid! Submitting...');
                this.onSubmit();
            } else {
                this.showErrors(result.fields);
            }
        });
    }
    
    showErrors(fields) {
        Object.entries(fields).forEach(([fieldName, result]) => {
            const field = this.form.querySelector(\`[name="\${fieldName}"]\`);
            const errorDiv = field.nextElementSibling;
            
            if (!result.isValid) {
                errorDiv.textContent = result.errors[0];
                errorDiv.style.display = 'block';
            } else {
                errorDiv.style.display = 'none';
            }
        });
    }
}

// Usage
const validator = new FormValidator('registration-form');

validator
    .addRule('email', 
        value => value.includes('@') && value.includes('.'), 
        'Please enter a valid email address')
    .addRule('password', 
        value => value.length >= 8, 
        'Password must be at least 8 characters')
    .addRule('password', 
        value => /[A-Z]/.test(value), 
        'Password must contain at least one uppercase letter');
\`\`\`

**🎯 Challenge:** Try building this form validator! What function concept would you like to explore next?`;
  }
  
  // Programming help - comprehensive
  if (msg.includes('code') || msg.includes('program') || msg.includes('javascript') || msg.includes('help')) {
    return `💻 **Programming Expert at Your Service!**

You mentioned: "${message}". I'm here to make you an amazing developer!

**🚀 Core Specialties:**

**JavaScript Mastery:**
• ⚡ Modern ES6+ features (destructuring, spread/rest operators)
• 🎯 Functions, closures, and scope management
• 🌐 DOM manipulation and event handling
• 🔄 Async programming (Promises, async/await)
• 📦 Modules and code organization

**Web Development:**
• 🏗️ HTML5 semantic structure and accessibility
• 🎨 CSS3 animations, flexbox, and grid layouts
• 📱 Responsive design and mobile-first approach
• 🎮 Interactive UI components and user experience

**Real-World Projects:**
• 📝 Todo applications with local storage
• 🌤️ Weather dashboards with API integration
• 🛒 Shopping carts with payment processing
• 🎯 Interactive games and animations

**🎯 Quick-Start Examples:**

**Dynamic Content Loading:**
\`\`\`javascript
async function loadContent(url) {
    const loading = document.querySelector('#loading');
    loading.style.display = 'block';
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayContent(data);
    } catch (error) {
        showError('Failed to load content');
    } finally {
        loading.style.display = 'none';
    }
}
\`\`\`

**Interactive Form Handler:**
\`\`\`javascript
document.querySelector('#contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const result = await submitForm(formData);
    if (result.success) {
        showSuccess('Message sent!');
        e.target.reset();
    } else {
        showError(result.error);
    }
});
\`\`\`

**🔥 What Would You Like to Build?**
• "Show me how to create a responsive navbar"
• "Help me build a weather app"
• "Teach me JavaScript array methods"
• "Create an interactive image gallery"

**💡 Pro Tips:**
• Always start with a clear plan
• Break complex problems into smaller parts
• Test your code frequently
• Use browser developer tools for debugging

What specific coding challenge should we tackle together? I'll provide complete, working examples! 🚀`;
  }
  
  // Default response - super engaging
  return `🧠 **Super Smart AI Ready for Action!**

Hey there! You said: "${message}"

I'm MindSpark AI, and I'm supercharged with programming knowledge! I love helping developers at all levels.

**🎯 I'm a Master of:**

**🔥 JavaScript Development:**
• Modern ES6+ syntax and features
• DOM manipulation and interactive UIs
• Async programming and API integration
• Functional programming patterns

**🎨 Web Technologies:**
• HTML5 semantic markup
• CSS3 animations and responsive design
• Modern layout systems (Flexbox, Grid)
• Progressive Web Apps (PWAs)

**🛠️ Development Tools:**
• Debugging techniques and browser DevTools
• Code optimization and performance
• Testing strategies and best practices
• Project architecture and organization

**💡 Learning Philosophy:**
• Hands-on coding with real examples
• Step-by-step problem breakdown
• Real-world project experience
• Industry best practices

**🚀 Try These Specific Questions:**
• "How do I create a responsive image gallery?"
• "Teach me about JavaScript promises and async/await"
• "Show me how to build a todo app with local storage"
• "Help me understand CSS Grid vs Flexbox"
• "Create an interactive shopping cart"

**🎯 Challenge Mode:**
Give me a specific coding problem and I'll provide:
• Complete working code examples
• Step-by-step explanations
• Best practice recommendations
• Real-world applications

What amazing project should we build together today? 🚀✨`;
}

// ✅ Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ MindSpark AI Super Smart backend running on http://127.0.0.1:${PORT}`);
  console.log("🚀 Super Smart AI system ready!");
  console.log("🔥 Try asking about JavaScript, DOM manipulation, or any coding topic!");
});