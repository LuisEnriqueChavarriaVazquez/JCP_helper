$(document).ready(function () {
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
                    <button onclick="agregarRespuesta('opt1_` + m + "a" + `','opt1Button_` + m + `')" id="opt1_` + m + "a" + `" class="btn color5 bordered5 coloredText letterStyleViewCuestionario">A</button><div class="colorGrey bordered1 opcionStyleViewCuestionario">` + preguntasModalArray1[m][3] + `</div>
                    <button onclick="agregarRespuesta('opt1_` + m + "b" + `','opt1Button_` + m + `')" id="opt1_` + m + "b" + `" class="btn color5 bordered5 coloredText letterStyleViewCuestionario">B</button><div class="colorGrey bordered1 opcionStyleViewCuestionario">` + preguntasModalArray1[m][4] + `</div>
                    <button onclick="agregarRespuesta('opt1_` + m + "c" + `','opt1Button_` + m + `')" id="opt1_` + m + "c" + `" class="btn color5 bordered5 coloredText letterStyleViewCuestionario">C</button><div class="colorGrey bordered1 opcionStyleViewCuestionario">` + preguntasModalArray1[m][5] + `</div>
                    <button onclick="agregarRespuesta('opt1_` + m + "d" + `','opt1Button_` + m + `')" id="opt1_` + m + "d" + `" class="btn color5 bordered5 coloredText letterStyleViewCuestionario">D</button><div class="colorGrey bordered1 opcionStyleViewCuestionario">` + preguntasModalArray1[m][6] + `</div>
                </div>
                
                <div class="preguntaBox colorGreyDarker bordered1" id="opt1Button_` + m + `"><b>R:</b></div>
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
            <h5 class="tituloPregunta"><b>Ejercicio ` + (k + 1) + `</b></h5>
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
            let opcionesContainerStyleViewCuestionarioArrastrar = document.getElementsByClassName('opcionesContainerStyleViewCuestionarioArrastrar');
            var concepto_y_definiciones = [];
            let conceptoTotal = [];
            let definicionTotal = [];

            for (var y = 0; y < preguntasModalArray4.length; y++) {
                //Guardamos todos los conceptos y definicioness
                concepto_y_definiciones.push(Object.values(preguntasModalArray4[y]));
                //Eliminamos el primer elemento (descripcion del problema)
                concepto_y_definiciones[y].shift();
                //Reiniciamos nuestras lista cada que se recorre una pregunta entera
                var concepto = [];
                var definicion = [];
                for (var x = 0; x < concepto_y_definiciones[y].length; x++) {
                    //Guardamos solo el concepto en una lista
                    concepto.push("<div class='arrastrarElemento arrastrarElementoC shadow-1e colorGrey'>" + concepto_y_definiciones[y][x].substr(0, concepto_y_definiciones[y][x].indexOf('*')) + "</div>");
                    //Guardamos solo las definiciones en una lista
                    definicion.push("<div class='arrastrarElemento arrastrarElementoD shadow-1e colorGreyDarker'>" + concepto_y_definiciones[y][x].substr(concepto_y_definiciones[y][x].indexOf('*') + 1) + "</div>");
                }
                conceptoTotal.push(concepto);
                definicionTotal.push(definicion);
            }

            //Aqui tenemos los conceptos y las definiciones TODAS SEPARADAS Y POR PREGUNTA
            console.log(conceptoTotal);
            console.log(definicionTotal);

            //Aqui lo que se alamcena es el encabezado del contenido
            let inicioContenido;
            function crearInicio(numero) {
                inicioContenido =
                    `  
            <h5 class="tituloPregunta"><b>Ejercicio arrastrar ` + (numero + 1) + `</b></h5>
            <hr>
            <div class="preguntaBox colorGrey bordered1"><b>` + preguntasModalArray4[numero][0] + `</b></div>
            <h6><b>Relación de palabras.</b></h6>
            <div class="opcionesContainerStyleViewCuestionarioArrastrar">`;
                return inicioContenido;
            }

            //Este es el div que cierra el contenido
            let finalContenido = `</div>`;

            //Aqui hacemos la impresion de los elementos (conceptos y definiciones dentro del contenido)
            for (var t = 0; t < preguntasModalArray4.length; t++) {
                var final;
                final = crearInicio(t);
                for (var u = 0; u < conceptoTotal[t].length; u++) {
                    final += conceptoTotal[t][u] + definicionTotal[t][u];
                }
                final += finalContenido;
                contenedoresPregunta[t].innerHTML = final;
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
                <div class="opcionesContainerStyleViewCuestionarioTrueFalse">
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
        //ingresarPreguntasAcompletar();
        //ingresarPreguntasEjercicios();
        //ingresarPreguntasArrastrar();
        //ingresarPreguntasTrueFalse();
        //ingresarPreguntasAbiertas();

        //////////////////////////////////////////////////////
        //////////////////////////////////////////////////////    
        //////////////////////////////////////////////////////
        ////////////VALIDACIONES DE ELEMENTOS EN PANTALLA

        /*Validacion de eliminar los astericos en los textos de arrastrar*/
        //Tramiento de texto arrastrar
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

            let arrastrarElemento = document.getElementsByClassName('arrastrarElemento');
            for (var i = 0; i < arrastrarElemento.length; i++) {
                if (arrastrarElemento[i].innerText == "undefined" || arrastrarElemento[i].innerText == "") {
                    arrastrarElemento[i].innerText = "--------";
                }
            }
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

        //Validamos el ancho del contenedor para aplicar estilos.
        function validarWidthContador() {
            let contenedorOperacionesLive = document.getElementById('contenedorLive');
            let previewJsonResponderButton = document.getElementById('previewJsonResponder');

            //En caso de que sea la primera vez que el usuario entre debe detectar el with y hace los cambios
            validar();

            //Hace la validacion en tiempo real
            window.addEventListener("resize", function () {
                validar();
            });

            //La funcion con la validacion
            function validar() {
                if (window.innerWidth < 1000) {
                    contenedorOperacionesLive.classList.remove('contenedorOperacionesLive');
                    contenedorOperacionesLive.classList.add('contenedorOperacionesLiveMobile');
                    previewJsonResponderButton.classList.remove('btn-large');
                    previewJsonResponderButton.classList.add('btn');
                } else if (window.innerWidth > 1000) {
                    contenedorOperacionesLive.classList.add('contenedorOperacionesLive');
                    contenedorOperacionesLive.classList.remove('contenedorOperacionesLiveMobile');
                    previewJsonResponderButton.classList.add('btn-large');
                    previewJsonResponderButton.classList.remove('btn');
                }
            }
        }
        validarWidthContador();

        //Debe hacer que los titulos de las preguntas sean sticky
        $(document).ready(function () {
            //Se modifca el buscador cuando se hace scroll down
            let tituloPregunta = document.getElementsByClassName('tituloPregunta');

            $(window).scroll(function () {
                for (var j = 0; j < tituloPregunta.length; j++) {
                    if ($(window).scrollTop() > (50)) {
                        tituloPregunta[j].classList.add('color1');
                        tituloPregunta[j].classList.add('colorText');
                        tituloPregunta[j].classList.add('paddingTituloAdicional');
                        tituloPregunta[j].classList.add('shadow-1e');
                        tituloPregunta[j].classList.add('bordered1');
                    } else {
                        tituloPregunta[j].classList.remove('color1');
                        tituloPregunta[j].classList.remove('colorText');
                        tituloPregunta[j].classList.remove('paddingTituloAdicional');
                        tituloPregunta[j].classList.remove('shadow-1e');
                        tituloPregunta[j].classList.remove('bordered1');
                    }
                }
            });
        });

        //Imprimimos la data obtenida
        //console.log(typeof dataCuestionarioJSON);
        //console.log(dataCuestionarioJSON);
    }

    obtenerDataCuestionario();
});
