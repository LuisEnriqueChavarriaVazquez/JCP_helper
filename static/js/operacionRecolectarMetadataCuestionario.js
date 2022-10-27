//////////////////////////////////////////////
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

        //Insertamos el tiempo en el input
        tiempoRespuestas.value = `${contadorHoras}h:${contadorMinutos}m:${contadorSegundos}s`;

    }, 1000);
}
tiempoRespuestas();

//////////////////////////////////////////////
//Debe generar la ruta para los resultados
const rutaResultados = () => {
    //Accedemos al input con la ruta
    const rutaResultados = document.getElementById('rutaResultados');
    //Guardamos el ID del archivo
    const idCuestionarioHecho = rutaResultados.value;
    //Generamos la nueva ruta donde se alamcenó el JSON con las respuestas (en python)
    const rutaArchivoRespuestas = 'static/cuestionariosRespuestas/' + idCuestionarioHecho + '.json';
    //Definimos la ruta en el value
    rutaResultados.value = rutaArchivoRespuestas;
}

rutaResultados();