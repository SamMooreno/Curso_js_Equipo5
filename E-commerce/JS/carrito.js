document.addEventListener("DOMContentLoaded", () => {
    
    // VERIFICACIÓN DE SESIÓN
    if (localStorage.getItem("session") !== "si") {
        alert("Debes iniciar sesión para ver tu carrito.");
        window.location.href = "login.html";
        return; 
    }
    cargarYRenderizarCarrito();

 document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#vaciar-carrito").addEventListener("click", vaciarCarritoConConfirmacion);

    document.querySelector("#finalizar-compra").addEventListener("click", finalizarCompra);
});


// -----------------------------
// FINALIZAR COMPRA (ENVÍA A MOCKAPI)
// -----------------------------
async function finalizarCompra() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const user = localStorage.getItem("nombre") || "usuario";

    if (carrito.length === 0) return;

    try {
        const response = await fetch("https://691b71d82d8d78557572da59.mockapi.io/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                createdAt: new Date().toISOString(),
                user: user,
                items: carrito
            })
        });

        if (!response.ok) throw new Error("Error en la orden");

        const data = await response.json();

        Swal.fire({
            icon: 'success',
            title: '¡Orden creada!',
            html: `Usuario: <b>${data.user}</b><br>Número de orden: <b>${data.id}</b>`
        });

        limpiarCarritoAutomaticamente();

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error al crear la orden',
            text: 'Intenta de nuevo más tarde'
        });
    }
}



// -----------------------------
// CARGAR Y RENDERIZAR CARRITO
// -----------------------------
async function cargarYRenderizarCarrito() {
    const carritoContenedor = document.querySelector("#carrito-contenedor");
    const btnVaciar = document.querySelector("#vaciar-carrito");
    const btnFinalizar = document.querySelector("#finalizar-compra");

    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carritoGuardado.length === 0) {
        carritoContenedor.innerHTML = `<div class="alert alert-info">Tu carrito está vacío.</div>`;
        calcularTotal([]);
        btnVaciar.disabled = true;
        btnFinalizar.disabled = true;
        return;
    }

    btnVaciar.disabled = false;
    btnFinalizar.disabled = false;

    const respuesta = await fetch("./data/productos.json");
    const datosJSON = await respuesta.json();

    let todosLosProductos = [];
    for (let categoria in datosJSON) {
        todosLosProductos = todosLosProductos.concat(datosJSON[categoria]);
    }

    const carritoCompleto = carritoGuardado.map(itemGuardado => {
        const productoCompleto = todosLosProductos.find(p => p.id === itemGuardado.id);
        return {
            ...productoCompleto,
            cantidad: itemGuardado.cantidad
        };
    });

    renderizarListaProductos(carritoCompleto);
    calcularTotal(carritoCompleto);
}



// -----------------------------
// RENDERIZAR LISTA DE PRODUCTOS
// -----------------------------
function renderizarListaProductos(carrito) {
    const contenedor = document.querySelector("#carrito-contenedor");

    const html = carrito.map(item => `
        <div class="card mb-3 shadow-sm">
            <div class="card-body">
                <div class="d-flex align-items-center">
                    <img src="${item.imagen}" alt="${item.nombre}" 
                         class="img-fluid rounded me-3"
                         style="width: 100px; height: 100px; object-fit: cover;">
                    
                    <div class="flex-grow-1">
                        <h5 class="card-title">${item.nombre}</h5>
                        <p class="card-text text-muted">Cantidad: ${item.cantidad}</p>
                    </div>

                    <div class="text-end me-3">
                        <p class="text-muted mb-0">Precio Unitario</p>
                        <h5>$${item.precio}</h5>
                    </div>

                    <div class="text-end">
                        <p class="text-muted mb-0">Subtotal</p>
                        <h5 class="text-primary">$${(item.precio * item.cantidad).toFixed(2)}</h5>
                    </div>

                    <button class="btn btn-outline-danger btn-sm ms-4 btn-eliminar" data-id="${item.id}">
                        &times;
                    </button>
                </div>
            </div>
        </div>
    `).join("");

    contenedor.innerHTML = html;
    agregarListenersEliminar();
}



// -----------------------------
// CALCULAR TOTAL
// -----------------------------
function calcularTotal(carrito) {
    const totalSpan = document.querySelector("#carrito-total");

    const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

    totalSpan.textContent = `$${total.toFixed(2)}`;
}



// -----------------------------
// ELIMINAR ITEM DEL CARRITO
// -----------------------------
function agregarListenersEliminar() {
    document.querySelectorAll('.btn-eliminar').forEach(boton => {
        boton.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            eliminarItemDelCarrito(id);
        });
    });
}

function eliminarItemDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const nuevoCarrito = carrito.filter(item => item.id !== id);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));

    window.dispatchEvent(new CustomEvent("carritoActualizado"));
    cargarYRenderizarCarrito();
}



// -----------------------------
// VACIAR CARRITO
// -----------------------------
function vaciarCarritoConConfirmacion() {
    if (confirm("¿Estás seguro de que quieres vaciar tu carrito?")) {
        limpiarCarritoAutomaticamente();
    }
}

function limpiarCarritoAutomaticamente() {
    localStorage.setItem("carrito", JSON.stringify([]));
    window.dispatchEvent(new CustomEvent("carritoActualizado"));
    cargarYRenderizarCarrito();
}
});