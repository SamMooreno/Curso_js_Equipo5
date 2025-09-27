// Estaciones climaticas del año 
let dia = prompt("Ingresa el dia: ");
let mes = prompt("Ingresa el mes: ").toLowerCase();
let year = prompt("Ingresa el año: ").toLowerCase();
dia = parseInt(dia);

function esta_clima(day, month){

    switch(month){
        case 'enero':
            if (day >= 1 && day <= 31){
                alert("Es Invierno");
            } else{
                alert("Error. Ese dia no está en el rango del mes");
            }
        break;

        case 'febrero':
            if (day >= 1 && day <= 29){
                alert("Es Invierto");
            }else{
                alert("Error. Ese dia no está en el rango del mes");
            }
        break;

        case 'marzo':
            if (day >= 1 && day <= 20){
                alert("Es Invierto");
            }else if (day >= 21 && day <= 31){
                alert("Es Primavera");
            }
            else{
                alert("Error. Ese dia no está en el rango del mes");
            }
        break;

        case 'abril':
            if (day >= 1 && day <= 30){
                alert("Es Primavera");
            }else{
                alert("Error. Ese dia no está en el rango del mes");
            }
        break;

        case 'mayo':
            if (day >= 1 && day <= 31){
                alert("Es Primavera");
            }else{
                alert("Error. Ese dia no está en el rango del mes");
            }
        break;

        case 'junio':
            if (day >= 1 && day <= 20){
                alert("Es Primavera");
            }else if (day >= 21 && day <= 30){
                alert("Es Verano");
            }
            else{
                alert("Error. Ese dia no está en el rango del mes");
            }
        break;

        case 'julio':
            if (day >= 1 && day <= 31){
                alert("Es Verano");
            }else{
                alert("Error. Ese dia no está en el rango del mes");
            }
        break;

        case 'agosto':
            if (day >= 1 && day <= 31){
                alert("Es Verano");
            }else{
                alert("Error. Ese dia no está en el rango del mes");
            }
        break;

        case 'septiembre':
            if (day >= 1 && day <= 20){
                alert("Es Verano");
            }else if (day >= 21 && day <= 30){
                alert("Es Otoño");
            }
            else{
                alert("Error. Ese dia no está en el rango del mes");
            }
        break;

        case 'octubre':
            if (day >= 1 && day <= 31){
                alert("Es Otoño");
            }else{
                alert("Error. Ese dia no está en el rango del mes");
            }
        break;

        case 'noviembre':
            if (day >= 1 && day <= 30){
                alert("Es Otoño");
            }else{
                alert("Error. Ese dia no está en el rango del mes");
            }
        break;

        case 'diciembre':
            if (day >= 1 && day <= 20){
                alert("Es Otoño");
            }else if (day >= 21 && day <= 31){
                alert("Es Invierno");
            }
            else{
                alert("Error. Ese dia no está en el rango del mes");
            }
        break;

        default:
            alert("El mes que ingreso no existe o esta mal escrito");
        break;
    }
    
}

esta_clima(dia, mes);