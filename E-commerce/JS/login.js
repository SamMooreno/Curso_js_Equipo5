async function sesiones() {
    const respuesta = await fetch("./data/usuarios.json");
    const datos = await respuesta.json();
    return datos
}
const form = document.querySelector("form");
const button = document.querySelector("button");
const input = document.querySelector("#input_mail");
const passw = document.querySelector("#input_passw");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const datos = await sesiones();
    const usuarioEncontrado = datos.usuarios.find(
    usuario => usuario.correo === input.value && usuario.password === passw.value
    );
    
    if (usuarioEncontrado){
        localStorage.setItem("session", "si");
        localStorage.setItem("nombre", usuarioEncontrado.nombre);
        location.href = "index.html";
    }else{
        alert("Usuario no existente");
    }
});
