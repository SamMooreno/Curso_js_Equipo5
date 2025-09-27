// Ejercicio con Objetos (Tematica LIBROS)
const noches_blancas = {
    nombre: "Noches Blancas",
    autor: "Fiódor Dostoyevski",
    paginas: 128
};

const meditaciones = {
    nombre: "Meditaciones",
    autor: "Marco Aurelio",
    paginas: 158
};

let solicitud = prompt("¿Cuál libro quieres consultar?").toLowerCase();
if (solicitud == "noches blancas"){
    console.table(noches_blancas);
}
else if (solicitud == "meditaciones"){
    console.table(meditaciones)
}
else{
    console.log("No se encontro el libro");
}