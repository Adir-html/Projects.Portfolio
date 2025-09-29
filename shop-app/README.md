# 🛒 E-Commerce Shop Application

A modern, full-stack e-commerce application with a sleek UI and complete product management system.

## 🚀 Live Demo
- **Local Development:** `http://localhost:5000`
- **Production:** Deploy to [Railway](https://railway.app) for free hosting

## ✨ Features

### 🎨 Frontend
- **Responsive Design:** Works perfectly on desktop, tablet, and mobile
- **Dark Theme:** Modern dark UI with premium styling
- **Product Grid:** Beautiful card-based layout with hover animations
- **Admin Panel:** Easy-to-use form for adding/editing products
- **Real-time Updates:** Dynamic loading and updates without page refresh
- **Form Validation:** Input validation with user-friendly error messages

### ⚙️ Backend
- **RESTful API:** Full CRUD operations (Create, Read, Update, Delete)
- **Express Server:** Fast and lightweight Node.js backend
- **CORS Enabled:** Cross-origin resource sharing for API access
- **JSON Middleware:** Proper request/response handling
- **Environment Variables:** Production-ready configuration

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)** - Async/await, fetch API, DOM manipulation

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **CORS** - Cross-origin resource sharing

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Local Development
1. Clone the repository
```bash
git clone https://github.com/Adir-html/Projects.Portfolio.git
cd Projects.Portfolio/shop-app
```

2. Install dependencies
```bash
npm install
```

3. Start the server
```bash
npm start
```

4. Open your browser and go to `http://localhost:5000`

## 🌐 Deployment

### Deploy to Railway (Recommended)
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "Deploy from GitHub repo"
4. Select this repository
5. Railway will automatically detect Node.js and deploy!

### Deploy to Other Platforms
- **Heroku:** Use the same `package.json` configuration
- **Vercel:** Works out of the box
- **Netlify:** Perfect for static hosting with serverless functions

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| POST | `/api/products` | Create new product |
| PUT | `/api/products/:id` | Update existing product |
| DELETE | `/api/products/:id` | Delete product |

### Example API Usage
```javascript
// Get all products
fetch('/api/products')
  .then(response => response.json())
  .then(products => console.log(products));

// Add new product
fetch('/api/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'New Product',
    price: 29.99,
    image: 'https://example.com/image.jpg',
    description: 'Product description'
  })
});
```

## 📁 Project Structure
```
shop-app/
├── package.json          # Dependencies and scripts
├── server.js             # Express server
├── public/               # Frontend files
│   ├── index.html        # Main HTML file
│   ├── style.css         # Styling
│   └── app.js           # Frontend JavaScript
└── README.md            # This file
```

## 🎯 Key Learning Points
- **Full-Stack Development:** Complete frontend-backend integration
- **RESTful API Design:** Proper HTTP methods and status codes
- **Async JavaScript:** Modern async/await patterns
- **Responsive Design:** Mobile-first CSS approach
- **Git Workflow:** Version control and deployment
- **Production Deployment:** Environment configuration

## 🔮 Future Enhancements
- [ ] User authentication and login system
- [ ] Shopping cart functionality
- [ ] Payment integration (Stripe/PayPal)
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Image upload functionality
- [ ] Product categories and search
- [ ] Order management system
- [ ] Email notifications

## 👨‍💻 Author
**Adir Shohat** - Aspiring Full-Stack Developer from Israel 🇮🇱

- 🔗 [GitHub](https://github.com/Adir-html)
- 🔗 [LinkedIn](https://www.linkedin.com/in/adir-shohat)
- 📧 [Email](mailto:adirshohat1@gmail.com)

## 📄 License
This project is open source and available under the [MIT License](LICENSE).

---

⭐ **If you found this project helpful, please give it a star!** ⭐