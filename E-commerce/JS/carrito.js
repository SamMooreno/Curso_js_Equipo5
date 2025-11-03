function verificarSesionActiva() {
  const usuario = localStorage.getItem("nombre");
  const paginaActual = window.location.pathname.split("/").pop();

  if (!usuario && paginaActual === "carrito.html") {
    alert("Debes iniciar sesión para acceder al carrito.");
    window.location.href = "index.html";
  }
}

// ============================
// Al cargar la página

document.addEventListener("DOMContentLoaded", () => {
  verificarSesionActiva(); 

  const carrito = JSON.parse(localStorage.getItem("cart")) || [];
  getCart(carrito);
  total(carrito);
});

// ============================
//  Renderiza los productos del carrito

function getCart(cards) {
  const contenedor = document.querySelector("#carrito-contenedor");

  if (!cards.length) {
    contenedor.innerHTML = `<p class="text-muted text-center mt-3">Tu carrito está vacío </p>`;
    return;
  }

  const list = cards
    .map(
      (card) => `
      <div class="card border shadow-sm mb-3">
        <div class="card-body">
          <div class="d-flex align-items-start border-bottom pb-3">
            <div class="me-4">
              <img src="${card.product.imagen}" class="img-fluid rounded" alt="${card.product.nombre}" width="100" style="height: 100px; object-fit: cover;">
            </div>
            <div class="flex-grow-1 overflow-hidden">
              <h5 class="text-truncate font-size-18">${card.product.nombre}</h5>
              <div class="row">
                <div class="col-md-4">
                  <p class="text-muted mb-1">Precio</p>
                  <h5>$${card.product.precio}</h5>
                </div>
                <div class="col-md-4">
                  <p class="text-muted mb-1">Cantidad</p>
                  <h5>${card.quantity}</h5>
                </div>
                <div class="col-md-3">
                  <p class="text-muted mb-1">Total</p>
                  <h5>$${card.product.precio * card.quantity}</h5>
                </div>
                <div class="col-md-1 text-end">
                  <p class="text-muted mb-1">Eliminar</p>
                  <button class="btn btn-sm btn-outline-danger" onclick="removeItem(${card.product.id})">X</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
    )
    .join("");

  contenedor.innerHTML = list;
}

// ============================
//  Calcula el total general
function total(cards) {
  const cartTotal = document.querySelector("#cart-total");
  const totalValue = cards.reduce(
    (acc, item) => acc + item.product.precio * item.quantity,
    0
  );
  cartTotal.textContent = "$" + totalValue;
}

// ============================
//  Eliminar un producto

function removeItem(id) {
  let cards = JSON.parse(localStorage.getItem("cart")) || [];
  const newCart = cards.filter((item) => item.product.id !== id);
  localStorage.setItem("cart", JSON.stringify(newCart));
  getCart(newCart);
  total(newCart);
}

// ============================
//  Vaciar el carrito completo

function clearCart() {
  localStorage.setItem("cart", JSON.stringify([]));
  getCart([]);
  total([]);
}

// ============================
//  Botón: Vaciar carrito

document.querySelector("#vaciar-carrito").addEventListener("click", clearCart);