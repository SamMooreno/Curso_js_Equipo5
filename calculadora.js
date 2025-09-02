while(true)
{
    let operacion = prompt("¿Qué operación desea realizar? ").toLowerCase();
    if (operacion != "suma" &&
        operacion != "resta" &&
        operacion != "division" &&
        operacion != "multiplicacion"){
        alert("Opción no valida");
    }else if (operacion == "suma" ||
            operacion == "resta" ||
            operacion == "division" ||
            operacion == "multiplicacion"){
        let num1 = prompt("Escribe el primer numero: ");
        let num2 = prompt("Escribe el segundo numero: ");
        num1 = parseInt(num1);
        num2 = parseInt(num2);

        if (isNaN(num1) || isNaN(num2)){
            alert("No es un número");
        }else{
            if (operacion == "suma"){
                let suma = num1 + num2;
                alert(`${num1} + ${num2} = ${suma}`);
            }else if(operacion == "resta"){
                let resta = num1 - num2;
                alert(`${num1} - ${num2} = ${resta}`);
            }else if(operacion == "division"){
                let division = num1 / num2;
                alert(`${num1} / ${num2} = ${division}`);
            }else if (operacion == "multiplicacion"){
                let multi = num1 * num2;
                alert(`${num1} * ${num2} = ${multi}`);
            }else{
                alert("Opcion no valida");
            }
        }
        break;
    }
}
