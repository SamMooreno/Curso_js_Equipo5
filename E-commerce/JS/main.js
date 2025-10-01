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
  const dataMain = productos.map(producto => {
    return `<div class="col-md-4">
              <div class="card h-100">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                  <h5 class="card-title">${producto.nombre}</h5>
                  <h6> $${producto.precio} dolares</h6>
                  <p class="card-text">${producto.descripcion || ""}</p>
                  <a href="#" class="btn btn-primary">Comprar</a> 
                </div>
              </div>
            </div>`;
  }).join("");

  main.innerHTML = dataMain;
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
  }
});
