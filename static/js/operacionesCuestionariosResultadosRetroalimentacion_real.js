//////////////////////////////////////////////////////
//////////////////////////////////////////////////////    
//////////////////////////////////////////////////////
////////////ACCESO A DATOS

//Convetimos el objeto en un string con formato
stringJSON = JSON.stringify(dataCuestionarioJSON, null, 1);
//console.log(stringJSON)

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

//Se guarda la ponderacion global
let ponderacionGlobal = 0; //Puntos alumno
let ponderacionGlobalDada = 0; //Puntos totales
let ponderacionGlobalDadaFinal; //Puntos totales
let puntajeSegmentadoPorTipoPregunta = []; //Puntos totales por tipo pregunta
let puntajeSegmentadoPorTipoPreguntaAlumno = []; //Puntos totales obtenido por el alumno

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
    console.log(listadoPreguntas.length)
    return listadoPreguntas.length;
}

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////    
//////////////////////////////////////////////////////
////////////INSERCION DE ELEMENTOS

//Insertamos cajas de acuerdo a la cantidad de preguntas
function insertarCajasPreguntas(numeroPregunta, tipo) {
    const contenedorPadre = document.getElementById('previewPreguntasResultadosMain');
    let contenedor;
    //Esta validacion es necesaria (porque ya por default el JSON trae un objeto para los resultados)
    if (numeroPregunta > 1) {
        for (var t = 0; t < numeroPregunta - 1; t++) {
            contenedor = `<div class="` + tipo + ` bordered2 colorGreyWhiter shadow-1e preguntaContainerIndividualPreviewRespuestas"></div>`;
            contenedorPadre.innerHTML += contenedor;
        }
        return true
    } else {
        return false
    }
}

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
    let contadorSumaPonderacionTotal = 1;
    function meterPonderaciones(cajasGrupo, ponderacionesGrupo) {
        let ponderacionPorTipoPregunta = 0;
        contadorSumaPonderacionTotal++;
        for (var y = 0; y < cajasGrupo.length; y++) {
            cajasGrupo[y].innerHTML = "<b>" + ponderacionesGrupo[y] + "pts.</b>";
            ponderacionGlobalDada += parseInt(ponderacionesGrupo[y]);
            ponderacionPorTipoPregunta += parseInt(ponderacionesGrupo[y]);
        }
        puntajeSegmentadoPorTipoPregunta.push(ponderacionPorTipoPregunta);
        console.log('puntajeSegmentadoPorTipoPregunta', puntajeSegmentadoPorTipoPregunta)
        //Nos ayuda a guardar el valor total de las preguntas. (ponderaciones totales)
        if(contadorSumaPonderacionTotal == 7){
            ponderacionGlobalDadaFinal = ponderacionGlobalDada;
            console.log('ponderacionGlobalDadaFinal', ponderacionGlobalDadaFinal)
        }
        return "Longitudes = " + cajasGrupo.length + "///" + ponderacionesGrupo.length;
    }


    console.log(meterPonderaciones(opt1_container, opt1_container_order));
    console.log(meterPonderaciones(opt2_container, opt2_container_order));
    console.log(meterPonderaciones(opt3_container, opt3_container_order));
    console.log(meterPonderaciones(opt4_container, opt4_container_order));
    console.log(meterPonderaciones(opt5_container, opt5_container_order));
    console.log(meterPonderaciones(opt6_container, opt6_container_order));
}

//Calculamos el puntaje
function calcularPuntaje() {
    let puntosContainer = document.getElementsByClassName('puntosContainer');
    puntosContainer[0].innerHTML = "<p id='puntajeGeneralDataGet'>" + ponderacionGlobal.toFixed(2) + "/" + ponderacionGlobalDadaFinal + "pts.</p>";
}

//Calculamos el puntaje cuando ponemos la pregunta como buena.
let contadorRevisionDeLaSuma = 1;
function calcularPuntajeRevisado() {
    let puntosContainer = document.getElementsByClassName('puntosContainer');
    puntosContainer[0].innerHTML = "<p id='puntajeGeneralDataGet'>" + ponderacionGlobal.toFixed(2) + "/" + ponderacionGlobalDadaFinal/(contadorRevisionDeLaSuma) + "pts.</p>";
    contadorRevisionDeLaSuma++;
}

//Calculamos el promedio
function calcularPromedio() {
    //Detecta la cantidad de preguntas abiertas que hay
    let rightAnswerOpt6 = document.getElementsByClassName('opt6Pendiente');
    //Detecta la cantidad de inputs de pendiente que hay en los ejercicios (los que no tenian output)
    let rightAnswerOpt3 = document.getElementsByClassName('opt3Pendiente');
    let calificacionContainer = document.getElementsByClassName("calificacionContainer");
    //console.log('rightAnswerOpt6', rightAnswerOpt6)
    //console.log('rightAnswerOpt3', rightAnswerOpt3)

    let casillaPendientes = document.getElementsByClassName('pendientesEstado');
    casillaPendientes[0].innerHTML = `<p>Pending questions.</p>`;
    casillaPendientes[0].innerHTML += `<p>Open questions = ${rightAnswerOpt6.length}</p>`;
    casillaPendientes[0].innerHTML += `<p>Code questions = ${rightAnswerOpt3.length}</p>`;

    //Como siempre habra pendientes, podemos acceder sin miedo a las ponderaciones totales.
    let ponderaciones = document.getElementsByClassName('ponderacionBox');
    let listaPonderaciones = [];
    for(var i = 0; i < ponderaciones.length; i++){
        listaPonderaciones.push(parseInt(ponderaciones[i].innerText.replace('pts.','')));
    }

    let sumaPonderaciones = listaPonderaciones.reduce((sum, element) => {
        return sum + element;
    });

    // console.log("Preguntas abiertas pendientes = ", rightAnswerOpt6.length);
    // console.log("Preguntas ejercicios pendientes = ", rightAnswerOpt3.length);

    //Evalua si existen
    if (rightAnswerOpt6.length > 0 || rightAnswerOpt3.length > 0) {
        //En caso de que haya preguntas abiertas o ejercicios sin output.
        calificacionContainer[0].innerHTML = "<p>Manual evaluation pending</p>";
    } else {
        var promedio = (ponderacionGlobal.toFixed(2) * 10) / (sumaPonderaciones);
        console.log('contadorRevisionDeLaSuma', contadorRevisionDeLaSuma)
        calificacionContainer[0].innerHTML = "<p>Grade: <span id='calificacionDataGet'>" + promedio.toFixed(2) + "</span></p>";
    }
}


//Debemos primeros hacer la impresion de las preguntas de acuerdo a su tipo y luego
//mostrar los resultados
function imprimirPreguntas() {

    //Preguntas de opcion multiple
    function ingresarPreguntasOpcionMultiple() {
        //Ingresamos los elementos
        let validacion = insertarCajasPreguntas(preguntasModalArray1.length, 'opt1');
        //Accedemos a las cajas
        if (validacion == true) {
            let contenedoresPregunta = document.getElementsByClassName('opt1');
            for (var m = 0; m < preguntasModalArray1.length - 1; m++) {
                //Contenido de la pregunta
                let contenido =
                    `  
                <h5 class="tituloPregunta"><b>Q/1 ` + (m + 1) + `</b></h5>
                <hr>
                <div class="preguntaBox colorGrey colorTextReverse bordered1"><b>` + preguntasModalArray1[m][0] + `</b></div>
                <div class="imagenBox bordered1 shadow-1e colorGrey">
                <h6><b class="colorTextReverse">Img.</b></h6>
                <img alt='not available image' class="materialboxed imagenBoxContent bordered1" src="` + preguntasModalArray1[m][1] + `"></img>
                </div>
                <h6><b class="colorTextReverse">Opts.</b></h6>
                <div class="opcionesContainerStyleViewCuestionario">
                    <div class="color5 bordered5 coloredText letterStyleViewCuestionario">A</div><div class="colorGrey colorTextReverse bordered1 opcionStyleViewCuestionario">` + preguntasModalArray1[m][3] + `</div>
                    <div class="color5 bordered5 coloredText letterStyleViewCuestionario">B</div><div class="colorGrey colorTextReverse bordered1 opcionStyleViewCuestionario">` + preguntasModalArray1[m][4] + `</div>
                    <div class="color5 bordered5 coloredText letterStyleViewCuestionario">C</div><div class="colorGrey colorTextReverse bordered1 opcionStyleViewCuestionario">` + preguntasModalArray1[m][5] + `</div>
                    <div class="color5 bordered5 coloredText letterStyleViewCuestionario">D</div><div class="colorGrey colorTextReverse bordered1 opcionStyleViewCuestionario">` + preguntasModalArray1[m][6] + `</div>
                    </div>
                    <section class="colorGrey bordered1 shadow-1e respuestaFinalBoxes">
                        <h6><b class="colorTextReverse">Result.</b></h6>
                        <div class="preguntaBox color5 colorTextReverse bordered1"><b>` + preguntasModalArray1[m][2] + `</b></div>
                        <input type="hidden" value="` + preguntasModalArray1[m][2] + `" class="rightAnswerGlobal rightAnswerOpt1" id="rightAnswerOpt1` + m + `" name="rightAnswerOpt1` + m + `"></input>
                        <h6><b class="colorTextReverse">Answer.</b></h6>
                        <div class="respuestaBox respuestaBoxOpt1 goodColor bordered1"></div>
                        <div class="ponderacionBox ponderacion_opt1 colorWhite colorTextReverse bordered1" id="valorApelacion_opt1_`+ m + `"></div>
                    </section>
                    <section class="colorWhite bordered1 shadow-1e respuestaFinalBoxes contenedorApelaciones" id="contenedorApelacionesOpt1`+ m + `">
                        <h6><b class="colorTextReverse">Evaluate.</b></h6>
                        <div class="containerApelaciones" id="containerApelacionesOpt1`+ m + `">
                            <button onclick="apelar('bien', 'rightAnswerOpt1` + m + `','resolucionOpt1` + m + `','valorApelacion_opt1_` + m + `','containerApelacionesOpt1`+m+`')"
                            class="btn waves-effect button-rounded goodColorButton"><i class="material-icons md-24">thumb_up</button>
                            <button onclick="apelar('mal', 'rightAnswerOpt1` + m + `','resolucionOpt1` + m + `','valorApelacion_opt1_` + m + `','containerApelacionesOpt1`+m+`')"
                            class="btn waves-effect button-rounded badColorButton"><i class="material-icons md-24">thumb_down</button>
                        </div>
                        <div class="containerResolucionDeLaApelacion">
                            <p class="colorGreyWhiter bordered2" id="resolucionOpt1`+ m + `"></p>
                        </div>
                    </section>`;
                contenedoresPregunta[m].innerHTML = contenido;
            }
        } else {
            console.log("No hay preguntas opt1")
            return "No hay preguntas opt1";
        }
    }

    //Preguntas acompletar
    function ingresarPreguntasAcompletar() {
        //Ingresamos los elementos
        let validacion = insertarCajasPreguntas(preguntasModalArray2.length, 'opt2');
        if (validacion == true) {

            //Accedemos a las cajas
            let contenedoresPregunta = document.getElementsByClassName('opt2');
            //Hacemos variables de pregunta
            let contenidoIntermedio;

            for (var m = 0; m < preguntasModalArray2.length - 1; m++) {
                var longitudPregunta = Object.values(preguntasModalArray2[m]).length;
                contenedoresPregunta[m].innerHTML = "";
                contenidoIntermedio = "";

                //Contenido de la pregunta
                let contenidoInicial = `  
            <h5 class="tituloPregunta"><b>Q/2 ` + (m + 1) + `</b></h5>
            <hr>
            <div class="preguntaBox colorGrey bordered1"><b>` + preguntasModalArray2[m][0] + `</b></div>
            <section class="colorGrey bordered1 shadow-1e respuestaFinalBoxes">
                <h6><b class="colorTextReverse">Solutions.</b></h6>
                <div class="opcionesContainerStyleViewCuestionario">
            `;

                for (var t = 1; t < longitudPregunta; t++) {
                    contenidoIntermedio += `
                    <div class="colorGreyDarker bordered1 colorTextReverse letterStyleViewCuestionario">Blank `+ (t) + `</div>
                    <div class="colorGreyWhiter bordered1 opcionStyleViewCuestionario">` + preguntasModalArray2[m][t] + `</div>
                `;
                }

                let contenidoFinal = `
                </div>
            </section>
            <h6><b class="colorTextReverse">Answer.</b></h6>
            <input type="hidden" class="rightAnswerGlobal rightAnswerOpt2" id="rightAnswerOpt2`+ m + `" name="rightAnswerOpt2` + m + `"></input>
            <div class="respuestaBox respuestaBoxOpt2 goodColor bordered1 colorTextReverse"></div>
            <div class="ponderacionBox ponderacion_opt2 colorWhite bordered1 colorTextReverse" id="valorApelacion_opt2_`+ m + `"></div>
            <section class="colorWhite bordered1 shadow-1e respuestaFinalBoxes contenedorApelaciones" id="contenedorApelacionesOpt2`+ m + `">
                <h6><b class="colorTextReverse">Evaluation.</b></h6>
                <div class="containerApelaciones" id="containerApelacionesOpt2`+m+`">
                    <button onclick="apelar('bien', 'rightAnswerOpt2` + m + `','resolucionOpt2` + m + `','valorApelacion_opt2_`+m+`','containerApelacionesOpt2`+m+`')"
                    class="btn waves-effect button-rounded goodColorButton"><i class="material-icons md-24">thumb_up</button>
                    <button onclick="apelar('mal', 'rightAnswerOpt2` + m + `','resolucionOpt2` + m + `','valorApelacion_opt2_`+m+`','containerApelacionesOpt2`+m+`')"
                    class="btn waves-effect button-rounded badColorButton"><i class="material-icons md-24">thumb_down</button>
                </div>
                <div class="containerResolucionDeLaApelacion">
                    <p class="colorGreyWhiter bordered2" id="resolucionOpt2`+ m + `"></p>
                </div>
            </section>`;
                contenedoresPregunta[m].innerHTML = contenidoInicial + contenidoIntermedio + contenidoFinal;
            }
        } else {
            console.log("No hay preguntas opt2")
            return "No hay preguntas opt2";
        }
    }

    function ingresarPreguntasEjercicios() {
        //Ingresamos los elementos
        let validacion = insertarCajasPreguntas(preguntasModalArray3.length, 'opt3');
        if (validacion == true) {

            //Accedemos a las cajas
            let contenedoresPregunta = document.getElementsByClassName('opt3');

            for (var k = 0; k < preguntasModalArray3.length - 1; k++) {
                //Contenido de la pregunta
                let contenido =
                    `  
            <h5 class="tituloPregunta"><b>Q/3 ` + (k + 1) + `</b></h5>
            <hr>
            <div class="preguntaBox colorGrey bordered1"><b class="colorTextReverse">` + preguntasModalArray3[k][0] + `</b></div>
            <div class="imagenBox bordered1 shadow-1e colorGrey">
            <h6><b class="colorTextReverse">Img.</b></h6>
            <img alt='not available image' class="materialboxed imagenBoxContent bordered1" src="` + preguntasModalArray3[k][1] + `"></img>
            </div>
            <section class="colorGrey bordered1 shadow-1e respuestaFinalBoxes">
                <h6><b class="colorTextReverse">Teacher's solution.</b></h6>
                <div class="codeContainerBox"><pre class="previewCodeContainer colorText bordered1">` + preguntasModalArray3[k][3] + `</pre></div>
                <div class="preguntaBox outputEsperado outputGetValue color5 bordered1"><b class="colorTextReverse">Output: ` + preguntasModalArray3[k][4] + `</b></div>
                <h6 class="tituloEjercicioPendiente"><b class="colorTextReverse">Answer.</b></h6>
                <input type="hidden" class="rightAnswerGlobal rightAnswerOpt3" id="rightAnswerOpt3`+ k + `" name="rightAnswerOpt3` + k + `"></input>
                <div class="respuestaBox respuestaBoxOpt3 goodColor bordered1"></div>
                <div class="ponderacionBox ponderacion_opt3 colorWhite bordered1 colorTextReverse" id="valorApelacion_opt3_`+ k + `"></div>
            </section>
            <section class="colorWhite bordered1 shadow-1e respuestaFinalBoxes contenedorApelaciones" id="contenedorApelacionesOpt3`+ k + `">
                <h6><b class="colorTextReverse">Revition.</b></h6>
                <div class="containerApelaciones" id="containerApelacionesOpt3`+k+`">
                    <button onclick="apelar('bien', 'rightAnswerOpt3` + k + `','resolucionOpt3` + k + `','valorApelacion_opt3_`+k+`','containerApelacionesOpt3`+k+`')"
                    class="btn waves-effect button-rounded goodColorButton"><i class="material-icons md-24">thumb_up</button>
                    <button onclick="apelar('mal', 'rightAnswerOpt3` + k + `','resolucionOpt3` + k + `','valorApelacion_opt3_`+k+`','containerApelacionesOpt3`+k+`')"
                    class="btn waves-effect button-rounded badColorButton"><i class="material-icons md-24">thumb_down</button>
                </div>
                <div class="containerResolucionDeLaApelacion">
                    <p class="colorGreyWhiter bordered2" id="resolucionOpt3`+ k + `"></p>
                </div>
            </section>`;

                contenedoresPregunta[k].innerHTML = contenido;
            }
        } else {
            console.log("No hay preguntas opt3")
            return "No hay preguntas opt3";
        }
    }

    function ingresarPreguntasArrastrar() {
        //Ingresamos los elementos
        let validacion = insertarCajasPreguntas(preguntasModalArray4.length, 'opt4');
        if (validacion == true) {

            //Accedemos a las cajas
            let contenedoresPregunta = document.getElementsByClassName('opt4');
            let opcionesContainerStyleViewCuestionarioArrastrar = document.getElementsByClassName('opcionesContainerStyleViewCuestionarioArrastrar');
            var concepto_y_definiciones = [];
            let conceptoTotal = [];
            let definicionTotal = [];

            for (var y = 0; y < preguntasModalArray4.length - 1; y++) {
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
            //console.log(conceptoTotal);
            //console.log(definicionTotal);

            //Aqui lo que se alamcena es el encabezado del contenido
            let inicioContenido;
            function crearInicio(numero) {
                inicioContenido =
                    `  
            <h5 class="tituloPregunta"><b>Q/6 ` + (numero + 1) + `</b></h5>
            <hr>
            <div class="preguntaBox colorGrey bordered1"><b class="colorTextReverse">` + preguntasModalArray4[numero][0] + `</b></div>
            <h6><b class="colorTextReverse">Word's relation.</b></h6>
            <input type="hidden" value="" class="rightAnswerGlobal rightAnswerOpt4" id="rightAnswerOpt4`+ numero + `" name="rightAnswerOpt4` + numero + `"></input>
            <div class="opcionesContainerStyleViewCuestionarioArrastrar">`;
                return inicioContenido;
            }


            //Este es el div que cierra el contenido
            let finalContenido = `
            </div>
            <section class="colorGrey bordered1 shadow-1e respuestaFinalBoxes">
                <h6><b class="colorTextReverse">Answers.</b></h6>
                <p class="colorTextReverse">The points area divided by the number of words, if you got one wrong everything is wrong.</p>
                <div class="respuestaBox respuestaBoxOpt4 goodColor bordered1"></div>
                <div class="badAnswerBox badColor bordered1"></div>
                <section class="contadorBoxAnswerArrastrar">
                    <div class="countAnswerBoxRight goodColor colorGreyWhiter bordered1"></div>
                    <div class="countAnswerBox colorGreyWhiter colorTextReverse bordered1"></div>
                </section>
                <div class="ponderacionBox ponderacion_opt4 colorWhite bordered1"></div>
            </section>
            `;

            //Aqui hacemos la impresion de los elementos (conceptos y definiciones dentro del contenido)
            for (var t = 0; t < preguntasModalArray4.length - 1; t++) {
                var final;
                final = crearInicio(t);
                for (var u = 0; u < conceptoTotal[t].length; u++) {
                    final += conceptoTotal[t][u] + definicionTotal[t][u];
                }
                final += finalContenido;
                contenedoresPregunta[t].innerHTML = final;
            }

        } else {
            console.log("No hay preguntas opt4")
            return "No hay preguntas opt4";
        }
    }

    function ingresarPreguntasTrueFalse() {
        //Ingresamos los elementos
        let validacion = insertarCajasPreguntas(preguntasModalArray5.length, 'opt5');
        if (validacion == true) {
            //Accedemos a las cajas
            let contenedoresPregunta = document.getElementsByClassName('opt5');

            for (var m = 0; m < preguntasModalArray5.length - 1; m++) {
                //Contenido de la pregunta
                let contenido =
                    `  
                <h5 class="tituloPregunta"><b>Q/4 ` + (m + 1) + `</b></h5>
                <hr>
                <div class="preguntaBox colorGrey colorTextReverse bordered1"><b>` + preguntasModalArray5[m][0] + `</b></div>
                <section class="colorGrey bordered1 shadow-1e respuestaFinalBoxes">
                    <h6><b class="colorTextReverse">Solution.</b></h6>
                    <div class="opcionesContainerStyleViewCuestionarioTrueFalse">
                    <div class="preguntaBoxFalseTrue color5 coloredText bordered1 colorTextReverse"><b>` + preguntasModalArray5[m][1] + `</b></div>
                    </div>
                    <h6><b class="colorTextReverse">Answer.</b></h6>
                    <input type="hidden" value="` + preguntasModalArray5[m][1] + `" class="rightAnswerGlobal rightAnswerOpt5" id="rightAnswerOpt5` + m + `" name="rightAnswerOpt5` + m + `"></input>
                    <div class="respuestaBox respuestaBoxOpt5 goodColor bordered1"></div>
                    <div class="ponderacionBox ponderacion_opt5 colorWhite colorTextReverse bordered1" id="valorApelacion_opt5_`+ m + `"></div>
                </section>
                <section class="colorWhite bordered1 shadow-1e respuestaFinalBoxes contenedorApelaciones" id="contenedorApelacionesOpt5`+ m + `">
                <h6><b class="colorTextReverse">Revition.</b></h6>
                    <div class="containerApelaciones" id="containerApelacionesOpt5`+m+`">
                        <button onclick="apelar('bien', 'rightAnswerOpt5` + m + `','resolucionOpt5` + m + `','valorApelacion_opt5_`+m+`','containerApelacionesOpt5`+m+`')"
                        class="btn waves-effect button-rounded goodColorButton"><i class="material-icons md-24">thumb_up</button>
                        <button onclick="apelar('mal', 'rightAnswerOpt5` + m + `','resolucionOpt5` + m + `','valorApelacion_opt5_`+m+`','containerApelacionesOpt5`+m+`')"
                        class="btn waves-effect button-rounded badColorButton"><i class="material-icons md-24">thumb_down</button>
                    </div>
                    <div class="containerResolucionDeLaApelacion">
                        <p class="colorGreyWhiter bordered2" id="resolucionOpt5`+ m + `"></p>
                    </div>
                </section>
                `;
                contenedoresPregunta[m].innerHTML = contenido;
            }
        } else {
            console.log("No hay preguntas opt5")
            return "No hay preguntas opt5";
        }
    }

    function ingresarPreguntasAbiertas() {
        //Ingresamos los elementos
        let validacion = insertarCajasPreguntas(preguntasModalArray6.length, 'opt6');
        if (validacion == true) {
            //Accedemos a las cajas
            let contenedoresPregunta = document.getElementsByClassName('opt6');

            for (var m = 0; m < preguntasModalArray6.length - 1; m++) {
                //Contenido de la pregunta
                let contenido =
                    `  
            <h5 class="tituloPregunta"><b> Q/5` + (m + 1) + `</b></h5>
            <hr>
                <h6><b class="colorTextReverse">Desc.</b></h6>
                <div class="preguntaBox colorGrey colorTextReverse bordered1"><b>` + preguntasModalArray6[m][0] + `</b></div>
                <div class="imagenBox bordered1 shadow-1e colorGrey">
                    <h6><b class="colorTextReverse">Img.</b></h6>
                    <img alt='not available image' class="materialboxed imagenBoxContent bordered1" src="` + preguntasModalArray6[m][2] + `"></img>
                </div>
                <div class="contendorRecursoOnlineBox recursoOnlineEjercicios"> 
                <section class="colorGrey bordered1 shadow-1e respuestaFinalBoxes">
                    <h6><b class="colorTextReverse">Solution.</b></h6>
                    <div class="preguntaBox outputEsperado colorGreyDarker bordered1 colorTextReverse"><b>This questions are checked manually</b></div>
                    <h6><b class="colorTextReverse">Answer.</b></h6>
                    <input type="hidden" value="pendiente" class="rightAnswerGlobal rightAnswerOpt6" id="rightAnswerOpt6`+ m + `" name="rightAnswerOpt6` + m + `"></input>
                    <div class="respuestaBox respuestaBoxOpt6 goodColor bordered1"></div>
                    <div class="ponderacionBox ponderacion_opt6 colorWhite colorTextReverse bordered1" id="valorApelacion_opt6_`+ m + `"></div>
                </section>
                <section class="colorWhite bordered1 shadow-1e respuestaFinalBoxes contenedorApelaciones" id="contenedorApelacionesOpt6`+ m + `">
                <h6><b class="colorTextReverse">Revition.</b></h6>
                    <div class="containerApelaciones" id="containerApelacionesOpt6`+m+`">
                        <button onclick="apelar('bien', 'rightAnswerOpt6` + m + `','resolucionOpt6` + m + `','valorApelacion_opt6_`+m+`','containerApelacionesOpt6`+m+`')"
                        class="btn waves-effect button-rounded goodColorButton"><i class="material-icons md-24">thumb_up</button>
                        <button onclick="apelar('mal', 'rightAnswerOpt6` + m + `','resolucionOpt6` + m + `','valorApelacion_opt6_`+m+`','containerApelacionesOpt6`+m+`')"
                        class="btn waves-effect button-rounded badColorButton"><i class="material-icons md-24">thumb_down</button>
                    </div>
                    <div class="containerResolucionDeLaApelacion">
                        <p class="colorGreyWhiter bordered2" id="resolucionOpt6`+ m + `"></p>
                    </div>
                </section>
                `;
                contenedoresPregunta[m].innerHTML = contenido;
            }
        } else {
            console.log("No hay preguntas opt6")
            return "No hay preguntas opt6";
        }
    }

    ingresarPreguntasOpcionMultiple();
    ingresarPreguntasAcompletar();
    ingresarPreguntasEjercicios();
    ingresarPreguntasTrueFalse();
    ingresarPreguntasAbiertas();
    ingresarPreguntasArrastrar();

    ///Se asignan los valores de la ponderaciones en cuanto carga la página.
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

        let outputGetValue = document.getElementsByClassName('outputGetValue');
        let previewCodeContainer = document.getElementsByClassName('previewCodeContainer');
        for (var i = 0; i < outputGetValue.length; i++) {
            if (outputGetValue[i].innerText == "Output:") {
                outputGetValue[i].innerText = "No output";
            } else if (previewCodeContainer[i].innerText == "") {
                previewCodeContainer[i].innerText = "No code";
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

    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////    
    //////////////////////////////////////////////////////
    ////////////Acceso a datos de evaluacion

    ///Accedemos a las respuestas del cuestionario (las del alumno)
    let respuestasModal1 = Object.values(preguntasModal1[preguntasModal1.length - 1]);
    let respuestasModal2 = Object.values(preguntasModal2[preguntasModal2.length - 1]);
    let respuestasModal3 = Object.values(preguntasModal3[preguntasModal3.length - 1]);
    let respuestasModal4 = Object.values(preguntasModal4[preguntasModal4.length - 1]);
    let respuestasModal5 = Object.values(preguntasModal5[preguntasModal5.length - 1]);
    let respuestasModal6 = Object.values(preguntasModal6[preguntasModal6.length - 1]);

    //Procesamos los textos de la sección de respuestas
    function procesarRespuestasAlumnos(respuestasLongitud, respuestas) {
        let listaRespuestas = [];
        //Obtenemos las respuestas (Quitamos ponderación)
        for (var x = 0; x < respuestasLongitud; x++) {
            listaRespuestas.push(respuestas[x].substr(0, respuestas[x].indexOf('&')))
        }

        let listaRespuestasFinal = [];
        //Obtenemos las respuestas (Quitamos el identificador)
        for (var x = 0; x < respuestasLongitud; x++) {
            listaRespuestasFinal.push(listaRespuestas[x].substr(listaRespuestas[x].indexOf('/') + 1))
        }

        console.log(listaRespuestasFinal)
        return listaRespuestasFinal;
    }

    //Almacenamos las respuestas limpias
    let listaRespuestasLimpiaOpt1 = procesarRespuestasAlumnos(respuestasModal1[0].length, respuestasModal1[0]);
    let listaRespuestasLimpiaOpt2 = procesarRespuestasAlumnos(respuestasModal2[0].length, respuestasModal2[0]);
    let listaRespuestasLimpiaOpt3 = procesarRespuestasAlumnos(respuestasModal3[0].length, respuestasModal3[0]);
    let listaRespuestasLimpiaOpt4 = procesarRespuestasAlumnos(respuestasModal4[0].length, respuestasModal4[0]);
    let listaRespuestasLimpiaOpt5 = procesarRespuestasAlumnos(respuestasModal5[0].length, respuestasModal5[0]);
    let listaRespuestasLimpiaOpt6 = procesarRespuestasAlumnos(respuestasModal6[0].length, respuestasModal6[0]);

    function imprimirRespuestasAlumno(listaRespuestas, tipo) {
        let respuestaBox = document.getElementsByClassName(tipo);

        //Imprimimos las respuestas
        if (tipo == "respuestaBoxOpt1" || tipo == "respuestaBoxOpt5") {
            for (var i = 0; i < respuestaBox.length; i++) {
                if (listaRespuestas[i] == undefined) {
                    respuestaBox[i].innerText = "vacio";
                } else if (listaRespuestas[i] == "") {
                    respuestaBox[i].innerText = "vacio";
                } else {
                    respuestaBox[i].innerText = listaRespuestas[i];
                }
            }
        }

        //Validamos impresión dependiendo del tipo
        if (tipo == "respuestaBoxOpt2") {
            for (var i = 0; i < respuestaBox.length; i++) {
                if (listaRespuestas[i] == undefined) {
                    respuestaBox[i].innerText = "vacio";
                } else if (listaRespuestas[i] == "") {
                    respuestaBox[i].innerText = "vacio";
                } else {
                    var textoConFormato = listaRespuestas[i].replace('/', '⚫ ');
                    textoConFormato = textoConFormato.replaceAll('/', '<br>⚫ ');
                    respuestaBox[i].innerHTML = textoConFormato;
                }
            }
        }

        //Validamos impresión dependiendo del tipo
        if (tipo == "respuestaBoxOpt3" || tipo == "respuestaBoxOpt6") {
            for (var i = 0; i < respuestaBox.length; i++) {
                if (listaRespuestas[i] == undefined) {
                    respuestaBox[i].innerText = "";
                } else if (listaRespuestas[i] == "") {
                    respuestaBox[i].innerText = "";
                } else {
                    var textoConFormato = listaRespuestas[i].replace('/', '<br>');
                    respuestaBox[i].innerHTML = textoConFormato;
                }
            }
        }
    }
    imprimirRespuestasAlumno(Object.values(listaRespuestasLimpiaOpt1), 'respuestaBoxOpt1');
    imprimirRespuestasAlumno(Object.values(listaRespuestasLimpiaOpt2), 'respuestaBoxOpt2');
    imprimirRespuestasAlumno(Object.values(listaRespuestasLimpiaOpt3), 'respuestaBoxOpt3');
    imprimirRespuestasAlumno(Object.values(listaRespuestasLimpiaOpt4), 'respuestaBoxOpt4');
    imprimirRespuestasAlumno(Object.values(listaRespuestasLimpiaOpt5), 'respuestaBoxOpt5');
    imprimirRespuestasAlumno(Object.values(listaRespuestasLimpiaOpt6), 'respuestaBoxOpt6');

    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////    
    //////////////////////////////////////////////////////
    ////////////EVALUACION
    //Se evaluan de forma atomica
    function evaluarOpt1() {
        //Input con la respuesta
        let rightAnswerOpt1 = document.getElementsByClassName("rightAnswerOpt1");
        //Div con la respuesta del usuario
        let respuestaBox = document.getElementsByClassName('respuestaBoxOpt1');
        //Div de ponderaciones
        let ponderacion_opt1 = document.getElementsByClassName('ponderacion_opt1');

        //Evaluamos y verificamos si es correcta
        let puntajeUnitarioOpt1 = 0;
        for (var i = 0; i < rightAnswerOpt1.length; i++) {
            if (rightAnswerOpt1[i].value == respuestaBox[i].textContent) {
                //Guardamos en el input el valor de bien
                rightAnswerOpt1[i].value = "bien";
                //Sumamos la ponderacion
                var valorPonderacionOpt1 = ponderacion_opt1[i].innerText;
                valorPonderacionOpt1 = valorPonderacionOpt1.substring(0, valorPonderacionOpt1.indexOf('pts.'));
                ponderacionGlobal = ponderacionGlobal + parseInt(valorPonderacionOpt1);
                puntajeUnitarioOpt1 = puntajeUnitarioOpt1 + parseInt(valorPonderacionOpt1);
            } else {
                //Guardamos en el input el valor de mal
                rightAnswerOpt1[i].value = "mal";
                //Aplicamos los estilos
                respuestaBox[i].classList.remove('goodColor');
                respuestaBox[i].classList.add('badColor');
            }
        }
        puntajeSegmentadoPorTipoPreguntaAlumno.push(puntajeUnitarioOpt1)
    }
    evaluarOpt1();

    //Se valuan de forma atómica
    function evaluarOpt2() {
        var respuestasCorrectas = [];
        var respuestaParcial = "";

        for (var i = 0; i < Object.values(preguntasModalArray2).length - 1; i++) {
            for (var j = 1; j < Object.values(preguntasModalArray2[i]).length; j++) {
                respuestaParcial += "/" + preguntasModalArray2[i][j];
            }
            respuestasCorrectas.push(respuestaParcial);
            respuestaParcial = "";
        }
        //Respuestas correctas
        //console.log(respuestasCorrectas);
        //Respuestas del alumno
        //console.log(listaRespuestasLimpiaOpt2);

        //Input de respuestas
        let rightAnswerOpt2 = document.getElementsByClassName('rightAnswerOpt2');
        //DIV de respuestas
        let respuestaBoxOpt2 = document.getElementsByClassName('respuestaBoxOpt2');
        //Div de ponderaciones
        let ponderacion_opt2 = document.getElementsByClassName('ponderacion_opt2');

        let puntajeUnitarioOpt2 = 0;
        for (var t = 0; t < respuestasCorrectas.length; t++) {
            if (respuestasCorrectas[t] == listaRespuestasLimpiaOpt2[t]) {
                rightAnswerOpt2[t].value = "bien";
                //Sumamos la ponderacion
                var valorPonderacionOpt2 = ponderacion_opt2[t].innerText;
                valorPonderacionOpt2 = valorPonderacionOpt2.substring(0, valorPonderacionOpt2.indexOf('pts.'));
                ponderacionGlobal = ponderacionGlobal + parseInt(valorPonderacionOpt2);
                puntajeUnitarioOpt2 = puntajeUnitarioOpt2 + parseInt(valorPonderacionOpt2);
            } else {
                //Guardamos en el input el valor de mal
                rightAnswerOpt2[t].value = "mal";
                //Aplicamos los estilos
                respuestaBoxOpt2[t].classList.remove('goodColor');
                respuestaBoxOpt2[t].classList.add('badColor');
            }
        }
        puntajeSegmentadoPorTipoPreguntaAlumno.push(puntajeUnitarioOpt2);
    }
    evaluarOpt2();

    //Se toma en consideración los casos en los que se tienen o no outputs
    function evaluarOpt3() {
        //Valor del output propuesto por el maestro
        let outputGetValue = document.getElementsByClassName('outputGetValue');
        //Input de respuestas
        let rightAnswerOpt3 = document.getElementsByClassName('rightAnswerOpt3');
        //DIV de respuestas
        let respuestaBoxOpt3 = document.getElementsByClassName('respuestaBoxOpt3');
        let tituloEjercicioPendiente = document.getElementsByClassName("tituloEjercicioPendiente");
        //Div de ponderaciones
        let ponderacion_opt3 = document.getElementsByClassName('ponderacion_opt3');

        let puntajeUnitarioOpt3 = 0;
        for (var i = 0; i < outputGetValue.length; i++) {
            //Si no hay output la pone como pendiente
            if (outputGetValue[i].innerText == "" || outputGetValue[i].innerText == "No output") {
                rightAnswerOpt3[i].value = "pendiente";
                rightAnswerOpt3[i].classList.add("opt3Pendiente");
                respuestaBoxOpt3[i].classList.remove('goodColor');
                respuestaBoxOpt3[i].classList.add('sosoColor');
                tituloEjercicioPendiente[i].innerHTML = "<b>Pendiente de revisión.</b>";
            } else { //Si si tenemos output revisa que coincida
                //Limpiamos respuesta del estudiante
                var respuestaOutput = listaRespuestasLimpiaOpt3[i].substring(0, listaRespuestasLimpiaOpt3[i].indexOf('/'))
                if (respuestaOutput == outputGetValue[i].innerText) { //Si el output coincide
                    rightAnswerOpt3[i].value = "bien";
                    //Sumamos la ponderacion
                    var valorPonderacionOpt3 = ponderacion_opt3[i].innerText;
                    valorPonderacionOpt3 = valorPonderacionOpt3.substring(0, valorPonderacionOpt3.indexOf('pts.'));
                    ponderacionGlobal = ponderacionGlobal + parseInt(valorPonderacionOpt3);
                    puntajeUnitarioOpt3 = puntajeUnitarioOpt3 + parseInt(valorPonderacionOpt3);
                } else {
                    //Guardamos en el input el valor de mal
                    rightAnswerOpt3[i].value = "mal";
                    //Aplicamos los estilos
                    respuestaBoxOpt3[i].classList.remove('goodColor');
                    respuestaBoxOpt3[i].classList.add('badColor');
                }
            }
        }
        puntajeSegmentadoPorTipoPreguntaAlumno.push(puntajeUnitarioOpt3);

        //Respuestas correctas
        //console.log(respuestasCorrectas);
        //Respuestas del alumno
        //console.log(listaRespuestasLimpiaOpt3);
    }
    evaluarOpt3();

    //Se deben evaluar las que esten bien
    let respuestasUsuarioTotal = [];
    let resultadosProfeTotal = [];
    function evaluarOpt4() {
        let respuestaUsuarioUnitario = [];

        //Contamos caracteres ("/")
        function cuantasVecesAparece(cadena, caracter) {
            var indices = [];
            for (var i = 0; i < cadena.length; i++) {
                if (cadena[i].toLowerCase() === caracter) indices.push(i);
            }
            return indices.length;
        }

        //Obtenemos posicion de caracteres
        function getPosition(string, subString, index) {
            return string.split(subString, index).join(subString).length;
        }

        //Recorre cada respuestas de cada paregunta
        for (var i = 0; i < listaRespuestasLimpiaOpt4.length; i++) {
            var numeroOcurrencias = cuantasVecesAparece(listaRespuestasLimpiaOpt4[i], "/");
            //Ejecutamos de acuerdo a la cantidad de "/" que encuentre
            //Se divide entre dos porque solo nos interesa ir de dos en dos palabra
            for (var j = 0; j < numeroOcurrencias / 2; j++) {
                //Obtenemos la posicion del segundo "/"
                var posicion = getPosition(listaRespuestasLimpiaOpt4[i], '/', 2);
                //Recortamos el caracter hasta el segundo "/"
                var pedazoRespuesta = listaRespuestasLimpiaOpt4[i].substring(0, posicion);
                //Eliminamos el pedazo que ya obtuvimos
                listaRespuestasLimpiaOpt4[i] = listaRespuestasLimpiaOpt4[i].slice(posicion + 1, -1)
                //console.log('pedazoRespuesta', pedazoRespuesta);
                respuestaUsuarioUnitario.push(pedazoRespuesta);
            }
            //console.log('respuestaUsuarioUnitario', respuestaUsuarioUnitario)
            respuestasUsuarioTotal.push(respuestaUsuarioUnitario);
            respuestaUsuarioUnitario = [];
        }
        //Respuestas sepradas en la forma [[],[]]
        console.log('respuestasUsuarioTotal', respuestasUsuarioTotal)

        let resultadosProfeUnitario = [];
        //Se debe hacer lo mismo con las respuestas que establecio el profesor
        //Recorremos la preguntas
        for (var t = 0; t < Object.values(preguntasModalArray4).length - 1; t++) {
            //Accedemos a cada respuesta y las guardamos de la misma manera [[],[]]
            for (var y = 1; y < Object.values(preguntasModalArray4[t]).length; y++) {
                var resultadoProfe = preguntasModalArray4[t][y];
                resultadosProfeUnitario.push(resultadoProfe);
            }
            resultadosProfeTotal.push(resultadosProfeUnitario);
            resultadosProfeUnitario = [];
        }

        //Respuestas correctas del cuestionario
        console.log('resultadosProfeTotal', resultadosProfeTotal)

        //Input con la respuesta
        let rightAnswerOpt4 = document.getElementsByClassName("rightAnswerOpt4");
        //Div con la respuesta del usuario
        let respuestaBox = document.getElementsByClassName('respuestaBoxOpt4');
        let badAnswerBox = document.getElementsByClassName('badAnswerBox');
        let countAnswerBox = document.getElementsByClassName('countAnswerBox');
        let countAnswerBoxRight = document.getElementsByClassName('countAnswerBoxRight');
        //Div de ponderaciones
        let ponderacion_opt4 = document.getElementsByClassName('ponderacion_opt4');


        //Nota: Debes comparar los dos arrays [[],[]]
        let puntajeUnitarioOpt4 = 0;
        for (var r = 0; r < resultadosProfeTotal.length; r++) {
            var contadorCorrectas = 0;
            var contadorIncorrectas = 0;

            //Si el valor de la respuesta es 0 (no la contestaron debemos meter un valor para que lo valide)
            //Esto porque no podemos hacer for sobre un array con longitud cero
            if (respuestasUsuarioTotal[r].length == 0) {
                respuestasUsuarioTotal[r].push("EMPTY");
            }

            for (var f = 0; f < Object.values(respuestasUsuarioTotal[r]).length; f++) {
                //En los resultados del profe eliminamos los asteriscos
                resultadosProfeTotal[r][f] = resultadosProfeTotal[r][f].replaceAll("*", "/");
                /*En caso de que las longitud con las respuestas del profe y las del usuario
                *no sean iguales, significa que al usuario le faltaron casillas por mover
                *en cuyo caso la pregunta se toma toda como incorrecta. 
                */
                if (Object.values(resultadosProfeTotal[r]).length != Object.values(respuestasUsuarioTotal[r]).length) {
                    //Ponemos un mensaje en la caja (indicando fallo)
                    respuestaBox[r].classList.add('badColor');
                    respuestaBox[r].innerText = "Faltan respuestas, no relacionaste todos los conceptos";
                    badAnswerBox[r].classList.add("hiddenElement");
                    rightAnswerOpt4[r].value = "mal";
                    countAnswerBox[r].classList.add("hiddenElement");
                    countAnswerBoxRight[r].classList.add("hiddenElement");

                    //Elimnamos lo que agregamos arriba (ESTO SOLO EN CASO DE QUE FUERA CERO)
                    respuestasUsuarioTotal[r].pop();

                    //Asignamos un valor por default
                    valorPonderacionOpt4 = 0;
                    //Cuando estan bien se agregan a la casilla de buenas
                } else {
                    //Cuando las respuestas coinciden
                    if (resultadosProfeTotal[r][f] == respuestasUsuarioTotal[r][f]) {
                        respuestaBox[r].innerHTML += respuestasUsuarioTotal[r][f] + "<br>";
                        contadorCorrectas += 1;
                        //Cuando no coinciden se agregan a la casilla de malas
                    } else {
                        badAnswerBox[r].innerHTML += respuestasUsuarioTotal[r][f] + "<br>";
                        contadorIncorrectas += 1;
                    }


                    //Sumamos la ponderacion
                    var valorPonderacionOpt4 = ponderacion_opt4[r].innerText;
                    valorPonderacionOpt4 = valorPonderacionOpt4.substring(0, valorPonderacionOpt4.indexOf('pts.'));
                    //Hacemos el calculo según los aciertos
                    if (contadorCorrectas == 0) {
                        valorPonderacionOpt4 = 0;
                    } else {
                        valorPonderacionOpt4 = ((contadorCorrectas * valorPonderacionOpt4) / (contadorIncorrectas + contadorCorrectas)).toFixed(2);
                    }

                    countAnswerBox[r].innerText = contadorIncorrectas + " Malas";
                    countAnswerBoxRight[r].innerText = contadorCorrectas + " Buenas " + valorPonderacionOpt4 + "pts.";

                }

            }

            //Sumamos a ala ponderacion global el puntaje
            ponderacionGlobal = ponderacionGlobal + parseFloat(valorPonderacionOpt4);
            puntajeUnitarioOpt4 = puntajeUnitarioOpt4 + parseFloat(valorPonderacionOpt4);
        }
        puntajeSegmentadoPorTipoPreguntaAlumno.push(puntajeUnitarioOpt4)
    }
    //console.log('respuestasUsuarioTotal', respuestasUsuarioTotal)
    evaluarOpt4();

    //Se evaluan de forma atomica
    function evaluarOpt5() {
        //Input con la respuesta
        let rightAnswerOpt5 = document.getElementsByClassName("rightAnswerOpt5");
        //Div con la respuesta del usuario
        let respuestaBox = document.getElementsByClassName('respuestaBoxOpt5');
        //Div de ponderaciones
        let ponderacion_opt5 = document.getElementsByClassName('ponderacion_opt5');

        //Evaluamos y verificamos si es correcta
        let puntajeUnitarioOpt5 = 0;
        for (var i = 0; i < rightAnswerOpt5.length; i++) {
            var formatoRespuesta;
            //Damos formato a el value de la respuesta correcta
            if (rightAnswerOpt5[i].value == "t" || rightAnswerOpt5[i].value == "T") {
                formatoRespuesta = "true";
            } else if (rightAnswerOpt5[i].value == "f" || rightAnswerOpt5[i].value == "F") {
                formatoRespuesta = "false";
            }

            //Evaluamos la pregunta
            if (formatoRespuesta == respuestaBox[i].textContent) {
                //Guardamos en el input el valor de bien
                rightAnswerOpt5[i].value = "bien";
                //Sumamos la ponderacion
                var valorPonderacionOpt5 = ponderacion_opt5[i].innerText;
                valorPonderacionOpt5 = valorPonderacionOpt5.substring(0, valorPonderacionOpt5.indexOf('pts.'));
                ponderacionGlobal = ponderacionGlobal + parseInt(valorPonderacionOpt5);
                puntajeUnitarioOpt5 = puntajeUnitarioOpt5 + parseInt(valorPonderacionOpt5);
            } else {
                //Guardamos en el input el valor de mal
                rightAnswerOpt5[i].value = "mal";
                //Aplicamos los estilos
                respuestaBox[i].classList.remove('goodColor');
                respuestaBox[i].classList.add('badColor');
            }
        }
        puntajeSegmentadoPorTipoPreguntaAlumno.push(puntajeUnitarioOpt5)
    }
    evaluarOpt5();

    //Se dejan por default pendientes para revision//Cuando estan vacia entonces se pone como mala
    function evaluarOpt6() {
        //Input con la respuesta
        let rightAnswerOpt6 = document.getElementsByClassName("rightAnswerOpt6");
        //Div con la respuesta del usuario
        let respuestaBox = document.getElementsByClassName('respuestaBoxOpt6');

        //Como son preguntas abiertas lo que se evalua es si hay o no contenido dentro
        for (var i = 0; i < respuestaBox.length; i++) {
            if (respuestaBox[i].innerText == "") {
                rightAnswerOpt6[i].value = "mal";
                //Aplicamos los estilos
                respuestaBox[i].classList.remove('goodColor');
                respuestaBox[i].classList.add('badColor');
                respuestaBox[i].innerText = "EMPTY";
            } else {
                rightAnswerOpt6[i].value = "pendiente";
                rightAnswerOpt6[i].classList.add("opt6Pendiente");
                //Aplicamos los estilos
                respuestaBox[i].classList.remove('goodColor');
                respuestaBox[i].classList.add('sosoColor');
            }
        }
        puntajeSegmentadoPorTipoPreguntaAlumno.push(0);
    }
    evaluarOpt6();

    //Calcula el promedio
    calcularPromedio();

    //Validar retraso
    function estadoRetraso() {
        let estadoRetrasoBox = document.getElementsByClassName('estadoRetraso');
        let estadoRetraso = Object.values(ordenPreguntas[1]);
        if (estadoRetraso == "true") {
            estadoRetrasoBox[0].innerHTML = "<p>Sent out of time</p>";
        } else {
            estadoRetrasoBox[0].innerHTML = "<p>Sent on time</p>";
        }

    };
    estadoRetraso();

    //Calculamos el puntaje de los usuarios
    calcularPuntaje();
}
imprimirPreguntas();
