async function cargarResultados() {
  const params = new URLSearchParams(window.location.search);
  const termino = params.get("busqueda");

  if (!termino) return;

  const response = await fetch("./data/productos.json");
  const data = await response.json();

  let resultados = [];

  // Buscar coincidencias en todas las categorías
  for (let categoria in data) {
    const productosFiltrados = data[categoria].filter((p) =>
      p.nombre.toLowerCase().includes(termino) ||
      p.marca?.toLowerCase().includes(termino)
    );
    resultados = resultados.concat(productosFiltrados);
  }

  renderizarResultados(resultados);
}

function renderizarResultados(productos) {
  const contenedor = document.querySelector("#product-list");

  if (productos.length === 0) {
    contenedor.innerHTML = `<p>No se encontraron resultados.</p>`;
    return;
  }

  contenedor.innerHTML = productos
    .map(
      (producto) => `
      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
          <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.descripcion || ""}</p>
          </div>

        </div>
      </div>`
    )
    .join("");
}

cargarResultados();
