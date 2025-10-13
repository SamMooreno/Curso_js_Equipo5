const nav = document.querySelector("#navbar_m");


let enlaces = [
  {nombre: "Home", archivo: "index.html"},
  {nombre: "Ver carrito", archivo: "#"}
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
    </div>
  </div>
</nav>
`;

// Capturar el formulario de búsqueda
const formBusqueda = document.querySelector("#form-busqueda");
const inputBusqueda = document.querySelector("#input-busqueda");

formBusqueda.addEventListener("submit", (event) => {
  event.preventDefault(); 

  const termino = inputBusqueda.value.trim().toLowerCase(); 
  if (termino) {
    window.location.href = `resultados.html?busqueda=${encodeURIComponent(termino)}`;
  }
});
