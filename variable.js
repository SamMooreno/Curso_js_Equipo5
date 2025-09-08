let opcion = prompt("Elige una opcion: ");
if (opcion != "1" &&
    opcion != "2" &&
    opcion != "3"){
        alert("Opcion no valida");
    }
else if(opcion == "1" ||
    opcion == "2" ||
    opcion == "3"){

                    switch (opcion) {
    case 1:
    let num1 = parseInt(prompt("Ingrese el primer número positivo:"));
    let num2 = parseInt(prompt("Ingrese el segundo número positivo:"));

    if (num1 > 0 && num2 > 0 && Number.isInteger(num1) && Number.isInteger(num2)) {
        console.log(`La suma de ${num1} + ${num2} es = ${num1 + num2}`);
    } else {
        alert("Error: Debe ingresar números enteros positivos.");
    }
    break;
    case 2:
        let num = prompt("escribe un numero mayor a 10")

if (num >= 10){
    

    for (let i = num; i>= 0; i-- ){
    console.log(i);
}
} else {

    alert("Error: El numero debe ser mayor a 10");
}

    case 3:
}

}
