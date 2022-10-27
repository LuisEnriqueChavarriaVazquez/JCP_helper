//ESTE CONTADOR ES PARA LOS DÍAS Y HORAS DISPONIBLES HASTA DETERMINADA FECHA
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
    //El formato debe ser asi '04/13/2020 0:01 AM'
    fechaFinal = contadorFecha + " " +  contadorTiempo;
    //console.log('fechaFinal', fechaFinal)
    
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
        contadorFechaCaja.textContent = REMAINING_DAYS + "D/";
        contadorTiempoCaja.textContent = REMAINING_HOURS + "h:" + REMAINING_MINUTES + "m:" + REMAINING_SECONDS + "s";

        if(REMAINING_DAYS < 0){
            contadorFechaCaja.textContent = "No time";
            contadorTiempoCaja.textContent = ""
        }
    }

    updateCountdown();
    // Refrescar cada segundo que pase
    setInterval(updateCountdown, MILLISECONDS_OF_A_SECOND);

}
hacerCuentaAtras();

//Este tiene que ver con el tiempo dispible para el envio de cuestionario (cronometro regresivo)
function hacerCronometroRegresivo(){
    //Obtenemos el contenedor del cronometro
    let tiempoRestanteCaja = document.getElementById('tiempoRestante');
    let tiempoRestante = tiempoRestanteCaja.textContent;

    function startTimer(duration, display) {
        var timer = duration, minutes, seconds;
        counterTime = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
            
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            
            display.textContent = minutes + ":" + seconds;
            
            if (--timer < 0) {
                clearInterval(counterTime);
                tiempoRestanteCaja.innerText = "No time";
            }

        }, 1000);

    }
    
    function tiempo() {
        //Accedemos a sus valores y Separamos el formato de manera que queden horas y segundo aparte
        let horasTiempo, minutosTiempo;
        horasTiempo = tiempoRestante.substring(0, tiempoRestante.indexOf(':'));
        minutosTiempo = tiempoRestante.substring(tiempoRestante.indexOf(':') + 1);
        //Obtenemos la cantidad total de minutos
        minutosFinal = (horasTiempo*60*60) + (minutosTiempo*60);

        display = document.querySelector('#tiempoRestante');
        startTimer(minutosFinal, display);
    }
    tiempo();
}
hacerCronometroRegresivo();