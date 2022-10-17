//Accedemos a los datos del JSON...esta vez para crear un nuevo objeto con la respuesta del estudiante
/////////////////////////////////////////////////////////////////
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

//Esta funcion se llama cuando hace la entrega de los resultados
//sirve para el procesamiento de los resultados del estudiante.

//EN EL PREVIEW DEL ESTUDIANTE ESTA EN EL BOTON DE "SIMULAR ENTREGA"
//EN LA PANTALLA CUANDO EL ALUMNO ESTE HACIENDO SU CUESTIONARIO ESTARA EN EL BOTON DE "ENTREGAR"
function procesamientoDeResultados(){
    //Se hace la lectura de las ponderaciones (en el orden que estan renderizados)
    function lecturaDePonderacionResultadoPreguntas(){
        //Aqui estan las ponderaciones escritas en pantalla
        let ponderacionBoxes = document.getElementsByClassName('ponderacionBox');
        //Aqui estan las respuesta de los estudiantes obtenidas de los inputs hidden
        let answerCollectorBoxes = document.getElementsByClassName('answerCollector');
        let cantidadPreguntas = ponderacionBoxes.length;
        let listaPonderaciones = [];
        let listaRespuestas = [];
        let listaIds = [];
        let textoPonderacion,textoRespuesta; 

        for(var y = 0; y < cantidadPreguntas; y++){
            //Guardamos en una lista las ponderaciones
            textoPonderacion = ponderacionBoxes[y].innerText;
            listaPonderaciones.push(textoPonderacion.substring(0,textoPonderacion.indexOf('pts.')));
            
            //Guardamos en una lista las respuestas del estudiante
            textoRespuesta = answerCollectorBoxes[y].value;
            listaRespuestas.push(textoRespuesta);

            //Guardamos el IDENTIFICAR de la pregunta (PARA SABER A QUE PREGUNTA PERTENECE LA RESPUESTA)
            listaIds.push(answerCollectorBoxes[y].getAttribute('id'));
        }
        
        //La respuesta (el orden en la lista) concuerda con la ponderacion y la pregunta de la que viene
        //EL ORDEN DE LAS PREGUNTAS ES POR TIPO, EL ORDEN DE LOS TIPOS DEPENDE DE LA IMPRESIÓN 
        //SE RENDERIZAN DE FORMA ORGANIZADA POR ESO OCURRE ESTO

        console.log('listaPonderaciones', listaPonderaciones);
        console.log('listaRespuestas', listaRespuestas);
        console.log('listaIds', listaIds);

        //Hay que organizar en 6 array las respuestas con la siguiente estructura
        //{"respuestasOpt1": [["id","respuesta","ponderacion"],["id","respuesta","ponderacion"]]}

        let respuestasOpt1 = [];
        let respuestasOpt2 = [];
        let respuestasOpt3 = [];
        let respuestasOpt4 = [];
        let respuestasOpt5 = [];
        let respuestasOpt6 = [];
        let listaHelper = [];
        function organizarListasDeRespuestas(){
            for(t = 0; t < listaIds.length; t++){
                //console.log(listaIds[t].indexOf("opt1InputGet"));
                if(listaIds[t].indexOf("opt1InputGet_") != -1){
                    listaHelper.push(listaIds[t] + "/" + listaRespuestas[t] + "/" + listaPonderaciones[t]);
                    respuestasOpt1.push(listaHelper[0]);
                    listaHelper.pop();
                }else if(listaIds[t].indexOf("opt2InputGet_") != -1){
                    listaHelper.push(listaIds[t] + "/" + listaRespuestas[t] + "/" + listaPonderaciones[t]);
                    respuestasOpt2.push(listaHelper[0]);
                    listaHelper.pop();
                }else if((listaIds[t].indexOf("opt3InputGet_") != -1)){
                    listaHelper.push(listaIds[t] + "/" + listaRespuestas[t] + "/" + listaPonderaciones[t]);
                    respuestasOpt3.push(listaHelper[0]);
                    listaHelper.pop();
                }else if((listaIds[t].indexOf("opt4InputGet_") != -1)){
                    listaHelper.push(listaIds[t] + "/" + listaRespuestas[t] + "/" + listaPonderaciones[t]);
                    respuestasOpt4.push(listaHelper[0]);
                    listaHelper.pop();
                }else if((listaIds[t].indexOf("opt5InputGet_") != -1)){
                    listaHelper.push(listaIds[t] + "/" + listaRespuestas[t] + "/" + listaPonderaciones[t]);
                    respuestasOpt5.push(listaHelper[0]);
                    listaHelper.pop();
                }else if((listaIds[t].indexOf("opt6InputGet_") != -1)){
                    listaHelper.push(listaIds[t] + "/" + listaRespuestas[t] + "/" + listaPonderaciones[t]);
                    respuestasOpt6.push(listaHelper[0]);
                    listaHelper.pop();
                }
            }
        }
        organizarListasDeRespuestas();

        //Metemos los 6 array en los objetos del JSON
        function meterListasEnElObjeto(){
            //Ingresamos en los array las respuestas
            //Metemos las respuestas en el objeto principal
            dataCuestionarioJSON.preguntasModal1.push({"respuestas":respuestasOpt1});
            dataCuestionarioJSON.preguntasModal2.push({"respuestas":respuestasOpt2});
            dataCuestionarioJSON.preguntasModal3.push({"respuestas":respuestasOpt3});
            dataCuestionarioJSON.preguntasModal4.push({"respuestas":respuestasOpt4});
            dataCuestionarioJSON.preguntasModal5.push({"respuestas":respuestasOpt5});
            dataCuestionarioJSON.preguntasModal6.push({"respuestas":respuestasOpt6});
            //console.log(dataCuestionarioJSON);
        }
        meterListasEnElObjeto();

        //Mensajes del tiempo (Si se acabo el tiempo guarda en el JSON un mensaje de retraso)
        let contadorFecha = document.getElementById('contadorFecha').textContent;
        let tiempoRestante = document.getElementById('tiempoRestante').textContent;
        function verificarSiRetrasado(){
            if(contadorFecha == "No time" || tiempoRestante == "No time"){
                dataCuestionarioJSON.ordenPreguntas.push({"retrasado":"true"});
            }else{
                dataCuestionarioJSON.ordenPreguntas.push({"retrasado":"false"});
            }
        }
        verificarSiRetrasado();

        //Se debe guardar un JSON en la columna "PreviewCuestionarioRuta" de PREVIEW de la tabla "CUESTIONARIOS"
        function crearElJson(){
            //Almacenamos el contenido del JSON en el input
            document.getElementById('jsonContentInput').value = JSON.stringify(dataCuestionarioJSON);
        }
        crearElJson();
    }
    lecturaDePonderacionResultadoPreguntas();
}

//En caso de que el tiempo haya terminado el mensaje de envio cambia
function mensajeDeRevisionRetraso(){
    setInterval(function () {
        //Mensajes del tiempo
        let contadorFecha = document.getElementById('contadorFecha').textContent;
        let tiempoRestante = document.getElementById('tiempoRestante').textContent;
        //Mensaje del boton
        let botonRevisarMensaje = document.getElementById('botonRevisarMensaje');
        
        if(contadorFecha == "No time" || tiempoRestante == "No time"){
            botonRevisarMensaje.textContent = "Enviar con retraso.";
            botonRevisarMensaje.classList.remove('infoColorButton');
            botonRevisarMensaje.classList.add('badColorButton');
        }
    }, 1000);
}
mensajeDeRevisionRetraso();