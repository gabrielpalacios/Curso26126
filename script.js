
// Inicializar carrito desde localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Verificar estado de sesión al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const savedUser = sessionStorage.getItem("user");
    if (savedUser) {
        mostrarPanelUsuario(savedUser);
    }
    updateCart();
});

/* MENÚ HAMBURGUESA */
function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("show");
}

// Auto cerrar menú al hacer clic en nlace
const navLinks = document.querySelectorAll(".nav-links a");
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("navLinks").classList.remove("show");
    });
});

/* LOGIN CON SESSIONSTORAGE */
function login(){
    const user = document.getElementById("userLogin").value.trim();
    if(!user) return alert("Por favor, ingresá un nombre de usuario");

    sessionStorage.setItem("user", user);
    mostrarPanelUsuario(user);
}

function mostrarPanelUsuario(user) {
    document.getElementById("loginFormInline").style.display = "none";
    document.getElementById("userPanel").style.display = "inline-flex";
    document.getElementById("userName").textContent = `🎮 Hola, ${user}`;
}

function logout(){
    sessionStorage.removeItem("user");
    location.reload();
}

/* CARRITO CON LOCALSTORAGE */
function addToCart(name, price){
    // Verifica si el usuario inició sesión en sessionStorage
    if(!sessionStorage.getItem("user")){
        alert("Debes iniciar sesión para poder agregar productos al carrito.");
        return;
    }

    let item = cart.find(p => p.name === name);

    if(item){
        item.qty++;
    } else {
        cart.push({name, price, qty: 1});
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
    
    // Abre automaticamente el carrito para dar feedback visual
    document.getElementById("cartPanel").classList.add("open");
}

//actualiza el carrito en la interfaz
function updateCart(){
    const totalQty = cart.reduce((a, b) => a + b.qty, 0);
    document.getElementById("cartCount").textContent = totalQty;

    let list = document.getElementById("cartList");
    list.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        list.innerHTML = '<li class="empty-cart-msg">El carrito está vacío.</li>';
    } else {
        cart.forEach((p, i) => {
            total += p.price * p.qty;

            list.innerHTML += `
            <li>
                <div class="cart-item-info">
                    <span class="cart-item-name">${p.name}</span>
                    <span class="cart-item-qty">x${p.qty} - $${p.price * p.qty}</span>
                </div>
                <button onclick="removeItem(${i})" class="btn-remove-item" title="Eliminar artículo">×</button>
            </li>`;
        });
    }

    document.getElementById("cartTotal").textContent = total;
}

function removeItem(i){
    cart.splice(i, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function toggleCart(){
    document.getElementById("cartPanel").classList.toggle("open");
}

function checkout(){
    if (cart.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }
    alert("¡Muchas gracias por tu compra en RetroGames Store!");
    cart = [];
    localStorage.removeItem("cart");
    updateCart();
    toggleCart();
}
