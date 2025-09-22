const ul = document.querySelector("nav ul");
const arr =[
    "index", "producto"
]

const marcado =[]

for (let items of arr) {
    marcado.push(`<li><a href="${items}.html" >${items}</a></li> `);
}


ul.innerHTML = marcado

