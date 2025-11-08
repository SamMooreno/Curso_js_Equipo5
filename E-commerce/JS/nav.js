// Cantidad del carrito
function obtenerCantidadTotalCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const total = carrito.reduce((acc, item) => acc + item.cantidad, 0); 
    return total;
}
function actualizarNumeroCarrito() {
    const cantidad = obtenerCantidadTotalCarrito();
    const enlaceCarrito = document.querySelector("#enlace-carrito"); 
    if (enlaceCarrito) {
        enlaceCarrito.textContent = `Ver carrito (${cantidad})`;
    }
  }

const nav = document.querySelector("#navbar_m");

let enlaces = [
  {nombre: "Home", archivo: "index.html"},
  {nombre: `Ver carrito (${obtenerCantidadTotalCarrito()})`, archivo: "carrito.html"}
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
    <a class="navbar-brand" href="#">E-commerce</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        ${enlaces.map(enlace => `
          <li class="nav-item">
            <a class="nav-link" 
              href="${enlace.archivo}" 
              ${enlace.archivo === 'carrito.html' ? 'id="enlace-carrito"' : ''} 
            >${enlace.nombre}</a>
          </li>
        `).join("")}

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

// Actualiza ventana de carrito
window.addEventListener("carritoActualizado", () => {
    actualizarNumeroCarrito(); 
});

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
  renderizarBusqueda(resultados);
});

// Función para mostrar los resultados
function renderizarBusqueda(productos) {
  if (productos.length === 0) {
    contenedorResultados.innerHTML = `<h2><center>No se encontraron resultados.</center></h2>`;
    return;
  }

  contenedorResultados.innerHTML = productos.map(producto => {
    let detalles = "";
    for (let key in producto) {
      if (["id", "nombre", "precio", "descripcion", "imagen"].includes(key)) continue;
      detalles += `<li class="list-group-item">${key}: ${producto[key]}</li>`;
    }

    return `
      <h1>Resultados</h1><br>
      <div class="col-md-4">
        <div class="card h-100">
          <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
          <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <h6 class="text-muted">$${producto.precio || ""} dólares</h6>
            <p class="card-text">${producto.descripcion || ""}</p>
                        ${(localStorage.getItem("session") === "si")
              ? `<a href="producto.html?id=${producto.id}" class="btn btn-success">Comprar</a>`
              : `<a href="login.html" class="btn btn-secondary">Inicia sesión para comprar</a>`
            }
            <a class="btn btn-primary" data-bs-toggle="collapse" href="#detalle-${producto.id}" role="button">
              Ver más
            </a>
            <div class="collapse mt-2" id="detalle-${producto.id}">
              <ul class="list-group list-group-flush">
                ${detalles}
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// Restaurar vista cuando se borra el texto
inputBusqueda.addEventListener("input", () => {
  if (!inputBusqueda.value.trim()) {
    contenedorResultados.innerHTML = "";
    mainContent.style.display = "block";
  }
});
