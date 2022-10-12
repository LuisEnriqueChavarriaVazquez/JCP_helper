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
    function insertarCajasPreguntas() {
        let cantidadPreguntas = contarPreguntas();
        const contenedorPadre = document.getElementById('contenedorPreguntasPreview');
        let contenedor;

        for (var t = 0; t < cantidadPreguntas; t++) {
            contenedor = `<div class="bordered2 colorGreyWhiter shadow-1e preguntaContainerIndividualPreview"></div>`;
            contenedorPadre.innerHTML += contenedor;
        }
    }
    insertarCajasPreguntas();

    //Preguntas ingresadas dependiendo del tipo
    function ingresarPreguntasEjercicios() {
        //Accedemos a las cajas
        let contenedoresPregunta = document.getElementsByClassName('preguntaContainerIndividualPreview');
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
                <div class="preguntaBox color5 bordered1"><b>Output esperado: ` + preguntasModalArray3[k][4] + `</b></div>
            `;

            contenedoresPregunta[k].innerHTML = contenido;
        }


    }

    ingresarPreguntasEjercicios();

    //Imprimimos la data obtenida
    //console.log(typeof dataCuestionarioJSON);
    //console.log(dataCuestionarioJSON);
}

obtenerDataCuestionario();