// function calculoBeca(valPromedio, valIngresos, valSobrino) {
//     if (valPromedio >= 9 && valIngresos <= 1000 || valSobrino == "si") {
//         return "Beca completa";
//     } else if (valPromedio >= 7 && valIngresos <= 500) {
//         return "Beca temporal";
//     } else {
//         return "No se otorga beca"
//     }
// }

// let promedio;
// do {
//     promedio = parseFloat(prompt("Ingrese su promedio (0 a 10): "));
//     if (isNaN(promedio) || promedio < 0 || promedio > 10) {
//         alert("El promedio debe ser un número entre 0 y 10.");
//     }
// } while (isNaN(promedio) || promedio < 0 || promedio > 10);

// let ingresos;
// do {
//     ingresos = parseFloat(prompt("Ingrese sus ingresos familiares (USD): "));
//     if (isNaN(ingresos) || ingresos < 0) {
//         alert("Los ingresos deben ser un número mayor o igual a 0.");
//     }
// } while (isNaN(ingresos) || ingresos < 0);

// let sobrino = prompt("¿Eres sobrino de los directivos?").toLowerCase();

// let resultado = calculoBeca(promedio, ingresos, sobrino);
// alert(resultado);

function calculoBeca(valPromedio, valIngresos, valSobrino) {
    if (isNaN(valPromedio) || valPromedio < 0 || valPromedio > 10) {
        return "El promedio debe ser un número entre 0 y 10";
    }
    if (isNaN(valIngresos) || valIngresos < 0) {
        return "Los ingresos deben ser un número mayor o igual a 0";
    }

    if ((valPromedio >= 9 && valIngresos <= 1000) || valSobrino == "si") {
        return "Beca completa";
    } else if (valPromedio >= 7 && valIngresos <= 500) {
        return "Beca parcial";
    } else {
        return "No se otorga beca";
    }
}

let promedio = parseFloat(prompt("Ingrese su promedio (0 a 10): "));
let ingresos = parseFloat(prompt("Ingrese sus ingresos familiares en USD: "));
let sobrino = prompt("¿Eres sobrino de los directivos?").toLocaleLowerCase();

let resultado = calculoBeca(promedio, ingresos, sobrino);
alert(resultado);
