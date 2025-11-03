// Funciones para el manejo de productos

// Aumentar cantidad (respetando el stock disponible)
window.increaseItem = function() {
  const counter = document.getElementById("quantity-counter");
  if (!counter) return;
  
  const currentValue = Number(counter.value);
  const maxStock = Number(counter.max);
  
  if (currentValue < maxStock) {
    counter.value = currentValue + 1;
  } else {
    alert(`No puedes agregar más de ${maxStock} unidades. Stock insuficiente.`);
  }
}

// Disminuir cantidad (no puede ser menor a 1)
window.decreaseItem = function() {
  const counter = document.getElementById("quantity-counter");
  if (!counter) return;
  
  const currentValue = Number(counter.value);
  
  if (currentValue > 1) {
    counter.value = currentValue - 1;
  }
}

// Agregar productos al carrito
window.addItems = async function(productId) {
  try {
    const counter = document.getElementById("quantity-counter");
    if (!counter) return;
    
    const quantity = Number(counter.value);
    
    if (quantity < 1) {
      alert("La cantidad debe ser al menos 1");
      return;
    }
    
    // Verificar si el usuario ha iniciado sesión
    const usuario = localStorage.getItem("nombre");
    if (!usuario) {
      alert("Debes iniciar sesión para agregar productos al carrito.");
      window.location.href = "login.html";
      return;
    }
    
    // Cargar datos del producto para verificar stock
    const respuesta = await fetch("./data/productos.json");
    const datos = await respuesta.json();
    
    let productoEncontrado = null;
    for (let categoria in datos) {
      const producto = datos[categoria].find(p => p.id === productId);
      if (producto) {
        productoEncontrado = producto;
        break;
      }
    }
    
    if (!productoEncontrado) {
      alert("Producto no encontrado");
      return;
    }
    
    // Obtener carrito actual del localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Verificar si el producto ya está en el carrito
    const existingProductIndex = cart.findIndex(item => item.product.id === productId);
    
    if (existingProductIndex !== -1) {
      // Si ya existe, actualizar la cantidad (respetando stock)
      const nuevaCantidad = cart[existingProductIndex].quantity + quantity;
      if (nuevaCantidad <= productoEncontrado.stock) {
        cart[existingProductIndex].quantity = nuevaCantidad;
      } else {
        alert(`No puedes agregar más de ${productoEncontrado.stock} unidades de este producto.`);
        return;
      }
    } else {
      // Si no existe, agregar nuevo producto
      cart.push({
        product: productoEncontrado,
        quantity: quantity
      });
    }
    
    // Guardar carrito actualizado en localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Mostrar mensaje de éxito
    alert(`¡${quantity} ${productoEncontrado.nombre} agregado(s) al carrito!`);
    
  } catch (error) {
    console.error("Error agregando al carrito:", error);
    alert("Error al agregar producto al carrito");
  }
}

// Cargar productos destacados en el home
document.addEventListener("DOMContentLoaded", async function() {
  // Solo cargar productos destacados si estamos en index.html
  if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
    await cargarProductosDestacados();
  }
});

async function cargarProductosDestacados() {
  try {
    const respuesta = await fetch("./data/productos.json");
    const datos = await respuesta.json();
    
    let productosDestacados = [];
    
    // Tomar algunos productos de cada categoría
    for (let categoria in datos) {
      const productosCategoria = datos[categoria].slice(0, 2); // Tomar 2 productos por categoría
      productosDestacados = productosDestacados.concat(productosCategoria);
    }
    
    renderizarProductosDestacados(productosDestacados);
    
  } catch (error) {
    console.error("Error cargando productos destacados:", error);
  }
}

function renderizarProductosDestacados(productos) {
  const contenedor = document.getElementById("productos-destacados");
  
  if (!contenedor) return;
  
  const html = productos.map(producto => {
    return `
      <div class="col-md-3">
        <div class="card h-100">
          <img src="${producto.imagen}" class="card-img-top product-image" alt="${producto.nombre}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${producto.nombre}</h5>
            <h6 class="text-muted">$${producto.precio || ""}</h6>
            <p class="card-text flex-grow-1">${producto.descripcion ? producto.descripcion.substring(0, 100) + '...' : ''}</p>
            <button class="btn btn-ver-detalle mt-auto" onclick="mostrarDetalleProducto(${producto.id})">
              Ver detalle
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
  
  contenedor.innerHTML = html;
}