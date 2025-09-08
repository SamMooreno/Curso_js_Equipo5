// Ejercicio Demo - Sprint 1

let opcion = parseInt(prompt(
  "Elige una opción:\n" +
  "1. Pedir 2 números y sumarlos.\n" +
  "2. Pedir un número mayor a 10 y hacer una cuenta regresiva hasta 0.\n" +
  "3. Pedir un nombre y una edad e interpolarlas."
));

switch (opcion) {
  case 1:
    let num1 = parseInt(prompt("Ingrese el primer número positivo:"));
    let num2 = parseInt(prompt("Ingrese el segundo número positivo:"));

    if (num1 > 0 && num2 > 0 && Number.isInteger(num1) && Number.isInteger(num2)) {
      alert(`La suma de ${num1} + ${num2} es = ${num1 + num2}`);
    } else {
      alert("Error: Debe ingresar números enteros positivos.");
    }
    break;

  case 2:
    let numero = parseInt(prompt("Ingrese un número mayor a 10:"));

    if (numero > 10) {
      console.log(`Cuenta regresiva desde ${numero}:`);
      for (let i = numero; i >= 0; i--) {
        console.log(i);
      }
    } else {
      alert("Error: El número debe ser mayor a 10.");
    }
    break;

  case 3:
    let nombre = prompt("Ingrese su nombre:");
    let edad = parseInt(prompt("Ingrese su edad:"));

    if (nombre && edad > 0) {
      alert(`Hola, me llamo ${nombre} y tengo ${edad} años.`);
    } else {
      alert("Error: Debe ingresar un nombre válido y una edad positiva.");
    }
    break;

  default:
    alert("Opción no válida.");
    break;
}
