function obtenerDataCuestionario() {
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////    
    //////////////////////////////////////////////////////
    ////////////ACCESO A DATOS

    //Convetimos el objeto en un string con formato
    stringJSON = JSON.stringify(dataCuestionarioJSON, null, 1);

    //Obtenemos cada una de las listas dentro del objeto
    const ordenPreguntas = dataCuestionarioJSON.ordenPreguntas;
    const preguntasModal1 = dataCuestionarioJSON.preguntasModal1;
    const preguntasModal2 = dataCuestionarioJSON.preguntasModal2;
    const preguntasModal3 = dataCuestionarioJSON.preguntasModal3;
    const preguntasModal4 = dataCuestionarioJSON.preguntasModal4;
    const preguntasModal5 = dataCuestionarioJSON.preguntasModal5;
    const preguntasModal6 = dataCuestionarioJSON.preguntasModal6;

    //Convertirmos los objetos en listas
    const preguntasModalArray1 = Object.values(preguntasModal1);
    const preguntasModalArray2 = Object.values(preguntasModal2);
    const preguntasModalArray3 = Object.values(preguntasModal3);
    const preguntasModalArray4 = Object.values(preguntasModal4);
    const preguntasModalArray5 = Object.values(preguntasModal5);
    const preguntasModalArray6 = Object.values(preguntasModal6);

    //Forma de acceder a las preguntas y elemento
    //Primer indice indica el numero de pregunta
    //Segundo indice indica el dato de la pregunta

    //console.log(ordenPreguntas[0]);
    // console.log(preguntasModal1[0]);
    // console.log(preguntasModal2[0]);
    // console.log(preguntasModal3[0]);
    // console.log(preguntasModal4[0]);
    // console.log(preguntasModal5[0]);
    // console.log(preguntasModal6[0]);

    //Contamos la preguntas
    function contarPreguntas() {
        listadoPreguntas = Object.values(ordenPreguntas[0]);
        return listadoPreguntas.length;
    }

    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////    
    //////////////////////////////////////////////////////
    ////////////INSERCION DE ELEMENTOS

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
                <h5 class="tituloPregunta"><b>Ejercicio opción múltiple ` + (m + 1) + `</b></h5>
                <hr>
                <div class="preguntaBox colorGrey bordered1"><b>` + preguntasModalArray1[m][0] + `</b></div>
                <div class="imagenBox bordered1 shadow-1e colorGrey">
                    <h6><b>Imagen adjunta.</b></h6>
                    <img alt='not available image' class="materialboxed imagenBoxContent bordered1" src="` + preguntasModalArray1[m][1] + `"></img>
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
                <h5 class="tituloPregunta"><b>Ejercicio rellenar espacio ` + (m + 1) + `</b></h5>
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
            <h5 clss="tituloPregunta"><b>Ejercicio ` + (k + 1) + `</b></h5>
            <hr>
            <div class="preguntaBox colorGrey bordered1"><b>` + preguntasModalArray3[k][0] + `</b></div>
            <div class="imagenBox bordered1 shadow-1e colorGrey">
                <h6><b>Imagen adjunta.</b></h6>
                <img alt='not available image' class="materialboxed imagenBoxContent bordered1" src="` + preguntasModalArray3[k][1] + `"></img>
            </div>
            <h6><b>Preview de propuesta de código.</b></h6>
            <div class="codeContainerBox"><pre class="previewCodeContainer colorText bordered1">` + preguntasModalArray3[k][3] + `</pre></div>
            <div class="preguntaBox outputEsperado color4 bordered1"><b>Output: ` + preguntasModalArray3[k][4] + `</b></div>
            <div class="contendorRecursoOnlineBox recursoOnlineEjercicios"> 
            <a href="` + preguntasModalArray3[k][2] + `" class="recursoOnlineEjerciciosLink waves-effect waves-light btn colorGreyDarker colorTextReverse bordered1 btnPreguntaStyleFormat"><i class="material-icons left">cloud</i>Acceder a recurso online</a>
            </div>
            `;

            contenedoresPregunta[k].innerHTML = contenido;
        }
    }

    function ingresarPreguntasArrastrar() {
        //Ingresamos los elementos
        insertarCajasPreguntas(preguntasModalArray4.length, 'opt4');
        //Accedemos a las cajas
        let contenedoresPregunta = document.getElementsByClassName('opt4');
        //Hacemos variables de pregunta
        let dato1_pregunta;

        for (var m = 0; m < preguntasModalArray4.length; m++) {
            //Contenido de la pregunta
            let contenido =
                `  
                <h5 class="tituloPregunta"><b>Ejercicio arrastrar ` + (m + 1) + `</b></h5>
                <hr>
                <div class="preguntaBox colorGrey bordered1"><b>` + preguntasModalArray4[m][0] + `</b></div>
                <h6><b>Relación de palabras.</b></h6>
                <div class="opcionesContainerStyleViewCuestionarioArrastrar">
                    <div class="colorGreyDarker bordered1 arrastrarContenedorOpcionView">`+ preguntasModalArray4[m][1] + `</div>
                    <div class="colorGreyDarker bordered1 arrastrarContenedorOpcionView">`+ preguntasModalArray4[m][2] + `</div>
                    <div class="colorGreyDarker bordered1 arrastrarContenedorOpcionView">`+ preguntasModalArray4[m][3] + `</div>
                    <div class="colorGreyDarker bordered1 arrastrarContenedorOpcionView">`+ preguntasModalArray4[m][4] + `</div>
                    <div class="colorGreyDarker bordered1 arrastrarContenedorOpcionView">`+ preguntasModalArray4[m][5] + `</div>
                    <div class="colorGreyDarker bordered1 arrastrarContenedorOpcionView">`+ preguntasModalArray4[m][6] + `</div>
                    <div class="colorGreyDarker bordered1 arrastrarContenedorOpcionView">`+ preguntasModalArray4[m][7] + `</div>
                    <div class="colorGreyDarker bordered1 arrastrarContenedorOpcionView">`+ preguntasModalArray4[m][8] + `</div>
                    <div class="colorGreyDarker bordered1 arrastrarContenedorOpcionView">`+ preguntasModalArray4[m][9] + `</div>
                    <div class="colorGreyDarker bordered1 arrastrarContenedorOpcionView">`+ preguntasModalArray4[m][10] + `</div>
                </div>
            `;
            contenedoresPregunta[m].innerHTML = contenido;
        }
    }

    function ingresarPreguntasTrueFalse() {
        //Ingresamos los elementos
        insertarCajasPreguntas(preguntasModalArray5.length, 'opt5');
        //Accedemos a las cajas
        let contenedoresPregunta = document.getElementsByClassName('opt5');

        //Hacemos variables de pregunta
        let dato1_pregunta, respuesta;

        for (var m = 0; m < preguntasModalArray5.length; m++) {
            //Contenido de la pregunta
            let contenido =
                `  
                <h5 class="tituloPregunta"><b>Pregunta True/False ` + (m + 1) + `</b></h5>
                <hr>
                <div class="preguntaBox colorGrey bordered1"><b>` + preguntasModalArray5[m][0] + `</b></div>
                <h6><b>Resultado.</b></h6>
                <div class="opcionesContainerStyleViewCuestionarioArrastrar">
                    <div class="preguntaBoxFalseTrue color5 coloredText bordered1"><b>` + preguntasModalArray5[m][1] + `</b></div>
                </div>
            `;
            contenedoresPregunta[m].innerHTML = contenido;
        }
    }

    function ingresarPreguntasAbiertas() {
        //Ingresamos los elementos
        insertarCajasPreguntas(preguntasModalArray6.length, 'opt6');
        //Accedemos a las cajas
        let contenedoresPregunta = document.getElementsByClassName('opt6');

        //Hacemos variables de pregunta
        let dato1_pregunta, videoPregunta, imagenPregunta;

        for (var m = 0; m < preguntasModalArray6.length; m++) {
            //Contenido de la pregunta
            let contenido =
                `  
                <h5 class="tituloPregunta"><b>Pregunta abierta ` + (m + 1) + `</b></h5>
                <hr>
                <h6><b>Descripción.</b></h6>
                <div class="preguntaBox colorGrey bordered1"><b>` + preguntasModalArray6[m][0] + `</b></div>
                <div class="imagenBox bordered1 shadow-1e colorGrey">
                    <h6><b>Imagen adjunta.</b></h6>
                    <img alt='not available image' class="materialboxed imagenBoxContent bordered1" src="` + preguntasModalArray6[m][2] + `"></img>
                </div>
                <div class="contendorRecursoOnlineBox recursoOnlineEjercicios"> 
                    <h6><b>Media.</b></h6>
                    <a href="` + preguntasModalArray6[m][1] + `" class="recursoOnlineEjerciciosLink waves-effect waves-light btn colorGreyDarker colorTextReverse bordered1 btnPreguntaStyleFormat"><i class="material-icons left">play_arrow</i>Acceder a video online</a>
                </div>
            `;
            contenedoresPregunta[m].innerHTML = contenido;
        }
    }

    ingresarPreguntasOpcionMultiple();
    ingresarPreguntasAcompletar();
    ingresarPreguntasEjercicios();
    ingresarPreguntasArrastrar();
    ingresarPreguntasTrueFalse();
    ingresarPreguntasAbiertas();

    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////    
    //////////////////////////////////////////////////////
    ////////////VALIDACIONES DE ELEMENTOS EN PANTALLA

    /*Validacion de eliminar los astericos en los textos de arrastrar*/
    //Tramiento de texto arrastrar
    function eliminarAsteriscos() {
        let arrastrarContenedorOpcionView = document.getElementsByClassName('arrastrarContenedorOpcionView');
        for (var i = 0; i < arrastrarContenedorOpcionView.length; i++) {
            let textosContendor = arrastrarContenedorOpcionView[i].innerText;
            textosContendor = textosContendor.replace("**", " ➡️ ");
            arrastrarContenedorOpcionView[i].innerText = textosContendor;
        }
    }
    eliminarAsteriscos();

    function validarRecursosAdicionales() {
        let recursoOnlineEjercicios = document.getElementsByClassName('recursoOnlineEjercicios');
        let recursoOnlineEjerciciosLink = document.getElementsByClassName('recursoOnlineEjerciciosLink');

        for (var i = 0; i < recursoOnlineEjerciciosLink.length; i++) {
            if (recursoOnlineEjerciciosLink[i].getAttribute('href').length == 0) {
                recursoOnlineEjercicios[i].classList.add('hiddenElement');
            }
        }
    }
    validarRecursosAdicionales();

    /*Validaciones en caso de que el valor este vacio*/
    //Valida las de opcion multiple y las blank
    function validarTextosIndefinidos() {
        let textosBasicos = document.getElementsByClassName('opcionStyleViewCuestionario');
        let adicionTexto = document.getElementsByClassName('letterStyleViewCuestionario');
        for (var i = 0; i < textosBasicos.length; i++) {
            if (textosBasicos[i].innerText == "undefined" || textosBasicos[i].innerText == "") {
                textosBasicos[i].innerText = "--------";
            }
        }

        let arrastrarContenedorOpcionView = document.getElementsByClassName('arrastrarContenedorOpcionView');
        for (var i = 0; i < arrastrarContenedorOpcionView.length; i++) {
            if (arrastrarContenedorOpcionView[i].innerText == "undefined" || arrastrarContenedorOpcionView[i].innerText == "") {
                arrastrarContenedorOpcionView[i].classList.add('hiddenElement');
            }
        }
        //console.log(arrastrarContenedorOpcionView);
    }
    validarTextosIndefinidos();

    //Validamos que la imagen tenga contenido
    function validarImagenFuente() {
        let imagenBoxContent = document.getElementsByClassName('imagenBoxContent');
        let imagenBox = document.getElementsByClassName('imagenBox');

        for (var i = 0; i < imagenBoxContent.length; i++) {
            if (imagenBoxContent[i].getAttribute('src') == "") {
                imagenBox[i].classList.add('hiddenElement');
            }
        }
    }
    validarImagenFuente();

    //Validamos en caso de que el output este vacio
    function validarOutput() {
        let outputEsperado = document.getElementsByClassName('outputEsperado');
        for (var i = 0; i < outputEsperado.length; i++) {
            if (outputEsperado[i].innerText == "Output:") {
                outputEsperado[i].innerHTML = "<b>Output: -----</b>";
            }
        }
    }
    validarOutput();

    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////    
    //////////////////////////////////////////////////////
    ////////////CONTAR ELEMENTOS (PANEL LATERAL)

    //Cuenta el total de las preguntas
    function imprimirConteoTotalPreguntas() {
        let numeroPreguntas = contarPreguntas();
        let contadorTotalTexto = document.getElementById('contadorTotal');

        contadorTotalTexto.innerText = numeroPreguntas;
    }
    imprimirConteoTotalPreguntas();

    //Imprime el conteo solo por tipo de pregunta
    function imprimirConteoPreguntasSecundarias() {
        //Almacenes para los contenedores de preguntas
        let opt1, opt2, opt3, opt4, opt5, opt6;

        //Cantidad de elementos en pantalla
        opt1 = document.getElementsByClassName('opt1').length;
        opt2 = document.getElementsByClassName('opt2').length;
        opt3 = document.getElementsByClassName('opt3').length;
        opt4 = document.getElementsByClassName('opt4').length;
        opt5 = document.getElementsByClassName('opt5').length;
        opt6 = document.getElementsByClassName('opt6').length;

        //TEXTOS DONDE DESPLEGAR ESOS ELEMENTOS
        let contadorOpt1 = document.getElementById('contadorOpt1');
        let contadorOpt2 = document.getElementById('contadorOpt2');
        let contadorOpt3 = document.getElementById('contadorOpt3');
        let contadorOpt4 = document.getElementById('contadorOpt4');
        let contadorOpt5 = document.getElementById('contadorOpt5');
        let contadorOpt6 = document.getElementById('contadorOpt6');

        //Ingresamos los textos.
        contadorOpt1.innerText = opt1;
        contadorOpt2.innerText = opt2;
        contadorOpt3.innerText = opt3;
        contadorOpt4.innerText = opt4;
        contadorOpt5.innerText = opt5;
        contadorOpt6.innerText = opt6;
    }
    imprimirConteoPreguntasSecundarias();

    //Validamos el ancho del contenedor para aplicar estilos.
    function validarWidthContador(){
        let contenedorOperacionesLive = document.getElementById('contenedorLive');
        let previewJsonResponderButton = document.getElementById('previewJsonResponder');
        
        //En caso de que sea la primera vez que el usuario entre debe detectar el with y hace los cambios
        validar();

        //Hace la validacion en tiempo real
        window.addEventListener("resize", function() {
            validar();
        });

        //La funcion con la validacion
        function validar(){
            if(window.innerWidth < 1000){
                contenedorOperacionesLive.classList.remove('contenedorOperacionesLive');
                contenedorOperacionesLive.classList.add('contenedorOperacionesLiveMobile');
                previewJsonResponderButton.classList.remove('btn-large');
                previewJsonResponderButton.classList.add('btn');
            }else if(window.innerWidth > 1000){
                contenedorOperacionesLive.classList.add('contenedorOperacionesLive');
                contenedorOperacionesLive.classList.remove('contenedorOperacionesLiveMobile');
                previewJsonResponderButton.classList.add('btn-large');
                previewJsonResponderButton.classList.remove('btn');
            }
        }
    }
    validarWidthContador();

    //Debe hacer que los titulos de las preguntas sean sticky
    function hacerTituloPreguntaSticky(){
        let tituloPregunta = document.getElementsByClassName('tituloPregunta');
    }
    hacerTituloPreguntaSticky();


    //Imprimimos la data obtenida
    //console.log(typeof dataCuestionarioJSON);
    //console.log(dataCuestionarioJSON);
}

obtenerDataCuestionario();
