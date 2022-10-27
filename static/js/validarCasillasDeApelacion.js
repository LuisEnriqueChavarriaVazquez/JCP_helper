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
function apelar(valorFinal, inputResolucion, textoConfirmacion){
    let textoParaConfirmar = document.getElementById(textoConfirmacion);
    console.log('textoParaConfirmar', textoParaConfirmar)
    if(valorFinal == "bien"){
        textoParaConfirmar.innerHTML = `<b><i class="material-icons md-24">thumb_up</b>`;
        textoParaConfirmar.classList.add('resolucionFormato');
    }else if(valorFinal == "mal"){
        textoParaConfirmar.innerHTML = `<b><i class="material-icons md-24">thumb_down</b>`;
        textoParaConfirmar.classList.add('resolucionFormato');
    }
}