function validacionContenedorApelacion(){
    //Accedo a los contenedores de apelacion
    let contenedorApelaciones = document.getElementsByClassName('contenedorApelaciones');

    //Accedemos a todos los inputs de la respuestas
    let rightAnswerGlobal = document.getElementsByClassName('rightAnswerGlobal');

    //Ocultamos en donde la respuesta esta bien.
    for(var i = 0; i < contenedorApelaciones.length; i++){
        if(rightAnswerGlobal[i].value == "bien"){
            contenedorApelaciones[i].classList.add('hiddenElement');
        } 
    }
}
validacionContenedorApelacion();

///Desarrollamos la funcion de apelar
function apelar(valorFinal, inputResolucion, textoConfirmacion, ponderacionBoxValue){
    let textoParaConfirmar = document.getElementById(textoConfirmacion);
    let inputResolucionGet = document.getElementById(inputResolucion);
    //Obtenemos el valor de la ponderacion
    let ponderacionValue = document.getElementById(ponderacionBoxValue).innerText;
    ponderacionValue = ponderacionValue.replace('pts.','');

    if(valorFinal == "bien"){
        //Insertamos graficamente un indicador de la apelacion
        textoParaConfirmar.innerHTML = `<b><i class="material-icons md-24">thumb_up</b>`;
        textoParaConfirmar.classList.add('resolucionFormato');
        //Insertamos el valor
        inputResolucionGet.value = valorFinal;

        //Sumamos la ponderacion
        ponderacionGlobal = ponderacionGlobal + parseInt(ponderacionValue);

        //Removemos la clase de opt6 para que el software calcule el promedio una vez que no haya pendientes.
        if(inputResolucionGet.getAttribute('class').indexOf('rightAnswerOpt6') != -1){
            inputResolucionGet.classList.remove('opt6Pendiente');
        }else if(inputResolucionGet.getAttribute('class').indexOf('rightAnswerOpt3') != -1){
            inputResolucionGet.classList.remove('opt3Pendiente');
        }

        
        //Se calcula el puntaje total
        calcularPuntajeRevisado();
        
        //Calculamos el promedio de nuevo
        calcularPromedio();

        //Volvemos a calcular los puntajes por preguntas.
        puntajeSegmentadoPorTipoPregunta = [];
        asignarPonderaciones();
        
    }else if(valorFinal == "mal"){
        //Insertamos graficamente un indicador de la apelacion
        textoParaConfirmar.innerHTML = `<b><i class="material-icons md-24">thumb_down</b>`;
        textoParaConfirmar.classList.add('resolucionFormato');
        //Insertamos el valor
        inputResolucionGet.value = valorFinal;
    }
};