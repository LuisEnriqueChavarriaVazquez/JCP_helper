/* <input type="hidden" value="{{datosGrupo}}" id="datosDeLosGrupos">
<input type="hidden" value="{{datosGlobalesAlumnos}}" id="datosGlobalesAlumnosDentroGrupo">
<input type="hidden" value="{{datosCuestionariosProfe}}" id="datosCuestionariosGeneralesCuestionarios">
<input type="hidden" value="{{datosCuestionariosTerminados}}" id="cuestionariosTerminados"></input> */

////////////////////////////////////////////////////////
//CÁLCULOS//////////////////////////////////////////////
////////////////////////////////////////////////////////
//Accedemos a la data como string
let datosCuestionariosTerminados = document.getElementById('cuestionariosTerminados').value;
datosCuestionariosTerminados = limpiarDatos(datosCuestionariosTerminados);
console.log('Cuestionarios terminados = ', datosCuestionariosTerminados);

////////////////////////////////////////////////////////
//Accedemos a los Promedios de los cuestionarios
let promediosCuestionariosHechos = datosCuestionariosTerminados.map((element) => {
    return parseFloat(element[6]);
});
console.log('Promedios de los cuestionarios hechos = ', promediosCuestionariosHechos);

////////////////////////////////////////////////////////
//Accedemos a los Promedios de los cuestionarios
let entregasRetrasoCuestionariosHechos = datosCuestionariosTerminados.map((element) => {
    return element[12];
});
console.log('Estado cuestionarios Retraso/A tiempo = ', entregasRetrasoCuestionariosHechos);

////////////////////////////////////////////////////////
//Accedemos a los Promedios de los cuestionarios
let tiemposRespuestaCuestionariosHechos = datosCuestionariosTerminados.map((element) => {
    return element[9];
});
console.log('Tiempos de respuesta de los cuestionarios = ', tiemposRespuestaCuestionariosHechos);

//Debemos transformar las horas a un formato de minutos medible
let horaConformatoNumerico = tiemposRespuestaCuestionariosHechos.map(hora => {
    //Quitamos el texto
    let numeroHora = hora.replaceAll('h', '').replaceAll('m', '').replaceAll('s', '');
    //Convertimos en un array
    numeroHora = numeroHora.split(':');
    //Obtenemos las hora a minutos
    numeroHora[0] = numeroHora[0] * 60;
    //Obtenemos los segundo a minutos
    numeroHora[2] = parseInt((numeroHora[2] * (1 / 60)).toFixed(0));
    //Obtenemos los minutos totales
    return numeroHora[0] + parseInt(numeroHora[1]) + numeroHora[2];
})
console.log('Minutos por cuestionarios', horaConformatoNumerico)

////////////////////////////////////////////////////////
//Accedemos a los Promedios de los cuestionarios
let idsAlumnosCuestionariosHechos = datosCuestionariosTerminados.map((element) => {
    return parseInt(element[2]);
});
console.log('Ids de los alumnos que han hecho un cuestionario = ', idsAlumnosCuestionariosHechos);

////////////////////////////////////////////////////////
//Accedemos a los Intentos de los cuestionarios
let intentosCuestionariosHechos = datosCuestionariosTerminados.map((element) => {
    return parseInt(element[11]);
});
console.log('Intentos hechos por cuestionarios = ', intentosCuestionariosHechos)

////////////////////////////////////////////////////////
//Accedemos a los IDS de los cuestionarios
let idsCuestionariosHechos = datosCuestionariosTerminados.map((element) => {
    return element[1];
});
console.log('Ids de los cuestionarios hechos = ', idsCuestionariosHechos)

let idsCuestionariosHechosOrdenados = idsCuestionariosHechos.sort((current, actual) => {
    return current - actual;
})

console.log("Ids de los cuestionarios en orden = ", idsCuestionariosHechosOrdenados);
////////////////////////////////////////////////////////
//Accedemos a los nombres de los grupos del docente
let datosCuestionariosProfe = document.getElementById('datosCuestionariosGeneralesCuestionarios').value;
datosCuestionariosProfe = limpiarDatos(datosCuestionariosProfe);
console.log('Datos de los cuestionarios = ', datosCuestionariosProfe);

//Guardamos todos los nombres de los cuestionarios en un set
let nombreCuestionariosSet = {};
let idsCuestionariosSet = new Set();
datosCuestionariosProfe.map(nombre => {
    nombreCuestionariosSet[nombre[0]] = nombre[3];
    idsCuestionariosSet.add(nombre[0]);
});
let arrayIdsCuestionariosGeneral = Array.from(idsCuestionariosSet);
console.log('Ids de los cuestionarios ', arrayIdsCuestionariosGeneral);

/*
*   Hay que buscar los cuestionarios hechos con los cuestionarios general
*   y borrar de los cuestionarios general los que no esten hechos.
*/
//arrayIdsCuestionariosGeneral (Todos los cuestionarios)
//idsCuestionariosHechosOrdenados (Todos los cuestionarios hechos)
let listaIdsCuestionariosDepurada =arrayIdsCuestionariosGeneral.filter(element => {
    if(idsCuestionariosHechosOrdenados.includes(element)){
        return element;
    }else{
        delete nombreCuestionariosSet[element];
    }
})
console.log('listaIdsCuestionariosDepurada', listaIdsCuestionariosDepurada);
console.log('Nombre de los cuestionarios ', nombreCuestionariosSet);

//Obtenemos solo los values del objeto de nombres de los cuestionarios ()
let cuestionarioConRespuestas = Object.values(nombreCuestionariosSet);
console.log('Nombre de los cuestionarios con respuestas', cuestionarioConRespuestas);

//Ordenamos la lista depurada
let listaIdsCuestionariosDepuradaOrdenada = listaIdsCuestionariosDepurada.sort((current, element) => {
    return current - element;
});
console.log('Lista depurada en orden', listaIdsCuestionariosDepuradaOrdenada);


//Debemos contar cuantos cuestionarios hay contestados
let contadorFrecuenciaRespuestas = idsCuestionariosHechosOrdenados.reduce((acc, curr) => {
    if(acc[curr]){
        ++acc[curr]
    }else if(acc[curr] = ""){
        acc[curr] = 0
    }else{
        acc[curr] = 1
    }
    return acc;
}, {});

console.log("Objeto con el conteo de los elementos", contadorFrecuenciaRespuestas) // => {2: 5, 4: 1, 5: 3, 9: 1}
let contadorFrecuenciaRespuestasArray = Object.values(contadorFrecuenciaRespuestas);
console.log('Array con el conteo de las respuestas', contadorFrecuenciaRespuestasArray) //🔴

////////////////////////////////////////////////////////
//Extraemos los IDs de los grupos
let idGrupos = [];
idsCuestionariosHechosOrdenados.map((idGrupo) => {
    datosCuestionariosProfe.forEach(grupoId => {
        if (idGrupo == grupoId[0]) {
            idGrupos.push(grupoId[1]);
        }
    });
});
console.log('idGrupos', idGrupos);

////////////////////////////////////////////////////////
//Accedemos a los nombres de los grupos del docente
let datosGrupo = document.getElementById('datosDeLosGrupos').value;
datosGrupo = limpiarDatos(datosGrupo);
console.log('Datos de los grupos = ', datosGrupo);

////////////////////////////////////////////////////////
//Lo definimos como set para eliminar los repetidos
let gruposNames = new Set();
let gruposIDSet = new Set();
datosGrupo.filter((grupo) => {
    idGrupos.forEach(id => {
        if (id == grupo[0]) {
            gruposNames.add(grupo[2]);
            gruposIDSet.add(id);
        }
    });
});
let gruposNameArray = Array.from(gruposNames);
let gruposIdsArray = Array.from(gruposIDSet);
console.log('gruposNameArray', gruposNameArray);
console.log('gruposIDSet', gruposIdsArray)

/////////////////////////////////////////////////////////
//Debemos vincular los promedios con su respectivo grupo
/*  
*   promediosCuestionariosHechos
*   idGrupos  
*/
//Juntamos en un array de cadenas idgrupo_promedio
let counter = 0;
let sumaPromedioGrupos = idGrupos.map(id => {
    return `${id}_${promediosCuestionariosHechos[counter++]}`;
});
console.log('sumaPromedioGrupos', sumaPromedioGrupos);

//Contamos la cantidad de elemento pertenecientes a un grupo
let contadorPosicionesIds = [];
for (var i = 0; i < gruposIdsArray.length; i++) {
    contadorPosicionesIds.push(idGrupos.filter(x => x === gruposIdsArray[i]).length);
}
console.log('contadorPosicionesIds', contadorPosicionesIds)

//Debemos sumar los puntajes de cada grupo
let puntajePorGrupo;
let puntajePorGrupoArray = [];
//Esta es una copia para poder hacer unshift en ella
let promediosCuestionariosHechosCopia = { ...promediosCuestionariosHechos };
promediosCuestionariosHechosCopia = Object.values(promediosCuestionariosHechosCopia);

for (var j = 0; j < contadorPosicionesIds.length; j++) {
    puntajePorGrupo = 0;
    for (var r = 0; r < contadorPosicionesIds[j]; r++) {
        puntajePorGrupo += parseFloat(promediosCuestionariosHechosCopia[r])
    }
    r = 0;
    puntajePorGrupoArray.push(puntajePorGrupo);
    for (var h = 0; h < contadorPosicionesIds[j]; h++) {
        promediosCuestionariosHechosCopia.shift();
    }
}
console.log('Puntaje por grupo', puntajePorGrupoArray);

//Debemos dividir los puntajes entre el total de elementos por grupo
contador = 0;
let promedioFinalPorGrupo = puntajePorGrupoArray.map(sumatoria => {
    return sumatoria / contadorPosicionesIds[contador++];
});
console.log('Promedio por cada grupo', promedioFinalPorGrupo);

//Debemos obtener a cuanto en porcentage equivalen los promedios.
//Debemos sumar los promedios
let sumaAritmeticaPromedios = promedioFinalPorGrupo.reduce((suma, element) => suma + element);
//Obtenemos los porcentages
let porcentajePromedioEquivalente = promedioFinalPorGrupo.map(promedio => {
    let porcentajeCalculo = ((promedio * (100)) / sumaAritmeticaPromedios).toFixed(2);
    return parseFloat(porcentajeCalculo);
});
console.log('porcentajePromedioEquivalente', porcentajePromedioEquivalente)

//Hacemos arrays multidimensionales por cuestionarios hechos
let promediosCuestionariosHechosCopia2 = [...promediosCuestionariosHechos];
let promediosCuestionariosMultidimensionales = [];
for (var y = 0; y < contadorFrecuenciaRespuestasArray.length; y++) {
    //Para los minutos por cuestionario
    let arrayTemporal1 = [];
    arrayTemporal1.push(promediosCuestionariosHechosCopia2.splice(0, contadorFrecuenciaRespuestasArray[y]));
    promediosCuestionariosMultidimensionales.push(arrayTemporal1);
}
console.log('Promedio por cuestionario multidimensional = ', promediosCuestionariosMultidimensionales)

//Sumamos los promedios del array de promedios multidimensional
let promediosPorCuestionario = []
promediosCuestionariosMultidimensionales.forEach(element => {
    let sumaElementos = element[0].reduce((acumulado, value) => acumulado + value);
    promediosPorCuestionario.push(parseFloat((sumaElementos/(element[0].length)).toFixed(2)));
});
console.log('Promedios globales de los cuestionarios contestados = ', promediosPorCuestionario)

//Debemos separar en un array multidimensional los promedios de los cuestionarios por grupo
let promediosMultidimensional = []; //[[],[],[]] un array por grupo
let intentosMultidimensional = [];
let idsAlumnosMultidimensional = [];
let minutosPorCuestionarioMultidimensional = [];
let entregasRetrasoMultidimensional = [];
for (var y = 0; y < contadorPosicionesIds.length; y++) {
    //Para los promedios
    let arrayTemporal1 = [];
    arrayTemporal1.push(promediosCuestionariosHechos.splice(0, contadorPosicionesIds[y]));
    promediosMultidimensional.push(arrayTemporal1);

    //Para los intentos
    let arrayTemporal2 = [];
    arrayTemporal2.push(intentosCuestionariosHechos.splice(0, contadorPosicionesIds[y]));
    intentosMultidimensional.push(arrayTemporal2);

    //Para los ids
    let arrayTemporal3 = [];
    arrayTemporal3.push(idsAlumnosCuestionariosHechos.splice(0, contadorPosicionesIds[y]));
    idsAlumnosMultidimensional.push(arrayTemporal3);

    //Para los minutos por cuestionario
    let arrayTemporal4 = [];
    arrayTemporal4.push(horaConformatoNumerico.splice(0, contadorPosicionesIds[y]));
    minutosPorCuestionarioMultidimensional.push(arrayTemporal4);

    //Para los minutos por cuestionario
    let arrayTemporal5 = [];
    arrayTemporal5.push(entregasRetrasoCuestionariosHechos.splice(0, contadorPosicionesIds[y]));
    entregasRetrasoMultidimensional.push(arrayTemporal5);
}
promediosMultidimensional = promediosMultidimensional.flat(1);
console.log('Promedio dividido en array por grupo', promediosMultidimensional);
console.log('Intentos dividido en array por grupo', intentosMultidimensional);
console.log('Minutos dividido en array por grupo', minutosPorCuestionarioMultidimensional)
console.log('Retrasos multidimensional', entregasRetrasoMultidimensional)

//Calculamos el promedio de la suma de los tiempos
let sumaTiemposCuestionarioMultidimensional = [];
minutosPorCuestionarioMultidimensional.forEach((grupo) => {
    let arrayTemporal = [];
    let suma = grupo[0].reduce((sum, element) => sum + element);
    arrayTemporal.push(suma, grupo[0].length);
    sumaTiemposCuestionarioMultidimensional.push(arrayTemporal);
});
console.log('Suma tiempos / cantidad cuestionarios en minutos', sumaTiemposCuestionarioMultidimensional);

//Calculamos el promedio de tiempo por cuestionario
let promedioTiempoPorGrupo = sumaTiemposCuestionarioMultidimensional.map(tiempo => {
    return parseFloat(((tiempo[0] / tiempo[1]) * (1 / 60)).toFixed(1));
});
console.log('Promedio de tiempo por grupo', promedioTiempoPorGrupo)

//Filtramos los elementos retreaso y a_tiempo
let cantidadRetrasos = [];
let cantidadATiempo = [];

entregasRetrasoMultidimensional.forEach((element) => {
    let arrayTemporalRetrasado = [];
    let arrayTemporalA_tiempo = [];
    element[0].forEach(estado => {
        if (estado == "retraso") {
            arrayTemporalRetrasado.push(estado);
        } else {
            arrayTemporalA_tiempo.push(estado);
        }
    });
    let total = arrayTemporalRetrasado.length + arrayTemporalA_tiempo.length;
    cantidadRetrasos.push(parseFloat(((arrayTemporalRetrasado.length * 100) / total).toFixed(2)));
    cantidadATiempo.push(parseFloat(((arrayTemporalA_tiempo.length * 100) / total).toFixed(2)));
});
console.log('Porcentaje de retraso por grupo', cantidadRetrasos)
console.log('Porcentaje de a_tiempo por grupo', cantidadATiempo)


//Ordenamos de menor a mayor el promedio por grupo multidimensional
let promediosMultidimensionalOrdenado = [];
promediosMultidimensional.forEach((grupo) => {
    //Debemos ordenar los valores de menor a mayor
    let grupoPromediosOrdenados = grupo.sort((current, next) => {
        return current - next;
    });
    promediosMultidimensionalOrdenado.push(grupoPromediosOrdenados);
});
console.log('promediosMultidimensionalOrdenado', promediosMultidimensionalOrdenado)

let arrayPromediosIntentosPorGrupo = [];
intentosMultidimensional.forEach((grupo, i = 0) => {
    let total = grupo[0].reduce((suma, element) => {
        return suma + element
    });
    let promedio = parseFloat((total / contadorPosicionesIds[i++]).toFixed(2));
    arrayPromediosIntentosPorGrupo.push(promedio);
});
console.log('arrayPromediosIntentosPorGrupo', arrayPromediosIntentosPorGrupo);

///////////////////////////Datos indice de aprobacion
////////////////////////////////////////////////////////🔴
//Accedemos a los estados de aprobación de los cuestionarios.
let estadoAprobacion = datosCuestionariosTerminados.map((element) => {
    return element[5];
});
console.log('Estados de aprobacion = ', estadoAprobacion)

//Se deben separar los estados de aprovado deun array multidimensional
//contadorPosicionesIds
//Debemos separar en un array multidimensional los promedios de los cuestionarios por grupo
let aprobacionMultidimensional = []; //[[],[],[]] un array por grupo
for (var y = 0; y < contadorPosicionesIds.length; y++) {
    let arrayTemporal = [];
    arrayTemporal.push(estadoAprobacion.splice(0, contadorPosicionesIds[y]));
    aprobacionMultidimensional.push(arrayTemporal);
}
aprobacionMultidimensional = aprobacionMultidimensional.flat(1);
console.log('Arrays de aprobación por grupo', aprobacionMultidimensional); //Este contiene tanto aprobado como reprobado

let aprobacionMultidimensionalAprobados = [...aprobacionMultidimensional];
let aprobacionMultidimensionalReprobados = [...aprobacionMultidimensional];

//Debemos eliminar los reprobados del el array. [[],[],[]]
let aprobadosCounter = [];
let reprobadosCounter = [];
let aprobacionTotal = [];
aprobacionTotal.push(aprobadosCounter);
aprobacionTotal.push(reprobadosCounter);
let graficasTitle = ['aprobados', 'reprobados'];
for (var i = 0; i < aprobacionMultidimensionalAprobados.length; i++) {
    let contadorAprobados = 0;
    let contadorReprobados = 0;
    aprobacionMultidimensionalAprobados[i].filter(element => {
        if (element == 'aprobado') {
            contadorAprobados++;
        } else if (element == 'reprobado') {
            contadorReprobados++;
        }
    });
    aprobadosCounter.push(contadorAprobados);
    reprobadosCounter.push(contadorReprobados);
};
console.log('aprobadosCounter', aprobadosCounter) //Hace la cuenta de los aprobados. 😀
console.log('reprobadosCounter', reprobadosCounter) //Hace la cuenta de los reprobados 😀
console.log('aprobacionTotal', aprobacionTotal) //Encontramos 2 arrays con los alumnos reprobados y aprobados

//Sumamos el total de los alumnos aprobados.
let sumaAprobados = aprobadosCounter.reduce((sum, element) => {
    return sum + element;
});
console.log('sumaAprobados', sumaAprobados)

//Sumamos el total de los alumnos reprobados.
let sumaReprobados = reprobadosCounter.reduce((sum, element) => {
    return sum + element;
});
console.log('sumaReprobados', sumaReprobados)

//Calculamos porcentaje de reprobados y aprobados
let totalAprobacion = sumaReprobados + sumaAprobados;
let porcentajeAprobacion = ((sumaAprobados * 100) / totalAprobacion).toFixed(2);
porcentajeAprobacion = parseFloat(porcentajeAprobacion);
let porcentajeReprobacion = ((sumaReprobados * 100) / totalAprobacion).toFixed(2);
porcentajeReprobacion = parseFloat(porcentajeReprobacion);
//Guardamos los porcentajes de aprobacion
let arrayPorcentajeAprobacion = [];
arrayPorcentajeAprobacion.push(porcentajeAprobacion);
arrayPorcentajeAprobacion.push(porcentajeReprobacion);
console.log('arrayPorcentajeAprobacion', arrayPorcentajeAprobacion)

/////Calculo de los porcentages por grupo (Graficas de barrar horizontales)
//Accedemos a los porcentajes globales
let porcentageGlobal = [...arrayPorcentajeAprobacion];
//Convertimos el procentage de aprobados a un número cercano a 10
let aprobadosFormatoDiez = Math.ceil(porcentageGlobal[0] / 10);
console.log('aprobadosFormatoDiez', aprobadosFormatoDiez)
//Accedemos a los datos de manera individual
let nombreGrupos_unitario = [...gruposNameArray];
let numerosAprobacionTotal = [...aprobacionTotal[0]];
let numerosReprobacionTotal = [...aprobacionTotal[1]];
//Obtenemos el conteo del total de alumnos por grupo
let listadoALumnos = [...aprobacionMultidimensional];

//Obtenemos el conteo del total de alumnos por grupo
let conteoPorGrupo = []; //Se guarda la cantidad de alumnos por grupo
listadoALumnos.forEach(grupo => conteoPorGrupo.push(grupo.length))
console.log('conteoPorGrupo', conteoPorGrupo)

//Calculamos el porcentage de aprobados y reprobados por grupo
let porcentagesDividosPorGrupo = []; //Almacenamos los datos de los procentages
conteoPorGrupo.forEach((grupoTotal, i = 0) => {
    let gruposArrayTemporal = [];
    let porcentageTemporalAprobados = parseFloat(((numerosAprobacionTotal[i] * 100) / grupoTotal).toFixed(2));
    let porcentageTemporalReprobados = parseFloat(((numerosReprobacionTotal[i] * 100) / grupoTotal).toFixed(2));
    gruposArrayTemporal.push(porcentageTemporalAprobados, porcentageTemporalReprobados);
    porcentagesDividosPorGrupo.push(gruposArrayTemporal);
})
console.log('porcentagesDividosPorGrupo', porcentagesDividosPorGrupo)

/////////////////////////////////////////////////
//Funcion para limpiar los datos
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

//Funcion para generar arrays que cuenten de 1 en 1 según un tamaño dado.
function generadorArraysWithASize(arraySizes) {
    let generalArray = [];
    for (var i = 0; i < arraySizes.length; i++) {
        let temporalArray = [];
        for (var j = 0; j < arraySizes[i]; j++) {
            temporalArray.push(j + 1);
        }
        generalArray.push(temporalArray);
    }
    return generalArray;
}