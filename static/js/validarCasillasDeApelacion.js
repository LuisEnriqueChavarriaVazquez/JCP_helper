function validacionContenedorApelacion() {
    //Accedo a los contenedores de apelacion
    let contenedorApelaciones = document.getElementsByClassName('contenedorApelaciones');

    //Accedemos a todos los inputs de la respuestas
    let rightAnswerGlobal = document.getElementsByClassName('rightAnswerGlobal');

    //Ocultamos en donde la respuesta esta bien.
    for (var i = 0; i < contenedorApelaciones.length; i++) {
        if (rightAnswerGlobal[i].value == "bien") {
            contenedorApelaciones[i].classList.add('hiddenElement');
        }
    }
}
validacionContenedorApelacion();

///Desarrollamos la funcion de apelar
function apelar(valorFinal, inputResolucion, textoConfirmacion, ponderacionBoxValue) {
    //////////////////////////////
    let textoParaConfirmar = document.getElementById(textoConfirmacion);
    let inputResolucionGet = document.getElementById(inputResolucion);
    //Obtenemos el valor de la ponderacion
    let ponderacionValue = document.getElementById(ponderacionBoxValue).innerText;
    ponderacionValue = ponderacionValue.replace('pts.', '');
    //Esta funcion es para volver a recalcular valores con cada revision de cada pregunta.
    function ajustesValores() {
        //Removemos la clase de opt6 para que el software calcule el promedio una vez que no haya pendientes.
        if (inputResolucionGet.getAttribute('class').indexOf('rightAnswerOpt6') != -1) {
            inputResolucionGet.classList.remove('opt6Pendiente');
        } else if (inputResolucionGet.getAttribute('class').indexOf('rightAnswerOpt3') != -1) {
            inputResolucionGet.classList.remove('opt3Pendiente');
        }

        //Se calcula el puntaje total
        calcularPuntajeRevisado();

        //Calculamos el promedio de nuevo
        calcularPromedio();

        //Sumamos los puntajes segmentados del alumno
        if (inputResolucionGet.getAttribute('class').indexOf('rightAnswerOpt1') != -1) {
            puntajeSegmentadoPorTipoPreguntaAlumno[0] = puntajeSegmentadoPorTipoPreguntaAlumno[0] + parseInt(ponderacionValue);
        } else if (inputResolucionGet.getAttribute('class').indexOf('rightAnswerOpt2') != -1) {
            puntajeSegmentadoPorTipoPreguntaAlumno[1] = puntajeSegmentadoPorTipoPreguntaAlumno[1] + parseInt(ponderacionValue);
        } else if (inputResolucionGet.getAttribute('class').indexOf('rightAnswerOpt3') != -1) {
            puntajeSegmentadoPorTipoPreguntaAlumno[2] = puntajeSegmentadoPorTipoPreguntaAlumno[2] + parseInt(ponderacionValue);
        } else if (inputResolucionGet.getAttribute('class').indexOf('rightAnswerOpt4') != -1) {
            puntajeSegmentadoPorTipoPreguntaAlumno[3] = puntajeSegmentadoPorTipoPreguntaAlumno[3] + parseInt(ponderacionValue);
        } else if (inputResolucionGet.getAttribute('class').indexOf('rightAnswerOpt5') != -1) {
            puntajeSegmentadoPorTipoPreguntaAlumno[4] = puntajeSegmentadoPorTipoPreguntaAlumno[4] + parseInt(ponderacionValue);
        } else if (inputResolucionGet.getAttribute('class').indexOf('rightAnswerOpt6') != -1) {
            puntajeSegmentadoPorTipoPreguntaAlumno[5] = puntajeSegmentadoPorTipoPreguntaAlumno[5] + parseInt(ponderacionValue);
        }

        //Reiniciamos a default los puntajes globales dados.
        puntajeSegmentadoPorTipoPregunta = [];
        asignarPonderaciones();
        console.log('puntajeSegmentadoPorTipoPreguntaAlumno', puntajeSegmentadoPorTipoPreguntaAlumno);

        //Validamos la parte del estado del cuestionario y los mensajes de alerta
        let estadoCuestionarioValue = estadoRevisionCuestionario();
        console.log('estadoCuestionarioValue', estadoCuestionarioValue)
        validacionMensajes(estadoCuestionarioValue);

        //Cargamos los valores en los inputs para la DB
        evaluacionEstado(estadoCuestionarioValue);

    };


    if (valorFinal == "bien") {
        //Insertamos graficamente un indicador de la apelacion
        textoParaConfirmar.innerHTML = `<b><i class="material-icons md-24">thumb_up</b>`;
        textoParaConfirmar.classList.add('resolucionFormato');
        //Insertamos el valor
        inputResolucionGet.value = valorFinal;

        //Sumamos la ponderacion
        ponderacionGlobal = ponderacionGlobal + parseInt(ponderacionValue);

        ajustesValores();

    } else if (valorFinal == "mal") {
        //Insertamos graficamente un indicador de la apelacion
        textoParaConfirmar.innerHTML = `<b><i class="material-icons md-24">thumb_down</b>`;
        textoParaConfirmar.classList.add('resolucionFormato');
        //Insertamos el valor
        inputResolucionGet.value = valorFinal;

        //Sumamos la ponderacion como cero (porque esta mal)
        ponderacionGlobal = ponderacionGlobal + 0;

        ajustesValores();
    }
};