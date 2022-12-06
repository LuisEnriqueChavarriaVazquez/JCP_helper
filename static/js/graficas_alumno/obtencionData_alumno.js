//Obtenemos los datos del usuario
let dataUserToShow = document.getElementById('datos_cuestionario_hechos_alumno').value;
//Data limpia
let dataClean = limpiarDatos(dataUserToShow);
console.log('dataClean', dataClean)

/////////////////////////////////////////////////
//Limpiamos los datos del usuario
function limpiarDatos(string) {
    //Como en python eran tuplas, necesitamos convertir todo en array
    string = string.replaceAll('(', '[');
    string = string.replaceAll(')', ']');
    string = string.replace('],]', ']]');
    string = string.replace(']]]]', ']]');
    string = string.replace('[[[[', '[[');
    string = string.replaceAll("\'", "\"");
    string = string.replaceAll("None", "0");
    //Son los datos de los cuestionarios evaluados. (en estado ready)
    string = JSON.parse(string);
    return string
}

//Hacemos la funcion para que obtenga el promedio total
function obtencionPromedio(mainArray) {
    //Obtenemos todos los promedios del array
    let promedios = mainArray.map(element => {
        if (element[6] != "pending") {
            return parseFloat(element[6]);
        } else {
            return undefined;
        }
    });

    //Filtramos todos los elementos que sean undefined
    let promediosFiltrados = promedios.filter(element => {
        if (element != undefined) {
            return element;
        }
    })

    //Obtenemos la suma de todos los elementos
    let sumaPromedios = promediosFiltrados.reduce((element, value) => {
        return element + value;
    });

    //Obtenemos el promedio del estudiante.
    let promedio = parseFloat((sumaPromedios / (promedios.length)).toFixed(1));
    return promedio;
}

//Hacemos la funcion para obtener el mejor resultado de todos
function bestResult(mainArray) {
    //Array para ser ordenado
    let arrayProof = [...mainArray];

    //Obtenemos todos los promedios del array
    let promedios = arrayProof.map(element => {
        if (element[6] != "pending") {
            return parseFloat(element[6]);
        } else {
            return undefined;
        }
    });

    //Filtramos todos los elementos que sean undefined
    let promediosFiltrados = promedios.filter(element => {
        if (element != undefined) {
            return element;
        }
    })

    //Ordenamos el array de menor a mayor
    let arrayOrdenado = promediosFiltrados.sort((a, b) => {
        return a - b;
    })

    //Retornamos el valor más grande
    return arrayOrdenado.at(-1);
}

//Hacemos la funcion para calcular las calificaciones del alumno
function calculadoraPromedios() {
    //Obtenemos todos los promedios del array
    let promedios = dataClean.map(element => {
        if (element[6] != "pending") {
            return parseFloat(element[6]);
        } else {
            return undefined;
        }
    });

    //Filtramos todos los elementos que sean undefined
    let promediosFiltrados = promedios.filter(element => {
        if (element != undefined) {
            return element;
        }
    })

    //Obtenemos la suma de todos los elementos
    let sumaPromedios = promediosFiltrados.reduce((element, value) => {
        return element + value;
    });

    let percentage = (sumaPromedios * 10 / (100 * (promediosFiltrados.length))) * 100;
    percentage = percentage.toFixed(2)

    if (percentage <= 100 && percentage >= 80) {
        grades = "A";
    } else if (percentage <= 79 && percentage >= 60) {
        grades = "B";
    } else if (percentage <= 59 && percentage >= 40) {
        grades = "C";
    } else {
        grades = "F";
    }

    return `${(percentage / 10).toFixed(2)}/${grades}`;
}

//Hacemos el conteo de los elementos requeridos
function contadorElementosTiempo() {
    let tiempos = dataClean.map((element) => {
        return element.at(-1);
    });

    let a_tiempo = [];
    let con_retraso = tiempos.filter(element => {
        if (element == 'a_tiempo') {
            a_tiempo.push(element);
        } else if (element == 'retraso') {
            return element;
        }
    });

    let longitud = [a_tiempo.length, con_retraso.length];
    return longitud;
}

//Hacemos el conteo de los elementos requeridos para los aprobados y reprobados
function contadorAprobadoReprobados() {
    let tiempos = dataClean.map((element) => {
        return element[5];
    });

    let aprobado = [];
    let reprobado = tiempos.filter(element => {
        if (element == 'aprobado') {
            aprobado.push(element);
        } else if (element == 'reprobado') {
            return element;
        }
    });

    let longitud = [aprobado.length, reprobado.length];
    return longitud;
}

//Hacemos el conteo de los elementos ready y pending
function contadorReadyPending() {
    let tiempos = dataClean.map((element) => {
        return element[4];
    });

    let ready = [];
    let started = [];
    let pending = tiempos.filter(element => {
        if (element == 'ready') {
            ready.push(element);
        } else if (element == 'pending') {
            return element;
        } else if (element == 'started') {
            started.push(element);
        }
    });

    let longitud = [ready.length, pending.length, started.length];
    return longitud;
}

//Hacemos la funcion para convertir el tiempo en un formato que entendamos
function convertirFormatoHora() {
    let horaConformatoNumerico = dataClean.map(hora => {
        if(hora != null){
            //Quitamos el texto
            let horaTexto = hora[9];
            if(isNaN(horaTexto)){
                let numeroHora = horaTexto.replaceAll('h', '').replaceAll('m', '').replaceAll('s', '');
                //Convertimos en un array
                numeroHora = numeroHora.split(':');
                //Obtenemos las hora a minutos
                numeroHora[0] = numeroHora[0] * 60;
                //Obtenemos los segundo a minutos
                numeroHora[2] = parseInt((numeroHora[2] * (1 / 60)).toFixed(0));
                //Obtenemos los minutos totales
                return numeroHora[0] + parseInt(numeroHora[1]) + numeroHora[2];
            }else{
                return 0
            }
        }else{
            return '0h:0m:0s'
        }
    })

    let totalMinutos = horaConformatoNumerico.reduce((element, value) => {
        return element + value;
    })

    let promediosMinutos = totalMinutos / (horaConformatoNumerico.length);
    promediosMinutos = parseFloat((promediosMinutos).toFixed(1))
    return promediosMinutos;
}

///////////////////////////////////////////
//Insercion de la tendencia de promedio
let tendenciaPromedioElement = document.getElementById('number_4');
//Nuestro valor de tendencia
const tendenciaTotal = calculadoraPromedios();
tendenciaPromedioElement.textContent = tendenciaTotal;

//////////////////////////////////////////
//Insercion de la longitud total de cuestionarios
let longitudTotalElement = document.getElementById('number_1');
//Nuestro mejor valor
const longitudTotal = dataClean.length;
longitudTotalElement.textContent = longitudTotal;

//////////////////////////////////////////
//Insercion de elementos en la interfaz
let bestGradeElement = document.getElementById('number_3');
//Nuestro mejor valor
const mejorValor = bestResult(dataClean);
bestGradeElement.textContent = mejorValor;


//////////////////////////////////////////
//Insercion de elementos en la interfaz
let promedioElement = document.getElementById('number_2');
//Nuestro promedio final
const promedioFinal = obtencionPromedio(dataClean); //💯
promedioElement.textContent = promedioFinal;

//Accedemos a los valores con conteo de datos adicionales
let aTiempo = document.getElementById('value_1_mini');
let conRetraso = document.getElementById('value_2_mini');
let aprobados = document.getElementById('value_5_mini');
let reprobados = document.getElementById('value_6_mini');
let ready = document.getElementById('value_4_mini');
let pendiente = document.getElementById('value_3_mini');
let started = document.getElementById('value_8_mini');
let tiempoPromedio = document.getElementById('value_7_mini');

//Insertamos los elementos a tiempo y con retraso
let valoresTiempo = contadorElementosTiempo();
aTiempo.textContent = valoresTiempo[0];
conRetraso.textContent = valoresTiempo[1];

//Insertamos los elementos de aprobados y reprobados
let valoresAprobadosReprobados = contadorAprobadoReprobados();
aprobados.textContent = valoresAprobadosReprobados[0] + "/" + longitudTotal;
reprobados.textContent = valoresAprobadosReprobados[1] + "/" + longitudTotal;

//Insertamos los elementos de ready y de pending
let valorReadyPending = contadorReadyPending();
ready.textContent = valorReadyPending[0];
pendiente.textContent = valorReadyPending[1];
started.textContent = valorReadyPending[2];

//Insertamos los valores del promedio de los minutos
let promedioMinutos = convertirFormatoHora();
tiempoPromedio.textContent = promedioMinutos + "min";