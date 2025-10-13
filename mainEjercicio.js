
const productos = [
  { nombre: "Camisa azul", precio: 50000 },
  { nombre: "Pantalón negro", precio: 80000 },
  { nombre: "Zapatos deportivos", precio: 120000 },
];

const inputBuscar = document.querySelector("#input-buscar");
const btnBuscar = document.querySelector("#btn-buscar");
const btnLimpiar = document.querySelector("#btn-limpiar");
const contenedor = document.querySelector("#contenedor-cards");

// Mostrar todas las cards al inicio
mostrarCards(productos);

btnBuscar.addEventListener("click", () => {
  const texto = inputBuscar.value.toLowerCase();
  const filterData = productos.filter((p) =>
    p.nombre.toLowerCase().includes(texto)
  );
  mostrarCards(filterData);
});

btnLimpiar.addEventListener("click", () => {
  inputBuscar.value = "";

  mostrarCards(productos).remove;
  mostrarCards(productos);
});

function mostrarCards(lista) {
  contenedor.innerHTML = lista
    .map(
      (p) => `
      <div class="card">
        <h3>${p.nombre}</h3>
        <p>Precio: $${p.precio}</p>
      </div>
    `
    )
    .join("");
}
