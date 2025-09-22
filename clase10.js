function obtenerEstacion() {
    let emiferio = prompt("Estas en el emiferio norte o emiferio sur?")
    if (emiferio != "norte" && emiferio != "sur") {
        alert = ("opcion no valida");
    }
    // else if (emiferio == "norte" ||
    //     emiferio == "sur"
    // ) { Este if no seria necesario
    switch (emiferio) {
        case "norte":
            let dia = parseInt(prompt("Ingrese un dia"));
            let mes = prompt("Ingrese un mes"); //Aca tendrias que hacer un manejo de errores por que pueden ingresarte el mes con números
            if ((mes == "enero" && dia <= 31 || mes == "febrero" && dia <= 28)) {
                return "Primavera"
            } else if ((mes == "marzo" && dia <= 31 || mes == "abril" && dia <= 30 || mes == "mayo" && dia <= 31)) {
                return "verano"
            }
            break;
        case 'sur':
            return
    }


    // }
}