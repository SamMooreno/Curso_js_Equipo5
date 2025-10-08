// Creacion de navbar con array
const ul = document.querySelector("nav ul");

let enlaces = [
  { nombre: "Home", archivo: "home.html" },
  { nombre: "Pantalones", archivo: "pantalones.html" },
  { nombre: "Zapatos", archivo: "zapatos.html" },
  { nombre: "Playeras", archivo: "playeras.html"}
];

let marcado = [];

for (let enlace of enlaces){
    marcado.push(`<li><a href="${enlace.archivo}">${enlace.nombre}</a></li>`);
}

ul.innerHTML = marcado.join("");