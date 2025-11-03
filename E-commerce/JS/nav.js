const nav = document.querySelector("#navbar_m");

let enlaces = [
  {nombre: "Home", archivo: "index.html"},
  {nombre: "Ver carrito", archivo: "carrito.html"}
];

let categorias = [
  {nombre: "Laptops", archivo: "laptops.html"},
  {nombre: "Celulares", archivo: "celulares.html"},
  {nombre: "Redes", archivo: "redes.html"},
  {nombre: "Gadgets", archivo: "gadgets.html"}
];

nav.innerHTML = `
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="index.html">E-commerce</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        ${enlaces.map(enlace => `<li class="nav-item">
            <a class="nav-link" href="${enlace.archivo}">${enlace.nombre}</a>
          </li>`).join("")}

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Categorías
          </a>
          <ul class="dropdown-menu">
            ${categorias.map(cat => `<li><a class="dropdown-item" href="${cat.archivo}">${cat.nombre}</a></li>`).join("")}
          </ul>
        </li>
      </ul>

      <form class="d-flex" role="search" id="form-busqueda">
        <input id="input-busqueda" class="form-control me-2" type="search" placeholder="Buscar" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Buscar</button>
      </form>

      <div id="sesion"></div>

    </div>
  </div>
</nav>
`;

// Autenticación de la sesión
const authSection = document.querySelector("#sesion");
authSection.innerHTML = `<div class="menu-usuario">
    ${localStorage.getItem("nombre")
      ? `<span>${localStorage.getItem("nombre")}</span>
         <ul>
           <li><a onclick="closeSesion()" type="submit" >Cerrar sesión</a></li>
         </ul>`
      : `<a href="login.html">Iniciar sesión</a>`
    }
  </div>`;

function closeSesion(){
  localStorage.clear();
  location.href = "index.html";
}

// --- BUSQUEDA ---
const formBusqueda = document.querySelector("#form-busqueda");
const inputBusqueda = document.querySelector("#input-busqueda");
const mainContent = document.querySelector("#main-content");
const contenedorResultados = document.querySelector("#resultado-busqueda");
const productoDetalle = document.querySelector("#producto-detalle");

formBusqueda.addEventListener("submit", async (event) => {
  event.preventDefault();
  const termino = inputBusqueda.value.trim().toLowerCase();
  if (!termino) return;

  const respuesta = await fetch("./data/productos.json");
  const datos = await respuesta.json();

  let resultados = [];

  // Buscar en todas las categorías
  for (let categoria in datos) {
    const encontrados = datos[categoria].filter(p =>
      p.nombre.toLowerCase().includes(termino) ||
      p.marca?.toLowerCase().includes(termino)
    );
    resultados = resultados.concat(encontrados);
  }

  // Ocultar contenido principal y mostrar resultados
  mainContent.style.display = "none";
  productoDetalle.style.display = "none";
  contenedorResultados.style.display = "block";
  renderizarBusqueda(resultados);
});

// Función para mostrar los resultados
function renderizarBusqueda(productos) {
  if (productos.length === 0) {
    contenedorResultados.innerHTML = `<h2><center>No se encontraron resultados.</center></h2>`;
    return;
  }

  contenedorResultados.innerHTML = `
    <div class="container">
      <h1>Resultados de Búsqueda</h1>
      <div class="row g-4">
        ${productos.map(producto => {
          let detalles = "";
          for (let key in producto) {
            if (["id", "nombre", "precio", "descripcion", "imagen"].includes(key)) continue;
            detalles += `<li class="list-group-item">${key}: ${producto[key]}</li>`;
          }

          return `
            <div class="col-md-4">
              <div class="card h-100">
                <img src="${producto.imagen}" class="card-img-top product-image" alt="${producto.nombre}">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">${producto.nombre}</h5>
                  <h6 class="text-muted">$${producto.precio || ""} dólares</h6>
                  <p class="card-text flex-grow-1">${producto.descripcion || ""}</p>
                  
                  <div class="mt-auto">
                    <a class="btn btn-primary" data-bs-toggle="collapse" href="#detalle-${producto.id}" role="button">
                      Ver más
                    </a>
                    <button class="btn btn-ver-detalle" onclick="mostrarDetalleProducto(${producto.id})">
                      Ver detalle
                    </button>
                    <div class="collapse mt-2" id="detalle-${producto.id}">
                      <ul class="list-group list-group-flush">
                        ${detalles}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

// Restaurar vista cuando se borra el texto
inputBusqueda.addEventListener("input", () => {
  if (!inputBusqueda.value.trim()) {
    contenedorResultados.innerHTML = "";
    contenedorResultados.style.display = "none";
    productoDetalle.style.display = "none";
    mainContent.style.display = "block";
  }
});

// Función global para mostrar detalle de producto
window.mostrarDetalleProducto = async function(productId) {
  try {
    const respuesta = await fetch("./data/productos.json");
    const datos = await respuesta.json();
    
    let productoEncontrado = null;
    let categoriaEncontrada = null;
    
    for (let categoria in datos) {
      const producto = datos[categoria].find(p => p.id === productId);
      if (producto) {
        productoEncontrado = producto;
        categoriaEncontrada = categoria;
        break;
      }
    }

    if (!productoEncontrado) {
      alert("Producto no encontrado");
      return;
    }

    // Ocultar otras vistas y mostrar detalle
    mainContent.style.display = "none";
    contenedorResultados.style.display = "none";
    productoDetalle.style.display = "block";
    
    renderizarProductoDetalle(productoEncontrado, categoriaEncontrada);
    
  } catch (error) {
    console.error("Error cargando producto:", error);
    alert("Error al cargar el producto");
  }
}

// Función para renderizar el detalle del producto
function renderizarProductoDetalle(producto, categoria) {
  let detalles = "";
  for (let key in producto) {
    if (["id", "nombre", "precio", "descripcion", "imagen", "stock"].includes(key)) continue;
    detalles += `<li class="list-group-item">${key}: ${producto[key]}</li>`;
  }

  const html = `
    <div class="row">
      <div class="col-md-6 mb-4">
        <img src="${producto.imagen}" class="img-fluid rounded product-image" alt="${producto.nombre}" style="max-height: 400px; width: 100%; object-fit: cover;">
      </div>
      
      <div class="col-md-6">
        <div class="product-info bg-white rounded p-4 shadow">
          <h1 class="h2 mb-3">${producto.nombre}</h1>
          <p class="text-muted mb-4">${producto.descripcion || ""}</p>
          
          <div class="mb-4">
            <h3 class="text-primary">$${producto.precio}</h3>
            <p class="text-muted">Stock disponible: <span id="product-stock">${producto.stock || 0}</span></p>
            <p class="text-muted">Categoría: ${categoria}</p>
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
            <button class="btn btn-danger" type="button" onclick="decreaseItem()">-</button>
            <input id="quantity-counter" type="number" class="form-control text-center" value="1" min="1" max="${producto.stock || 1}">
            <button class="btn btn-danger" type="button" onclick="increaseItem()">+</button>
          </div>
          
          <button class="btn btn-primary col-12 mb-2" onclick="addItems(${producto.id})">Agregar al carrito</button>
          <button class="btn btn-outline-secondary col-12" onclick="volverAHome()">Volver al inicio</button>
        </div>
      </div>
    </div>
  `;

  productoDetalle.innerHTML = html;
}

// Función para volver al home
window.volverAHome = function() {
  productoDetalle.style.display = "none";
  contenedorResultados.style.display = "none";
  mainContent.style.display = "block";
}