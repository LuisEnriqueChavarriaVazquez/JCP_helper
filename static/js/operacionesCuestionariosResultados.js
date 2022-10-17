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


//Debemos primeros hacer la impresion de las preguntas de acuerdo a su tipo y luego
//mostrar los resultados
function imprimirPreguntas() {

    function evaluarCuestionario() {

    }
}
imprimirPreguntas();
