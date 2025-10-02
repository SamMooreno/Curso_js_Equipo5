// Cargar Productos JSON
async function cargarProductos(categoria) {
  try {
    const response = await fetch("./data/productos.json");
    if (!response.ok) throw new Error("No se pudo cargar el JSON");

    const data = await response.json();
    const productos = data[categoria];
    console.log("Productos de " + categoria + ":", productos);

    renderizarProductos(productos);
    return productos;
  } catch (error) {
    console.error("Error al cargar los productos:", error);
  }
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
            
            <!-- Botón que despliega -->
            <a class="btn btn-primary" data-bs-toggle="collapse" href="#detalle-${producto.id}" role="button">
              Ver más
            </a>

            <!-- Contenido colapsable dinámico -->
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
