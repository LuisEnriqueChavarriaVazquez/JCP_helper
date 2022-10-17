//////////////////////////////////////////////////////
//////////////////////////////////////////////////////    
//////////////////////////////////////////////////////
////////////ACCESO A DATOS

//Convetimos el objeto en un string con formato
stringJSON = JSON.stringify(dataCuestionarioJSON, null, 1);
console.log(stringJSON)

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
let ponderacionGlobal = 0;

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
                <h5 class="tituloPregunta"><b>Opción múltiple ` + (m + 1) + `</b></h5>
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
                    <section class="colorGrey bordered1 shadow-1e respuestaFinalBoxes">
                        <h6><b>Respuesta correcta.</b></h6>
                        <div class="preguntaBox color5 bordered1"><b>` + preguntasModalArray1[m][2] + `</b></div>
                        <input type="hidden" value="` + preguntasModalArray1[m][2] + `" class="rightAnswerOpt1" id="rightAnswerOpt1`+ m +`" name="rightAnswerOpt1`+ m +`"></input>
                        <h6><b>Su respuesta.</b></h6>
                        <div class="respuestaBox respuestaBoxOpt1 goodColor bordered1"></div>
                        <div class="ponderacionBox ponderacion_opt1 colorWhite bordered1"></div>
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
            <h5 class="tituloPregunta"><b>Rellenar espacio ` + (m + 1) + `</b></h5>
            <hr>
            <div class="preguntaBox colorGrey bordered1"><b>` + preguntasModalArray2[m][0] + `</b></div>
            <section class="colorGrey bordered1 shadow-1e respuestaFinalBoxes">
                <h6><b>Soluciones de los espacios.</b></h6>
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
            <h6><b>Su respuesta.</b></h6>
            <div class="respuestaBox respuestaBoxOpt2 goodColor bordered1"></div>
            <div class="ponderacionBox ponderacion_opt2 colorWhite bordered1"></div>`;
                contenedoresPregunta[m].innerHTML = contenidoInicial + contenidoIntermedio + contenidoFinal;
            }
        } else {
            console.log("No hay preguntas opt2")
            return "No hay preguntas opt3";
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
            <h5 class="tituloPregunta"><b>Ejercicio ` + (k + 1) + `</b></h5>
            <hr>
            <div class="preguntaBox colorGrey bordered1"><b>` + preguntasModalArray3[k][0] + `</b></div>
            <div class="imagenBox bordered1 shadow-1e colorGrey">
            <h6><b>Imagen adjunta.</b></h6>
            <img alt='not available image' class="materialboxed imagenBoxContent bordered1" src="` + preguntasModalArray3[k][1] + `"></img>
            </div>
            <section class="colorGrey bordered1 shadow-1e respuestaFinalBoxes">
                <h6><b>Propuesta de solución del docente.</b></h6>
                <div class="codeContainerBox"><pre class="previewCodeContainer colorText bordered1">` + preguntasModalArray3[k][3] + `</pre></div>
                <div class="preguntaBox outputEsperado outputGetValue color5 bordered1"><b>Output: ` + preguntasModalArray3[k][4] + `</b></div>
                <h6><b>Su respuesta.</b></h6>
                <div class="respuestaBox respuestaBoxOpt3 goodColor bordered1"></div>
                <div class="ponderacionBox ponderacion_opt3 colorWhite bordered1"></div>
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
            <h5 class="tituloPregunta"><b>Ejercicio arrastrar ` + (numero + 1) + `</b></h5>
            <hr>
            <div class="preguntaBox colorGrey bordered1"><b>` + preguntasModalArray4[numero][0] + `</b></div>
            <h6><b>Relación correcta.</b></h6>
            <div class="opcionesContainerStyleViewCuestionarioArrastrar">`;
                return inicioContenido;
            }

            //Este es el div que cierra el contenido
            let finalContenido = `
            </div>
            <section class="colorGrey bordered1 shadow-1e respuestaFinalBoxes">
                <h6><b>Su respuesta.</b></h6>
                <div class="respuestaBox respuestaBoxOpt4 goodColor bordered1"></div>
                <div class="ponderacionBox ponderacion_opt4 colorWhite bordered1"></div>
            </section>`;

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
                <h5 class="tituloPregunta"><b>Pregunta True/False ` + (m + 1) + `</b></h5>
                <hr>
                <div class="preguntaBox colorGrey bordered1"><b>` + preguntasModalArray5[m][0] + `</b></div>
                <section class="colorGrey bordered1 shadow-1e respuestaFinalBoxes">
                    <h6><b>Solución de la pregunta.</b></h6>
                    <div class="opcionesContainerStyleViewCuestionarioTrueFalse">
                    <div class="preguntaBoxFalseTrue color5 coloredText bordered1"><b>` + preguntasModalArray5[m][1] + `</b></div>
                    </div>
                    <h6><b>Su respuesta.</b></h6>
                    <div class="respuestaBox respuestaBoxOpt5 goodColor bordered1"></div>
                    <div class="ponderacionBox ponderacion_opt5 colorWhite bordered1"></div>
                </section>
                `;
                contenedoresPregunta[m].innerHTML = contenido;
            }
        } else {
            console.log("No hay preguntas opt1")
            return "No hay preguntas opt1";
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
            <h5 class="tituloPregunta"><b>Pregunta abierta ` + (m + 1) + `</b></h5>
            <hr>
                <h6><b>Descripción.</b></h6>
                <div class="preguntaBox colorGrey bordered1"><b>` + preguntasModalArray6[m][0] + `</b></div>
                <div class="imagenBox bordered1 shadow-1e colorGrey">
                    <h6><b>Imagen adjunta.</b></h6>
                    <img alt='not available image' class="materialboxed imagenBoxContent bordered1" src="` + preguntasModalArray6[m][2] + `"></img>
                </div>
                <div class="contendorRecursoOnlineBox recursoOnlineEjercicios"> 
                <section class="colorGrey bordered1 shadow-1e respuestaFinalBoxes">
                    <h6><b>Solución de la pregunta.</b></h6>
                    <div class="preguntaBox outputEsperado sosoColor bordered1"><b>Estas preguntas se revisan de manera manual, espera a que tu profesor lea tu respuesta.</b></div>
                    <h6><b>Su respuesta.</b></h6>
                    <div class="respuestaBox respuestaBoxOpt6 goodColor bordered1"></div>
                    <div class="ponderacionBox ponderacion_opt6 colorWhite bordered1"></div>
                </section>
                `;
                contenedoresPregunta[m].innerHTML = contenido;
            }
        } else {
            console.log("No hay preguntas opt1")
            return "No hay preguntas opt1";
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
        for (var i = 0; i < outputGetValue.length; i++) {
            if (outputGetValue[i].innerText == "Output:") {
                outputGetValue[i].innerText = "--------";
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

    ///Accedemos a las respuestas del cuestionario (las del alumno)
    let respuestasModal1 = Object.values(preguntasModal1[preguntasModal1.length - 1]);
    let respuestasModal2 = Object.values(preguntasModal2[preguntasModal2.length - 1]);
    let respuestasModal3 = Object.values(preguntasModal3[preguntasModal3.length - 1]);
    let respuestasModal4 = Object.values(preguntasModal4[preguntasModal4.length - 1]);
    let respuestasModal5 = Object.values(preguntasModal5[preguntasModal5.length - 1]);
    let respuestasModal6 = Object.values(preguntasModal6[preguntasModal6.length - 1]);
    
    //Procesamos los textos de la sección de respuestas
    function procesarRespuestasAlumnos(respuestasLongitud, respuestas){
        let listaRespuestas = [];
        //Obtenemos las respuestas (Quitamos ponderación)
        for(var x = 0; x < respuestasLongitud; x++){
            listaRespuestas.push(respuestas[x].substr(0, respuestas[x].indexOf('&')))
        }

        let listaRespuestasFinal = [];
        //Obtenemos las respuestas (Quitamos el identificador)
        for(var x = 0; x < respuestasLongitud; x++){
            listaRespuestasFinal.push(listaRespuestas[x].substr(listaRespuestas[x].indexOf('/') + 1))
        }
        
        console.log(listaRespuestasFinal)
        return listaRespuestasFinal;
    }

    //Almacenamos las respuestas limpias
    let listaRespuestasLimpiaOpt1 = procesarRespuestasAlumnos(respuestasModal1[0].length,respuestasModal1[0]);
    let listaRespuestasLimpiaOpt2 = procesarRespuestasAlumnos(respuestasModal2[0].length,respuestasModal2[0]);
    let listaRespuestasLimpiaOpt3 = procesarRespuestasAlumnos(respuestasModal3[0].length,respuestasModal3[0]);
    let listaRespuestasLimpiaOpt4 = procesarRespuestasAlumnos(respuestasModal4[0].length,respuestasModal4[0]);
    let listaRespuestasLimpiaOpt5 = procesarRespuestasAlumnos(respuestasModal5[0].length,respuestasModal5[0]);
    let listaRespuestasLimpiaOpt6 = procesarRespuestasAlumnos(respuestasModal6[0].length,respuestasModal6[0]);
    
    function imprimirRespuestasAlumno(listaRespuestas, tipo){
        let respuestaBox = document.getElementsByClassName(tipo);
    
        //Imprimimos las respuestas
        if(tipo == "respuestaBoxOpt1" || tipo == "respuestaBoxOpt5" || tipo == "respuestaBoxOpt6"){
            for(var i = 0; i < respuestaBox.length; i++){
                if(listaRespuestas[i] == undefined){
                    respuestaBox[i].innerText = "vacio";
                }else if(listaRespuestas[i] == ""){
                    respuestaBox[i].innerText = "vacio";
                }else{
                    respuestaBox[i].innerText = listaRespuestas[i];
                }
            }
        }

        //Validamos impresión dependiendo del tipo
        if(tipo == "respuestaBoxOpt2"){
            for(var i = 0; i < respuestaBox.length; i++){
                if(listaRespuestas[i] == undefined){
                    respuestaBox[i].innerText = "vacio";
                }else if(listaRespuestas[i] == ""){
                    respuestaBox[i].innerText = "vacio";
                }else{
                    var textoConFormato = listaRespuestas[i].replace('/', '⚫ ');
                    textoConFormato = textoConFormato.replaceAll('/', '<br>⚫ ');
                    respuestaBox[i].innerHTML = textoConFormato;
                }
            }
        }

        //Validamos impresión dependiendo del tipo
        if(tipo == "respuestaBoxOpt3"){
            for(var i = 0; i < respuestaBox.length; i++){
                if(listaRespuestas[i] == undefined){
                    respuestaBox[i].innerText = "vacio";
                }else if(listaRespuestas[i] == ""){
                    respuestaBox[i].innerText = "vacio";
                }else{
                    var textoConFormato = listaRespuestas[i].replace('/', '<br>');
                    respuestaBox[i].innerHTML = textoConFormato;
                }
            }
        }

        //Validamos impresión dependiendo del tipo
        if(tipo == "respuestaBoxOpt4"){
            for(var i = 0; i < respuestaBox.length; i++){
                if(listaRespuestas[i] == undefined){
                    respuestaBox[i].innerText = "vacio";
                }else if(listaRespuestas[i] == ""){
                    respuestaBox[i].innerText = "vacio";
                }else{
                    var textoConFormato = listaRespuestas[i].replaceAll('/', '<br>');
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

    function evaluarCuestionario() {
        function evaluarOpt1(){
            //Input con la respuesta
            let rightAnswerOpt1 = document.getElementsByClassName("rightAnswerOpt1");
            //Div con la respuesta del usuario
            let respuestaBox = document.getElementsByClassName('respuestaBoxOpt1');
            //Div de ponderaciones
            let ponderacion_opt1 = document.getElementsByClassName('ponderacion_opt1');

            //Evaluamos y verificamos si es correcta
            for(var i = 0; i < rightAnswerOpt1.length; i++){
                if(rightAnswerOpt1[i].value == respuestaBox[i].textContent){
                    //Guardamos en el input el valor de bien
                    rightAnswerOpt1[i].value = "bien";
                    //Sumamos la ponderacion
                    var valorPonderacionOpt1 = ponderacion_opt1[i].innerText;
                    valorPonderacionOpt1 = valorPonderacionOpt1.substring(0,valorPonderacionOpt1.indexOf('pts.'));
                    ponderacionGlobal = ponderacionGlobal + parseInt(valorPonderacionOpt1);
                }else{
                    //Guardamos en el input el valor de mal
                    rightAnswerOpt1[i].value = "mal";
                    //Aplicamos los estilos
                    respuestaBox[i].classList.remove('goodColor');
                    respuestaBox[i].classList.add('badColor');
                }
            }
        }
        evaluarOpt1();
    }
    evaluarCuestionario();






    function calcularPromedio() {

    }

    function calcularPuntaje() {

    }
}
imprimirPreguntas();
