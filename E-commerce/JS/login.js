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
        Swal.fire({
            icon: 'success',
            title: '¡Bienvenido!',
            text: 'Inicio de sesión exitoso'
        }).then(() => {
            location.href = "index.html";
        });
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Usuario no existente',
            text: 'Verifica tus datos e intenta de nuevo'
        });
    }
});
