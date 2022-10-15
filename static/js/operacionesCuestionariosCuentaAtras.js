function hacerCuentaAtras() {
    //Obtenemos el formato en hh:mm
    let contadorTiempoCaja = document.getElementById('contadorTiempo');
    let contadorTiempo = document.getElementById('contadorTiempo').textContent

    //Obtenemos el formato mm/dd/yyyy
    let contadorFechaCaja = document.getElementById('contadorFecha');
    let contadorFecha = document.getElementById('contadorFecha').textContent;

    //Separamos el formato de manera que queden horas y segundo aparte
    let horasTiempo, minutosTiempo;
    horasTiempo = contadorTiempo.substring(0, contadorTiempo.indexOf(':'));
    minutosTiempo = contadorTiempo.substring(contadorTiempo.indexOf(':') + 1);

    //Definimos equivalencia de tiempo
    fechaFinal = contadorFecha + " " +  contadorTiempo;
    console.log('fechaFinal', fechaFinal)
    
    const DATE_TARGET = new Date(fechaFinal);
    const MILLISECONDS_OF_A_SECOND = 1000;
    const MILLISECONDS_OF_A_MINUTE = MILLISECONDS_OF_A_SECOND * 60;
    const MILLISECONDS_OF_A_HOUR = MILLISECONDS_OF_A_MINUTE * 60;
    const MILLISECONDS_OF_A_DAY = MILLISECONDS_OF_A_HOUR * 24

    //Funcion para actualizar el tiempo
    function updateCountdown() {
        // Calculos
        const NOW = new Date()
        const DURATION = DATE_TARGET - NOW;
        const REMAINING_DAYS = Math.floor(DURATION / MILLISECONDS_OF_A_DAY);
        const REMAINING_HOURS = Math.floor((DURATION % MILLISECONDS_OF_A_DAY) / MILLISECONDS_OF_A_HOUR);
        const REMAINING_MINUTES = Math.floor((DURATION % MILLISECONDS_OF_A_HOUR) / MILLISECONDS_OF_A_MINUTE);
        const REMAINING_SECONDS = Math.floor((DURATION % MILLISECONDS_OF_A_MINUTE) / MILLISECONDS_OF_A_SECOND);

        // Mostrar cambios
        contadorFechaCaja.textContent = REMAINING_DAYS + "D / ";
        contadorTiempoCaja.textContent = REMAINING_HOURS + ":" + REMAINING_MINUTES + ":" + REMAINING_SECONDS;
    }

    updateCountdown();
    // Refrescar cada segundo que pase
    setInterval(updateCountdown, MILLISECONDS_OF_A_SECOND);

}

hacerCuentaAtras();