console.log("🚀 Fresh app.js loaded - No cache issues!");

// DOM Elements
const form = document.getElementById("product-form");
const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const imageInput = document.getElementById("image");
const descriptionInput = document.getElementById("description");
const productsContainer = document.getElementById("products-container");

// Products array
let products = [];
let editingId = null;

console.log("Form elements found:");
console.log("Form:", form);
console.log("Products container:", productsContainer);

// Render products on the page
function renderProducts() {
  console.log("Rendering products:", products);
  productsContainer.innerHTML = "";
  
  if (products.length === 0) {
    console.log("No products to display");
    productsContainer.innerHTML = "<p class='empty-message'>No products available. Add some products using the form above!</p>";
    return;
  }
  
  products.forEach(product => {
    console.log("Rendering product:", product);
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="price-and-buttons">
          <span class="product-price">$${product.price}</span>
          <div class="card-buttons">
            <button class="btn-edit">Edit</button>
            <button class="btn-delete">Delete</button>
          </div>
        </div>
      </div>
    `;

    const editBtn = card.querySelector(".btn-edit");
    const deleteBtn = card.querySelector(".btn-delete");

    editBtn.addEventListener("click", () => startEditProduct(product.id));
    deleteBtn.addEventListener("click", () => deleteProduct(product.id));

    productsContainer.appendChild(card);
  });
}

// Load products from backend
async function loadProducts() {
  try {
    console.log("Loading products from backend...");
    const res = await fetch("/api/products");
    console.log("Load products response status:", res.status);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    products = await res.json();
    console.log("Loaded products:", products);
    renderProducts();
  } catch (err) {
    console.error("Error loading products:", err);
  }
}

// Add product to backend
async function addProduct(product) {
  try {
    console.log("Adding product:", product);
    console.log("Making POST request to /api/products");
    
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(product)
    });
    
    console.log("Add product response status:", res.status);
    console.log("Add product response headers:", [...res.headers.entries()]);
    
    if (!res.ok) {
      console.error("Server error response status:", res.status);
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const newProduct = await res.json();
    console.log("New product received:", newProduct);
    products.push(newProduct);
    renderProducts();
    console.log("Product added successfully");
    
    return newProduct;
  } catch (err) {
    console.error("Error adding product:", err);
    alert("Error adding product: " + err.message);
    throw err;
  }
}

// Edit product functions
function startEditProduct(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  
  editingId = id;
  nameInput.value = product.name;
  priceInput.value = product.price;
  imageInput.value = product.image;
  descriptionInput.value = product.description;
  
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.textContent = "Update Product";
  form.classList.add("is-editing");
}

function cancelEdit() {
  editingId = null;
  form.reset();
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.textContent = "Add Product";
  form.classList.remove("is-editing");
}

// Delete product
async function deleteProduct(id) {
  if (!confirm("Are you sure you want to delete this product?")) return;
  
  try {
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    products = products.filter(p => p.id !== id);
    renderProducts();
  } catch (err) {
    console.error("Error deleting product:", err);
    alert("Error deleting product: " + err.message);
  }
}

// Form submission handler
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Form submitted!");

    const productData = {
      name: nameInput.value.trim(),
      price: parseFloat(priceInput.value),
      image: imageInput.value.trim(),
      description: descriptionInput.value.trim()
    };

    console.log("Form data collected:", productData);

    // Validate data
    if (!productData.name || !productData.price || !productData.image) {
      alert("Please fill in all required fields (name, price, image)");
      return;
    }

    try {
      if (editingId) {
        // Update existing product
        const res = await fetch(`/api/products/${editingId}`, {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(productData)
        });
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const updatedProduct = await res.json();
        const index = products.findIndex(p => p.id === editingId);
        if (index !== -1) {
          products[index] = updatedProduct;
          renderProducts();
        }
        cancelEdit();
      } else {
        // Add new product
        await addProduct(productData);
        form.reset();
      }
      console.log("Form submission successful");
    } catch (error) {
      console.error("Form submission failed:", error);
    }
  });
} else {
  console.error("Form not found!");
}

// Clear all products
document.getElementById("clear-all")?.addEventListener("click", async () => {
  if (!confirm("Are you sure you want to delete ALL products?")) return;
  
  try {
    const res = await fetch("/api/products", { method: "DELETE" });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    products = [];
    renderProducts();
  } catch (err) {
    console.error("Error clearing products:", err);
    alert("Error clearing products: " + err.message);
  }
});

// Debug functions for buttons
window.testAPI = async function() {
  console.log("Testing API connection...");
  try {
    const response = await fetch("/api/products");
    console.log("API test - Response status:", response.status);
    const data = await response.json();
    console.log("API test - Response data:", data);
    alert(`API working! Status: ${response.status}, Products: ${data.length}`);
  } catch (error) {
    console.error("API test failed:", error);
    alert("API test failed: " + error.message);
  }
};

window.addTestProduct = async function() {
  console.log("Adding test product...");
  const testProduct = {
    name: "Test Product " + Date.now(),
    price: 19.99,
    image: "https://via.placeholder.com/300x200/ff6b6b/ffffff?text=Test+Product",
    description: "This is a test product created by the debug button."
  };
  
  try {
    await addProduct(testProduct);
    alert("Test product added successfully!");
  } catch (error) {
    console.error("Test product failed:", error);
  }
};

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, starting initialization...");
  loadProducts();
});

console.log("Fresh app.js script fully loaded!");