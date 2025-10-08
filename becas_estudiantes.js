// Calculo de becas estudiantiles
let promedio_estudiante = prompt("Ingrese su promedio: ");
let ingreso_familiar = prompt("Ingrese su ingreso familiar: ");
promedio_estudiante = parseFloat(promedio_estudiante);
ingreso_familiar = parseFloat(ingreso_familiar);

function beca_estudiantil(promedio, ingreso){
    if (promedio >= 9 && promedio <= 10 && ingreso >= 1000){
        alert("Tiene una beca completa");
    }
    else if(promedio >= 7 && promedio < 9 && ingreso <= 500){
        alert("Tiene media beca");
    }
    else{
        alert("No tiene derecho a beca");
    }
}

beca_estudiantil(promedio_estudiante, ingreso_familiar);