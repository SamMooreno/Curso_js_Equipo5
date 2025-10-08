function obtenerEstacion() {
    let dia = parseInt(prompt("Bienvenido, a continuación conocerás en que estación te encuentras Ingresa el día 1-31:"));
    let mes = parseInt(prompt("Ingresa el mes 1-12:"));
    let año = parseInt(prompt("Ingresa el año:"));
    let hemisferio = prompt("¿En qué hemisferio te encuentras? Norte o Sur:").toLowerCase();

    // Formato mes/día OjO *como número
    const mmdd = mes * 100 + dia;

    switch (hemisferio) {
        case "norte":
            if (mmdd >= 321 && mmdd <= 620) {
                return "🌸 Primavera (21 de marzo - 20 de junio)";
            } else if (mmdd >= 621 && mmdd <= 922) {
                return "☀️ Verano (21 de junio - 22 de septiembre)";
            } else if (mmdd >= 923 && mmdd <= 1220) {
                return "🍂 Otoño (23 de septiembre - 20 de diciembre)";
            } else if ((mmdd >= 1221 && mmdd <= 1231) || (mmdd >= 101 && mmdd <= 320)) {
                return "❄️ Invierno (21 de diciembre - 20 de marzo)";
            } else {
                return "Fecha inválida!!. Intentelo de nuevo";
            }
        
        case "sur":
            if (mmdd >= 321 && mmdd <= 620) {
                return "🍂 Otoño (21 de marzo - 20 de junio)";
            } else if (mmdd >= 621 && mmdd <= 922) {
                return "❄️ Invierno (21 de junio - 22 de septiembre)";
            } else if (mmdd >= 923 && mmdd <= 1220) {
                return "🌸 Primavera (23 de septiembre - 20 de diciembre)";
            } else if ((mmdd >= 1221 && mmdd <= 1231) || (mmdd >= 101 && mmdd <= 320)) {
                return "☀️ Verano (21 de diciembre - 20 de marzo)";
            } else {
                return "⚠️ Fecha inválida";
            }

        default:
            return "⚠️ Hemisferio no válido. Por favor -> Escriba 'Norte' o 'Sur'.";
    }
}

alert("La estación es: " + obtenerEstacion());
