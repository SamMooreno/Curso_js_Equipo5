document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get("id"));
    if (productId){
        renderizarProducto(productId);
    } else {
        alert("Error: Producto no encontrado.");
        window.location.href = "index.html";
    }
});


async function renderizarProducto(id) {
    const main = document.querySelector("#producto_card"); 
    const respuesta = await fetch("./data/productos.json");
    const datos = await respuesta.json();
    let productoEncontrado = null;
    let categoriaEncontrada = null;
    
    for (let categoria in datos) {
        const producto = datos[categoria].find(p => p.id === id);
        if (producto) {
            productoEncontrado = producto;
            categoriaEncontrada = categoria;
            break; 
        }
    }

    if (!productoEncontrado) {
        alert("Producto no existente.");
        window.location.href = "index.html";
        return; 
    }

    let detalles = "";
    for (let key in productoEncontrado) {
        if (["id", "nombre", "precio", "descripcion", "imagen", "stock"].includes(key)) continue;
        detalles += `<li class="list-group-item">${key}: ${productoEncontrado[key]}</li>`;
    }

    const html = `
      <div class="col-md-6 mb-4">
        <img src="${productoEncontrado.imagen}" class="img-fluid rounded" alt="${productoEncontrado.nombre}" style="max-height: 400px; width: 100%; object-fit: cover;">
      </div>
      
      <div class="col-md-6">
        <div class="product-info bg-white rounded p-4 shadow">
          <h1 class="h2 mb-3">${productoEncontrado.nombre}</h1>
          <p class="text-muted mb-4">${productoEncontrado.descripcion || ""}</p>
          
          <div class="mb-4">
            <h3 class="text-primary">$${productoEncontrado.precio}</h3>
            <p class="text-muted">Stock disponible: ${productoEncontrado.stock || 0}</p>
            <p class="text-muted">Categoría: ${categoriaEncontrada}</p>
          </div>
          
          ${detalles ? `
          <div class="mb-4">
            <a class="btn btn-outline-primary" data-bs-toggle="collapse" href="#detalles-producto" role="button">
              Especificaciones
            </a>
            <div class="collapse mt-2" id="detalles-producto">
              <ul class="list-group list-group-flush">
                ${detalles}
              </ul>
            </div>
          </div>
          ` : ''}
          
          <div class="input-group mb-4" style="max-width: 200px;">
            <button class="btn btn-danger" type="button" id="btn-decrease">-</button>
            <input id="quantity-counter" type="number" class="form-control text-center" value="1" min="1" max="${productoEncontrado.stock || 1}" readonly>
            <button class="btn btn-danger" type="button" id="btn-increase">+</button>
          </div>
          
          <button class="btn btn-primary col-12 mb-2" id="btn-agregar-carrito" data-id="${productoEncontrado.id}">Agregar al carrito</button>
          <a class="btn btn-outline-secondary col-12" href="index.html">Volver al inicio</a>
        </div>
      </div>
    `;

    main.innerHTML = html;
    
    const counter = document.querySelector("#quantity-counter");
    document.querySelector("#btn-increase").addEventListener("click", () => {
        let val = parseInt(counter.value);
        if (val < productoEncontrado.stock) {
            counter.value = val + 1;
        }
    });

    document.querySelector("#btn-decrease").addEventListener("click", () => {
        let val = parseInt(counter.value);
        if (val > 1) {
            counter.value = val - 1;
        }
    });

    document.querySelector("#btn-agregar-carrito").addEventListener("click", (e) => {
        if (localStorage.getItem("session") !== "si") {
            alert("Debes iniciar sesión para comprar.");
            window.location.href = "login.html";
            return;
        }
        const id = parseInt(e.target.dataset.id); 
        const cantidadAAgregar = parseInt(counter.value); 

        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const productoEnCarrito = carrito.find(p => p.id === id);

        const cantidadActualEnCarrito = productoEnCarrito ? productoEnCarrito.cantidad : 0; 
        const nuevaCantidadTotal = cantidadActualEnCarrito + cantidadAAgregar; 
        if (nuevaCantidadTotal > productoEncontrado.stock) {
            alert(`Stock insuficiente. Ya tienes ${cantidadActualEnCarrito} en tu carrito y el límite de stock es ${productoEncontrado.stock}.`);
            return; 
        }

        if (productoEnCarrito) {
            productoEnCarrito.cantidad = nuevaCantidadTotal; 
        } else {
            carrito.push({ id: id, cantidad: cantidadAAgregar });
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        alert("¡Producto agregado al carrito!");
        const evento = new CustomEvent("carritoActualizado");
        window.dispatchEvent(evento);
    });

}