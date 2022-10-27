/*
*   Obtenemos el tiempo de las respuesta
*   desde que el alumno comenzó hasta que lo mando
*/
const tiempoRespuestas = () =>{
    //Declaramos los contadores de tiempo
    let contadorSegundos = 0;
    let contadorMinutos = 0;
    let contadorHoras = 0;

    //Accedemos al input donde se guarda la hora
    let tiempoRespuestas = document.getElementById('tiempoRespuestas');

    setInterval(() => {
        //Contamos cada segundo
        contadorSegundos += 1;
        //console.log('contadorSegundos', contadorSegundos)

        //Contamos cada minuto
        if(contadorSegundos == 60){
            contadorMinutos += 1;
            contadorSegundos = 0;
            //console.log('contadorMinutos', contadorMinutos)
        }
        //Contamos cada hora
        if(contadorMinutos == 60){
            contadorHoras += 1;
            contadorMinutos = 0;
            //console.log('contadorHoras', contadorHoras)
        }

        tiempoRespuestas.value = `${contadorHoras}h:${contadorMinutos}m:${contadorSegundos}s`;

    }, 1000);
}
tiempoRespuestas();