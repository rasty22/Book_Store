let cart = [];
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartBox = document.getElementById("cartBox");
const totalElement = document.getElementById("total");

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    updateCartUI();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Add a book to cart
function addToCart(name, price) {
    const existing = cart.find(item => item.n === name);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ n: name, p: price, qty: 1 });
    }

    saveCart();
    updateCartUI();
    showNotification(`${name} added to cart!`);
}

// Remove book from cart
function removeFromCart(index) {
    const itemName = cart[index].n;
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
    showNotification(`${itemName} removed from cart!`);
}

// Clear entire cart
function clearCart() {
    if (confirm("Clear all items from cart?")) {
        cart = [];
        saveCart();
        updateCartUI();
        showNotification("Cart cleared!");
    }
}

// Checkout action
function checkout() {
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    let total = cart.reduce((sum, item) => sum + item.p * item.qty, 0);

    if (confirm(`Proceed to checkout? Total: $${total.toFixed(2)}`)) {
        cart = [];
        saveCart();
        updateCartUI();
        closeCart();
        showNotification("Order placed successfully!");
    }
}

// Update cart display
function updateCartUI() {
    cartCount.innerText = cart.reduce((sum, item) => sum + item.qty, 0);
    let total = 0;
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        document.getElementById("cartContent").style.display = "none";
        document.getElementById("emptyCart").style.display = "block";
    } else {
        document.getElementById("cartContent").style.display = "block";
        document.getElementById("emptyCart").style.display = "none";

        cart.forEach((item, index) => {
            const li = document.createElement("li");
            const subtotal = item.p * item.qty;
            total += subtotal;

            li.innerHTML = `
                <div class="cart-item">
                    <span>${item.n} x${item.qty}</span>
                    <span>$${subtotal.toFixed(2)}</span>
                    <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
                </div>
            `;

            cartItems.appendChild(li);
        });
    }

    totalElement.innerText = total.toFixed(2);
}

// Open/Close cart modal
function openCart() { cartBox.style.display = "block"; updateCartUI(); }
function closeCart() { cartBox.style.display = "none"; }

// Notification message
function showNotification(message) {
    const notif = document.getElementById("notification");
    notif.innerText = message;
    notif.style.display = "block";

    setTimeout(() => {
        notif.style.display = "none";
    }, 2000);
}

// Load cart when page loads
window.addEventListener("DOMContentLoaded", loadCart);
