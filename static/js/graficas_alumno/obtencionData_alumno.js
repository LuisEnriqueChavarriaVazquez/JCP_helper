//Obtenemos los datos del usuario
let dataUserToShow = document.getElementById('datos_cuestionario_hechos_alumno').value;
//Data limpia
let dataClean = limpiarDatos(dataUserToShow);

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