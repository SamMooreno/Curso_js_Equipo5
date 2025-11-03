// Verifica si el usuario tiene una sesión activa
function verificarSesionActiva() {
  const usuario = localStorage.getItem("nombre");

  // Si no hay sesión activa y el usuario intenta entrar al carrito
  const paginaActual = window.location.pathname.split("/").pop();

  if (!usuario && paginaActual === "carrito.html") {
    alert("Debes iniciar sesión para acceder al carrito.");
    window.location.href = "index.html";
  }
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", verificarSesionActiva);
