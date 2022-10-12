function obtenerDataCuestionario() {
    //Convetimos el objeto en un string con formato
    stringJSON = JSON.stringify(dataCuestionarioJSON, null, 1);

    //Obtenemos cada una de las listas dentro del objeto
    const ordenPreguntas = dataCuestionarioJSON.ordenPreguntas;
    const preguntasModal1 = dataCuestionarioJSON.preguntasModal1;
    const preguntasModal2 = dataCuestionarioJSON.preguntasModal2;
    const preguntasModal3 = dataCuestionarioJSON.preguntasModal3;
    const preguntasModal4 = dataCuestionarioJSON.preguntasModal4;
    //Convertirmos los objetos en listas
    const preguntasModalArray1 = Object.values(preguntasModal1);
    const preguntasModalArray2 = Object.values(preguntasModal2);
    const preguntasModalArray3 = Object.values(preguntasModal3);
    const preguntasModalArray4 = Object.values(preguntasModal4);


    //Forma de acceder a las preguntas y elemento
    //Primer indice indica el numero de pregunta
    //Segundo indice indica el dato de la pregunta

    //console.log(ordenPreguntas[0]);
    // console.log(preguntasModal1[0]);
    // console.log(preguntasModal2[0]);
    // console.log(preguntasModal3[0]);
    // console.log(preguntasModal4[0]);

    //Contamos la preguntas
    function contarPreguntas() {
        listadoPreguntas = Object.values(ordenPreguntas[0]);
        return listadoPreguntas.length;
    }

    //Insertamos cajas de acuerdo a la cantidad de preguntas
    function insertarCajasPreguntas(numeroPregunta, tipo) {
        const contenedorPadre = document.getElementById('contenedorPreguntasPreview');
        let contenedor;

        for (var t = 0; t < numeroPregunta; t++) {
            contenedor = `<div class="` + tipo + ` bordered2 colorGreyWhiter shadow-1e preguntaContainerIndividualPreview"></div>`;
            contenedorPadre.innerHTML += contenedor;
        }
    }

    //Preguntas de opcion multiple
    function ingresarPreguntasOpcionMultiple() {
        //Ingresamos los elementos
        insertarCajasPreguntas(preguntasModalArray1.length, 'opt1');
        //Accedemos a las cajas
        let contenedoresPregunta = document.getElementsByClassName('opt1');
        //Hacemos variables de pregunta
        let dato1_pregunta, dato2_media, dato3_respuestaCorrecta, dato4_opt1, dato5_opt2, dato6_opt3, dato7_opt4;

        for (var m = 0; m < preguntasModalArray1.length; m++) {
            //Contenido de la pregunta
            let contenido =
                `  
                <h5><b>Ejercicio opcion multiple ` + (m + 1) + `</b></h5>
                <hr>
                <div class="preguntaBox colorGrey bordered1"><b>` + preguntasModalArray1[m][0] + `</b></div>
                <div class="imagenBox bordered1 shadow-1e">
                    <img class="bordered1" src="` + preguntasModalArray1[m][1] + `"></img>
                </div>
                <h6><b>Opciones de la pregunta.</b></h6>
                <div class="opcionesContainerStyleViewCuestionario">
                    <div class="color5 bordered5 coloredText letterStyleViewCuestionario">A</div><div class="colorGrey bordered1 opcionStyleViewCuestionario">` + preguntasModalArray1[m][3] + `</div>
                    <div class="color5 bordered5 coloredText letterStyleViewCuestionario">B</div><div class="colorGrey bordered1 opcionStyleViewCuestionario">` + preguntasModalArray1[m][4] + `</div>
                    <div class="color5 bordered5 coloredText letterStyleViewCuestionario">C</div><div class="colorGrey bordered1 opcionStyleViewCuestionario">` + preguntasModalArray1[m][5] + `</div>
                    <div class="color5 bordered5 coloredText letterStyleViewCuestionario">D</div><div class="colorGrey bordered1 opcionStyleViewCuestionario">` + preguntasModalArray1[m][6] + `</div>
                </div>
                <div class="preguntaBox color4 bordered1"><b>Respuesta correcta: ` + preguntasModalArray1[m][2] + `</b></div>
            `;

            contenedoresPregunta[m].innerHTML = contenido;

        }

    }

    //Preguntas acompletar
    function ingresarPreguntasAcompletar() {
        //Ingresamos los elementos
        insertarCajasPreguntas(preguntasModalArray2.length, 'opt2');
        //Accedemos a las cajas
        let contenedoresPregunta = document.getElementsByClassName('opt2');
        //Hacemos variables de pregunta
        let dato1_pregunta;

        for (var m = 0; m < preguntasModalArray2.length; m++) {
            //Contenido de la pregunta
            let contenido =
                `  
                <h5><b>Ejercicio rellenar espacio ` + (m + 1) + `</b></h5>
                <hr>
                <div class="preguntaBox colorGrey bordered1"><b>` + preguntasModalArray2[m][0] + `</b></div>
                <h6><b>Respuestas de espacios.</b></h6>
                <div class="opcionesContainerStyleViewCuestionario">
                    <div class="colorGreyDarker bordered1 colorTextReverse letterStyleViewCuestionario">Blank `+ 1 + `</div>
                    <div class="colorGrey bordered1 opcionStyleViewCuestionario">` + preguntasModalArray2[m][1] + `</div>
                    <div class="colorGreyDarker bordered1 colorTextReverse letterStyleViewCuestionario">Blank `+ 2 + `</div>
                    <div class="colorGrey bordered1 opcionStyleViewCuestionario">` + preguntasModalArray2[m][2] + `</div>
                    <div class="colorGreyDarker bordered1 colorTextReverse letterStyleViewCuestionario">Blank `+ 3 + `</div>
                    <div class="colorGrey bordered1 opcionStyleViewCuestionario">` + preguntasModalArray2[m][3] + `</div>
                    <div class="colorGreyDarker bordered1 colorTextReverse letterStyleViewCuestionario">Blank `+ 4 + `</div>
                    <div class="colorGrey bordered1 opcionStyleViewCuestionario">` + preguntasModalArray2[m][4] + `</div>
                    <div class="colorGreyDarker bordered1 colorTextReverse letterStyleViewCuestionario">Blank `+ 5 + `</div>
                    <div class="colorGrey bordered1 opcionStyleViewCuestionario">` + preguntasModalArray2[m][5] + `</div>
                    <div class="colorGreyDarker bordered1 colorTextReverse letterStyleViewCuestionario">Blank `+ 6 + `</div>
                    <div class="colorGrey bordered1 opcionStyleViewCuestionario">` + preguntasModalArray2[m][6] + `</div>
                    <div class="colorGreyDarker bordered1 colorTextReverse letterStyleViewCuestionario">Blank `+ 7 + `</div>
                    <div class="colorGrey bordered1 opcionStyleViewCuestionario">` + preguntasModalArray2[m][7] + `</div>
                    <div class="colorGreyDarker bordered1 colorTextReverse letterStyleViewCuestionario">Blank `+ 8 + `</div>
                    <div class="colorGrey bordered1 opcionStyleViewCuestionario">` + preguntasModalArray2[m][8] + `</div>
                    <div class="colorGreyDarker bordered1 colorTextReverse letterStyleViewCuestionario">Blank `+ 9 + `</div>
                    <div class="colorGrey bordered1 opcionStyleViewCuestionario">` + preguntasModalArray2[m][9] + `</div>
                    <div class="colorGreyDarker bordered1 colorTextReverse letterStyleViewCuestionario">Blank `+ 10 + `</div>
                    <div class="colorGrey bordered1 opcionStyleViewCuestionario">` + preguntasModalArray2[m][10] + `</div>
                </div>
            `;
            contenedoresPregunta[m].innerHTML = contenido;
        }
    }

    function ingresarPreguntasEjercicios() {
        //Ingresamos los elementos
        insertarCajasPreguntas(preguntasModalArray3.length, 'opt3');
        //Accedemos a las cajas
        let contenedoresPregunta = document.getElementsByClassName('opt3');
        //Hacemos variables de pregunta
        let dato1_ejercicio, dato2_media, dato3_carpetaOnline, dato4_codigo, dato5_output;

        for (var k = 0; k < preguntasModalArray3.length; k++) {
            //Contenido de la pregunta
            let contenido =
                `  
            <h5><b>Ejercicio ` + (k + 1) + `</b></h5>
            <hr>
            <div class="preguntaBox colorGrey bordered1"><b>` + preguntasModalArray3[k][0] + `</b></div>
            <div class="imagenBox bordered1 shadow-1e">
            <img class="bordered1" src="` + preguntasModalArray3[k][1] + `"></img>
            </div>
            <div class="contendorRecursoOnlineBox"> 
            <a href="` + preguntasModalArray3[k][2] + `" class="waves-effect waves-light btn color2 bordered5 btnPreguntaStyleFormat"><i class="material-icons left">cloud</i>Acceder a recurso online</a>
            </div>
            <h6><b>Preview de propuesta de código.</b></h6>
            <div class="codeContainerBox"><pre class="previewCodeContainer colorText bordered1">` + preguntasModalArray3[k][3] + `</pre></div>
            <div class="preguntaBox color4 bordered1"><b>Output esperado: ` + preguntasModalArray3[k][4] + `</b></div>
            `;

            contenedoresPregunta[k].innerHTML = contenido;
        }
    }

    ingresarPreguntasOpcionMultiple();
    ingresarPreguntasAcompletar();
    ingresarPreguntasEjercicios();


    /*Validaciones en caso de que el valor este vacio*/
    //Valida las de opcion multiple y las blank
    function validarTextosIndefinidos(){
        let textosBasicos = document.getElementsByClassName('opcionStyleViewCuestionario');
        let adicionTexto = document.getElementsByClassName('letterStyleViewCuestionario');
        for(var i = 0; i < textosBasicos.length; i++){
            if(textosBasicos[i].innerText == "undefined" || textosBasicos[i].innerText == ""){
                textosBasicos[i].classList.add('hiddenElement');
                adicionTexto[i].classList.add('hiddenElement');
            }
        }
    }
    validarTextosIndefinidos();

    //Imprimimos la data obtenida
    //console.log(typeof dataCuestionarioJSON);
    //console.log(dataCuestionarioJSON);
}

obtenerDataCuestionario();