$(document).ready(function () {
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////    
    //////////////////////////////////////////////////////
    ////////////ACCESO A DATOS

    //Convetimos el objeto en un string con formato
    stringJSON = JSON.stringify(dataCuestionarioJSON, null, 1);

    //Obtenemos cada una de las listas dentro del objeto
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

    //Data para el trabajo con las ponderaciones
    const ordenPreguntas = dataCuestionarioJSON.ordenPreguntas;
    const ponderacionPreguntas = dataCuestionarioJSON.ponderacionGlobal;
    const ponderacionPreguntasArray = Object.values(ponderacionPreguntas[0]);
    const ordenPreguntasArray = Object.values(ordenPreguntas[0]);

    console.log('ponderacionPreguntasArray', ponderacionPreguntasArray)
    console.log('ordenPreguntasArray', ordenPreguntasArray)

    //Para saber si el cuestionario es aleatorio
    let ordenCuestionarioValue = document.getElementById('ordenCuestionarioValue').value;
    console.log('ordenCuestionarioValue', ordenCuestionarioValue)


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
    ////////////CONTAR ELEMENTOS (PANEL LATERAL)

    //Cuenta el total de las preguntas
    function imprimirConteoTotalPreguntas() {
        let numeroPreguntas = contarPreguntas();
        let contadorTotalTexto = document.getElementById('contadorTotal');

        contadorTotalTexto.innerText = numeroPreguntas;
    }
    imprimirConteoTotalPreguntas();

    //La otra de conteo de contestadas esta en el html

    //Aqui hay inserciones y validaciones.
    function obtenerDataCuestionario() {
        //////////////////////////////////////////////////////
        //////////////////////////////////////////////////////    
        //////////////////////////////////////////////////////
        ////////////INSERCION DE ELEMENTOS

        //Para revolver grupos de tipos de preguntas
        function randomizerPorTipoPregunta(){
            //Generador alatorio
            //Modifica el orden de las cajas principales, mas no de la pregunta
            function getRandomInt(max) {
                return Math.floor(Math.random() * max);
            }
            let contenedorAleatorio = getRandomInt(3);
            let contenedorElegido;

            if(contenedorAleatorio == 0){
                contenedorElegido = document.getElementById('contenedorPreguntasPreview');
            }else if(contenedorAleatorio == 1){
                contenedorElegido = document.getElementById('contenedorPreguntasPreview2');
            }else if(contenedorAleatorio == 2){
                contenedorElegido = document.getElementById('contenedorPreguntasPreview3');
            }

            return contenedorElegido;
        }

        //Revolver en dos posibles divs a las preguntas de arrastrar (estas deben estar en un solo div para no generar error)
        function randomizerPorTipoPreguntaArrastrar(){
            //Generador alatorio
            //Modifica el orden de las cajas principales, mas no de la pregunta
            function getRandomInt(max) {
                return Math.floor(Math.random() * max);
            }
            let contenedorAleatorio = getRandomInt(2);
            let contenedorElegido;

            if(contenedorAleatorio == 0){
                contenedorElegido = document.getElementById('contenedorPreguntasPreviewArrastrar');
            }else if(contenedorAleatorio == 1){
                contenedorElegido = document.getElementById('contenedorPreguntasPreviewArrastrar2');
            }
            return contenedorElegido;
        }

        //Insertamos cajas de acuerdo a la cantidad de preguntas
        function insertarCajasPreguntas(numeroPregunta, tipo) {
            var contenedorPadre;
            if(ordenCuestionarioValue == "random"){
                contenedorPadre = randomizerPorTipoPregunta();
            }else if(ordenCuestionarioValue == "order_by_type"){
                contenedorPadre = document.getElementById('contenedorPreguntasPreview');
            }else if(ordenCuestionarioValue == "order_by_creation"){
                contenedorPadre = document.getElementById('contenedorPreguntasPreview');
            }

            //Comienza la inserción
            let contenedor;

            for (var t = 0; t < numeroPregunta; t++) {
                contenedor = `<div class="` + tipo + ` bordered2 colorGreyWhiter shadow-1e preguntaContainerIndividualPreview"></div>`;
                contenedorPadre.innerHTML += contenedor;
            }
        }

        //Insertamos cajas de acuerdo a la cantidad de preguntas
        function insertarCajasPreguntasArrastrar(numeroPregunta, tipo) {
            var contenedorPadre;
            if(ordenCuestionarioValue == "random"){
                contenedorPadre = randomizerPorTipoPreguntaArrastrar();
            }else if(ordenCuestionarioValue == "order_by_type"){
                contenedorPadre = document.getElementById('contenedorPreguntasPreviewArrastrar');
            }else if(ordenCuestionarioValue == "order_by_creation"){
                contenedorPadre = document.getElementById('contenedorPreguntasPreviewArrastrar');
            }

            //Comienza la inserción
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
                <h5 class="tituloPregunta"><b>Opción múltiple ` + (m + 1) + `</b></h5>
                <hr>
                <div class="preguntaBox colorGrey bordered1"><b>` + preguntasModalArray1[m][0] + `</b></div>
                <div class="imagenBox bordered1 shadow-1e colorGrey">
                    <h6><b>Imagen adjunta.</b></h6>
                    <img alt='not available image' class="materialboxed imagenBoxContent bordered1" src="` + preguntasModalArray1[m][1] + `"></img>
                </div>
                <h6><b>Opciones de la pregunta.</b></h6>
                <div class="opcionesContainerStyleViewCuestionario">
                    <button onclick="agregarRespuesta('opt1_` + m + "a" + `','opt1Button_` + m + `')" id="opt1_` + m + "a" + `" class="btn waves-effect color5 bordered5 coloredText letterStyleViewCuestionario">A</button><div class="colorGrey bordered1 opcionStyleViewCuestionario">` + preguntasModalArray1[m][3] + `</div>
                    <button onclick="agregarRespuesta('opt1_` + m + "b" + `','opt1Button_` + m + `')" id="opt1_` + m + "b" + `" class="btn waves-effect color5 bordered5 coloredText letterStyleViewCuestionario">B</button><div class="colorGrey bordered1 opcionStyleViewCuestionario">` + preguntasModalArray1[m][4] + `</div>
                    <button onclick="agregarRespuesta('opt1_` + m + "c" + `','opt1Button_` + m + `')" id="opt1_` + m + "c" + `" class="btn waves-effect color5 bordered5 coloredText letterStyleViewCuestionario">C</button><div class="colorGrey bordered1 opcionStyleViewCuestionario">` + preguntasModalArray1[m][5] + `</div>
                    <button onclick="agregarRespuesta('opt1_` + m + "d" + `','opt1Button_` + m + `')" id="opt1_` + m + "d" + `" class="btn waves-effect color5 bordered5 coloredText letterStyleViewCuestionario">D</button><div class="colorGrey bordered1 opcionStyleViewCuestionario">` + preguntasModalArray1[m][6] + `</div>
                </div>
                
                <div class="preguntaBox colorGreyDarker bordered1" id="opt1Button_` + m + `"><b>R:</b></div>
                <div class="ponderacionBox ponderacion_opt1 colorWhite bordered1"></div>
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
            let contenidoIntermedio;

            for (var m = 0; m < preguntasModalArray2.length; m++) {
                var longitudPregunta = Object.values(preguntasModalArray2[m]).length;
                contenedoresPregunta[m].innerHTML = "";
                contenidoIntermedio = "";

                //Contenido de la pregunta
                let contenidoInicial = `  
                <h5 class="tituloPregunta"><b>Rellenar espacio ` + (m + 1) + `</b></h5>
                <hr>
                <div class="preguntaBox colorGrey bordered1"><b>` + preguntasModalArray2[m][0] + `</b></div>
                <h6><b>Respuestas de espacios.</b></h6>
                <div class="opcionesContainerStyleViewCuestionario">
                `;

                for (var t = 1; t < longitudPregunta; t++) {
                    contenidoIntermedio += `
                    <div class="colorGreyDarker bordered1 colorTextReverse letterStyleViewCuestionario">Blank `+ t + `</div>
                    <input type="text" placeholder="text" class="opcionStyleViewCuestionario opt2_`+ m + `"></input>
                    `;
                }

                let contenidoFinal = `
                </div>
                <div class="contendorRecursoOnlineBox recursoOnlineEjercicios"> 
                    <button id="opt2Button_`+ m + `" onclick="agregarRespuestaOpt2('opt2_` + m + `','opt2Button_` + m + `','opt2InputRespuesta_` + m + `')" class="recursoOnlineEjerciciosLink waves-effect waves-light btn colorGreyDarker colorTextReverse bordered1 btnPreguntaStyleFormat"><i class="material-icons left">check</i>Agregar respuestas</button>
                </div>
                <div id="opt2InputRespuesta_`+ m + `" class="preguntaBox colorGreyDarker bordered1"><b>R:</b></div>
                <div class="ponderacionBox ponderacion_opt2 colorWhite bordered1"></div>`;
                contenedoresPregunta[m].innerHTML = contenidoInicial + contenidoIntermedio + contenidoFinal;
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
            <div class="contendorRecursoOnlineBox recursoOnlineEjercicios"> 
            <a href="` + preguntasModalArray3[k][2] + `" class="recursoOnlineEjerciciosLink waves-effect waves-light btn colorGreyDarker colorTextReverse bordered1 btnPreguntaStyleFormat"><i class="material-icons left">cloud</i>Acceder a recurso online</a>
            </div>
            <h6><b>Resultado.</b></h6>
            <p>Escriba su output de salida o anexe algún repositorio con su código.</p>
            <div class="opcionesContainerStyleViewCuestionario">
                <div class="colorGrey bordered1 colorTextReverse letterStyleViewCuestionario">Output: </div>
                <input type="text" placeholder="output" class="opcionStyleViewCuestionario" id="opt3_resultado`+ k + `"></input>
                <div class="colorGrey bordered1 colorTextReverse letterStyleViewCuestionario">Link: </div>
                <input type="text" placeholder="link" class="opcionStyleViewCuestionario" id="opt3_link`+ k + `"></input>
            </div>
            <div class="contendorRecursoOnlineBox recursoOnlineEjercicios"> 
                <button id="opt3Button_`+ k + `" onclick="agregarRespuestaOpt3('opt3_resultado` + k + `','opt3_link` + k + `','opt3Button_` + k + `','opt3outputResult_` + k + `','opt3linkResult` + k + `')" class="recursoOnlineEjerciciosLink waves-effect waves-light btn colorGreyDarker colorTextReverse bordered1 btnPreguntaStyleFormat"><i class="material-icons left">check</i>Agregar respuestas</button>
            </div>
            <div id="opt3outputResult_`+ k + `" class="preguntaBox outputEsperado colorGreyDarker bordered1" style="margin-bottom: 10px;"><b>Output:</b></div>
            <div id="opt3linkResult`+ k + `" class="preguntaBox outputEsperado colorGreyDarker bordered1"><b>Link:</b></div>
            <div class="ponderacionBox ponderacion_opt3 colorWhite bordered1"></div>
            `;

                contenedoresPregunta[k].innerHTML = contenido;
            }
        }

        function ingresarPreguntasArrastrar() {
            //Ingresamos los elementos (en un contenedor especial)
            insertarCajasPreguntasArrastrar(preguntasModalArray4.length, 'opt4');
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
                var concepto = [`<div class="maxconceptos" id="conceptosContainer` + y + `"><h6>Conceptos</h6>`];
                var definicion = [`<div class="maxdefiniciones colorGrey bordered2" id="definicionesContainer` + y + `"><h6>Definiciones</h6>`];
                for (var x = 0; x < concepto_y_definiciones[y].length; x++) {
                    //Guardamos solo el concepto en una lista
                    concepto.push("<div class='arrastrarElemento arrastrarElementoC shadow-1e color3 colorText'>" + concepto_y_definiciones[y][x].substring(0, concepto_y_definiciones[y][x].indexOf('*')) + "</div>");
                    //Guardamos solo las definiciones en una lista
                    definicion.push("<div class='arrastrarElemento arrastrarElementoD shadow-1e colorGreyDarker'>" + concepto_y_definiciones[y][x].substring(concepto_y_definiciones[y][x].indexOf('*') + 1) + "</div>");
                }
                concepto.push("</div>");
                definicion.push("</div>");
                conceptoTotal.push(concepto);
                definicionTotal.push(definicion);
            }

            //Aqui tenemos los conceptos y las definiciones TODAS SEPARADAS Y POR PREGUNTA
            //console.log(conceptoTotal);
            //console.log(definicionTotal);

            //Aqui lo que se alamcena es el encabezado del contenido
            let inicioContenido;
            function crearInicio(numero) {
                inicioContenido =
                    `  
            <h5 class="tituloPregunta"><b>Ejercicio arrastrar ` + (numero + 1) + `</b></h5>
            <hr>
            <div class="preguntaBox colorGrey bordered1"><b>` + preguntasModalArray4[numero][0] + `</b></div>
            <h6><b>Relación de palabras.</b></h6>
            <p>Coloca el concepto arriba de su definición en el lado derecho</p>
            <div class="opcionesContainerStyleViewCuestionarioArrastrar">`;
                return inicioContenido;
            }


            //Aqui hacemos la impresion de los elementos (conceptos y definiciones dentro del contenido)
            for (var t = 0; t < preguntasModalArray4.length; t++) {
                //Este es el div que cierra el contenido
                let finalContenido = `</div>
                    <div style="width: 100%;"> 
                        <button id="optArrastrarButton`+ t + `" onclick="agregarRespuestaArrastrar('resultadoArrastrar` + t + `')" class="recursoOnlineEjerciciosLink waves-effect waves-light btn colorGreyDarker colorTextReverse bordered1 btnPreguntaStyleFormat"><i class="material-icons left">check</i>Confirmar orden</button>
                        <div id="resultadoArrastrar`+ t + `" class="preguntaBox outputEsperado colorGreyDarker bordered1" style="margin-bottom: 10px; width: 100%;"><b>Output:</b></div>
                    </div>
                    <div class="ponderacionBox ponderacion_opt4 colorWhite bordered1"></div>
                `;
                //En final se guarda el contenido FINAL para la pregunta
                var final;
                //Encabezado
                final = crearInicio(t);
                //Primer <div> para caja de conceptos
                final += conceptoTotal[t][0];
                //Los Conceptos
                for (var u = 1; u < conceptoTotal[t].length - 1; u++) {
                    final += conceptoTotal[t][u];
                }
                //Div de cierre de la caja de conceptos
                final += conceptoTotal[t][conceptoTotal[t].length - 1];
                //Primer div para abrir las definciiones
                final += definicionTotal[t][0];
                //Las definiciones
                for (var u = 1; u < definicionTotal[t].length - 1; u++) {
                    final += definicionTotal[t][u];
                }
                //Cerramos la caja de definiciones
                final += definicionTotal[t][definicionTotal[t].length - 1];
                //Cerramos todo el contenedor padre
                final += finalContenido;
                //Metemos los elementos en la pregunta
                contenedoresPregunta[t].innerHTML = final;
                //Los hacemos ordenables
                sortableElements(t);
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
                <div class="contendorBotonesTrueFalse"> 
                    <button 
                    onclick="agregarRespuestaOpt4('opt4outputResult_`+ m + `','true')" 
                    class="waves-effect waves-light btn-large colorGrey colorTextReverse trueFalsebtn1">T</button>
                    
                    <button
                    onclick="agregarRespuestaOpt4('opt4outputResult_`+ m + `','false')" 
                    class="waves-effect waves-light btn-large colorGrey colorTextReverse trueFalsebtn2">F</button>
                </div>
                <h6><b>Resultado.</b></h6>
                <div id="opt4outputResult_`+ m + `" class="preguntaBox outputEsperado colorGreyDarker bordered1" style="margin-bottom: 10px;"><b>Output:</b></div>
                <div class="ponderacionBox ponderacion_opt5 colorWhite bordered1"></div>
            `;
                contenedoresPregunta[m].innerHTML = contenido;
            }
        }

        function ingresarPreguntasAbiertas() {
            //Ingresamos los elementos
            insertarCajasPreguntas(preguntasModalArray6.length, 'opt6');
            //Accedemos a las cajas
            let contenedoresPregunta = document.getElementsByClassName('opt6');

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
                <h6><b>Respuesta.</b></h6>
                <div class="opcionesContainerStyleViewCuestionario">
                    <div class="colorGrey bordered1 colorTextReverse letterStyleViewCuestionario">R:</div>
                    <textarea placeholder="text" class="materialize-textarea" id="opt6_respuesta`+ m + `"></textarea>
                </div>
                <div class="contendorRecursoOnlineBox recursoOnlineEjercicios"> 
                    <button id="opt6_agregarRespuesta`+ m + `" 
                    onclick="agregarRespuestaOptAbiertas('opt6_respuesta`+ m + `','opt6outputResult_` + m + `','opt6_agregarRespuesta` + m + `')" 
                    class="recursoOnlineEjerciciosLink waves-effect waves-light btn colorGreyDarker colorTextReverse bordered1 btnPreguntaStyleFormat">
                    <i class="material-icons left">check</i>Agregar respuestas</button>
                </div>
                <div id="opt6outputResult_`+ m + `" class="preguntaBox outputEsperado colorGreyDarker bordered1" 
                style="margin-bottom: 10px;"><b>Output:</b></div>
                <div class="ponderacionBox ponderacion_opt6 colorWhite bordered1"></div>
            `;
                contenedoresPregunta[m].innerHTML = contenido;
            }
        }

        ingresarPreguntasOpcionMultiple();
        ingresarPreguntasAcompletar();
        ingresarPreguntasEjercicios();
        ingresarPreguntasTrueFalse();
        ingresarPreguntasAbiertas();
        ingresarPreguntasArrastrar();

        //////////////////////////////////////////////////////
        //////////////////////////////////////////////////////    
        //////////////////////////////////////////////////////
        ////////////TRABAJO CON PONDERACIONES Y ORDEN
        //Para la ponderación de las preguntas
        function asignarPonderaciones() {
            //Validamos aquellos numeros de la ponderación que estan vacios
            listaOrdenPreguntasConPonderaciones = [];
            for (var g = 0; g < ponderacionPreguntasArray.length; g++) {
                if (
                    ponderacionPreguntasArray[g] == "" ||
                    ponderacionPreguntasArray[g] == "00" ||
                    ponderacionPreguntasArray[g].length > 2 ||
                    parseInt(ponderacionPreguntasArray[g]) > 6 ||
                    parseInt(ponderacionPreguntasArray[g]) < 1) {
                    //Valor por default es 1
                    ponderacionPreguntasArray[g] = '1';
                }
                listaOrdenPreguntasConPonderaciones.push(ordenPreguntasArray[g] + "_" + ponderacionPreguntasArray[g]);
            }

            //Debemos buscar los elementos que ya estan desplegados en pantalla por su clase
            //Su clase nos indica que tipo de preguntas son
            let opt1_container = document.getElementsByClassName('ponderacion_opt1');
            let opt2_container = document.getElementsByClassName('ponderacion_opt2');
            let opt3_container = document.getElementsByClassName('ponderacion_opt3');
            let opt4_container = document.getElementsByClassName('ponderacion_opt4');
            let opt5_container = document.getElementsByClassName('ponderacion_opt5');
            let opt6_container = document.getElementsByClassName('ponderacion_opt6');

            //Declaramos los chunks de preguntas que estan en el array de ponderacion
            let opt1_container_order = [];
            let opt2_container_order = [];
            let opt3_container_order = [];
            let opt4_container_order = [];
            let opt5_container_order = [];
            let opt6_container_order = [];

            //Encontramos preguntas y ponderación / después ingresamos ponderaciones en las cajas de ponderación
            for (var s = 0; s < listaOrdenPreguntasConPonderaciones.length; s++) {
                if (listaOrdenPreguntasConPonderaciones[s].indexOf('optMultiple') != -1) {
                    opt1_container_order.push(listaOrdenPreguntasConPonderaciones[s].substr(listaOrdenPreguntasConPonderaciones[s].indexOf('_') + 1));
                } else if (listaOrdenPreguntasConPonderaciones[s].indexOf('optAcompletar') != -1) {
                    opt2_container_order.push(listaOrdenPreguntasConPonderaciones[s].substr(listaOrdenPreguntasConPonderaciones[s].indexOf('_') + 1));
                } else if (listaOrdenPreguntasConPonderaciones[s].indexOf('optEjercicios') != -1) {
                    opt3_container_order.push(listaOrdenPreguntasConPonderaciones[s].substr(listaOrdenPreguntasConPonderaciones[s].indexOf('_') + 1));
                } else if (listaOrdenPreguntasConPonderaciones[s].indexOf('optArrastrar') != -1) {
                    opt4_container_order.push(listaOrdenPreguntasConPonderaciones[s].substr(listaOrdenPreguntasConPonderaciones[s].indexOf('_') + 1));
                } else if (listaOrdenPreguntasConPonderaciones[s].indexOf('optFalsoVerdadero') != -1) {
                    opt5_container_order.push(listaOrdenPreguntasConPonderaciones[s].substr(listaOrdenPreguntasConPonderaciones[s].indexOf('_') + 1));
                } else if (listaOrdenPreguntasConPonderaciones[s].indexOf('optAbierta') != -1) {
                    opt6_container_order.push(listaOrdenPreguntasConPonderaciones[s].substr(listaOrdenPreguntasConPonderaciones[s].indexOf('_') + 1));
                }
            }

            //Metemos los extratos en las cajas de ponderacion 
            function meterPonderaciones(cajasGrupo, ponderacionesGrupo) {
                for (var y = 0; y < cajasGrupo.length; y++) {
                    cajasGrupo[y].innerHTML = "<b>" + ponderacionesGrupo[y] + "pts.</b>";
                }
                return "Longitudes = " + cajasGrupo.length + "///" + ponderacionesGrupo.length;
            }

            console.log(meterPonderaciones(opt1_container, opt1_container_order));
            console.log(meterPonderaciones(opt2_container, opt2_container_order));
            console.log(meterPonderaciones(opt3_container, opt3_container_order));
            console.log(meterPonderaciones(opt4_container, opt4_container_order));
            console.log(meterPonderaciones(opt5_container, opt5_container_order));
            console.log(meterPonderaciones(opt6_container, opt6_container_order));


            // console.log('ponderacionPreguntasArray', ponderacionPreguntasArray)
            // console.log('ordenPreguntasArray', ordenPreguntasArray)
            //console.log('listaOrdenPreguntasConPonderaciones', listaOrdenPreguntasConPonderaciones)
        }
        asignarPonderaciones();

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
        //validarRecursosAdicionales();

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
        ////////////Efecto sortable implementado

        function sortableElements(numero) {
            var idConcepto = 'conceptosContainer' + numero;
            var idDefinicion = 'definicionesContainer' + numero;
            var concepto = document.getElementById(idConcepto);
            var definicion = document.getElementById(idDefinicion);

            //console.log(concepto);
            //console.log(definicion);
            var sortableConceptos = new Sortable(concepto, {
                group: 'shared',
                draggable: 'div',
                animation: 300,
                ghostClass: 'colorWhite'
            }
            )

            var sortableDefiniciones = new Sortable(definicion, {
                group: 'shared',
                draggable: 'div',
                animation: 300,
                ghostClass: 'colorWhite'
            }
            )
        }

        //Validamos el ancho del contenedor para aplicar estilos.
        function validarWidthContador() {
            let contenedorOperacionesLive = document.getElementById('contenedorLive');
            let previewJsonResponderButton = document.getElementById('previewJsonResponder');
            let previewJsonResponderButton2 = document.getElementById('previewJsonResponder2');

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
                    previewJsonResponderButton2.classList.remove('btn-large');
                    previewJsonResponderButton2.classList.add('btn');
                } else if (window.innerWidth > 1000) {
                    contenedorOperacionesLive.classList.add('contenedorOperacionesLive');
                    contenedorOperacionesLive.classList.remove('contenedorOperacionesLiveMobile');
                    previewJsonResponderButton.classList.add('btn-large');
                    previewJsonResponderButton.classList.remove('btn');
                    previewJsonResponderButton2.classList.add('btn-large');
                    previewJsonResponderButton2.classList.remove('btn');
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