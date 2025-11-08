async function cargarProductos(categoria) {
  const respuesta = await fetch("./data/productos.json");
  const datos = await respuesta.json();
  const productos = datos[categoria];
  renderizarProductos(productos);
  return productos
}

// Función para renderizar productos en HTML
function renderizarProductos(productos) {
  const main = document.querySelector("#product-list");

  const dataMain = productos.map((producto) => {
    let detalles = "";
    for (let key in producto) {
      if (["id", "nombre", "precio", "descripcion", "imagen"].includes(key)) continue;
      detalles += `<li class="list-group-item">${key}: ${producto[key]}</li>`;
    }

    return `
      <div class="col-md-4">
        <div class="card h-100">
          <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
          <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <h6 class="text-muted">$${producto.precio || ""} dolares</h6>
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
  });

  main.innerHTML = dataMain.join("");
}

// --Evento boton de especificaciones--
document.addEventListener("DOMContentLoaded", function () {
  // Escucha CUANDO se abra un panel (evento de Bootstrap)
  document.addEventListener("shown.bs.collapse", function (e) {
    const boton = document.querySelector(`[href="#${e.target.id}"], [data-bs-target="#${e.target.id}"]`);
    if (boton) boton.textContent = "Ver menos";
  });
  // Escucha CUANDO se cierre un panel
  document.addEventListener("hidden.bs.collapse", function (e) {
    const boton = document.querySelector(`[href="#${e.target.id}"], [data-bs-target="#${e.target.id}"]`);
    if (boton) boton.textContent = "Ver más";
  });
});

// Detectar la página y cargar la categoría correspondiente
document.addEventListener("DOMContentLoaded", () => {
  const pagina = window.location.pathname;
  if (pagina.includes("laptops.html")) {
    cargarProductos("laptops");
  } else if (pagina.includes("celulares.html")) {
    cargarProductos("celulares");
  } else if (pagina.includes("gadgets.html")) {
    cargarProductos("gadgets");
  } else if (pagina.includes("redes.html")) {
    cargarProductos("redes");
  }
});
