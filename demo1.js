let opcion = prompt("Elige una opcion: ");
if (opcion != "1" &&
    opcion != "2" &&
    opcion != "3"){
        alert("Opcion no valida");
    }
else if(opcion == "1" ||
    opcion == "2" ||
    opcion == "3"){
        switch(opcion){
            case '1':
                let num1 = prompt("Escribe el primer numero: ");
                let num2 = prompt("Escribe el segundo numero: ");
                num1 = Number(num1);
                num2 = Number(num2);
                if (Number.isInteger(num1) && Number.isInteger(num2) && num1 >= 0 && num2 >= 0){
                    let suma = num1 + num2;
                    alert(`${num1} + ${num2} = ${suma}`);
                }else{
                    alert("Error. No son numeros positivos o enteros");
                }
            break;

            case '2':
                let num = prompt("Escribe un numero mayor a 10: ");
                if (num >= 10){
                    let sucesion = [];
                    for (let i = num; i>= 0; i--){
                        sucesion.push(i)
                    }
                    alert(sucesion);
                }else{
                    alert("Error. El numero que escogio es menor a 10");
                }
            break;

            case '3':
                let nombre = prompt("Ingresa un numbre: ");
                let edad = prompt ("Ingresa la edad: ");
                alert(`Su nombre es ${nombre} y tiene ${edad} años`);     
        }
    }