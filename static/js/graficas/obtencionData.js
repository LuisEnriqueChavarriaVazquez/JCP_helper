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

//Accedemos a los Puntajes de los cuestionarios
let puntajesPorTipoPregunta = datosCuestionariosTerminados.map((element) => {
    return element[8];
});
console.log('Accedemos a los puntajes de cada una de las preguntas = ', puntajesPorTipoPregunta);

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
let listaIdsCuestionariosDepurada = arrayIdsCuestionariosGeneral.filter(element => {
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
let horaConformatoNumericoCopia2 = [...horaConformatoNumerico];
let horaConformatoNumericoMultidimensional2 = [];
for (var y = 0; y < contadorFrecuenciaRespuestasArray.length; y++) {
    //Para los promedios de los cuestionarios
    let arrayTemporal1 = [];
    arrayTemporal1.push(promediosCuestionariosHechosCopia2.splice(0, contadorFrecuenciaRespuestasArray[y]));
    promediosCuestionariosMultidimensionales.push(arrayTemporal1);

    //Para los tiempos promedios de los cuestionarios
    let arrayTemporal2 = [];
    arrayTemporal2.push(horaConformatoNumericoCopia2.splice(0, contadorFrecuenciaRespuestasArray[y]));
    horaConformatoNumericoMultidimensional2.push(arrayTemporal2);
}
console.log('Promedio por cuestionario multidimensional = ', promediosCuestionariosMultidimensionales);
console.log('Horas con formato de minutos muitidimensional = ', horaConformatoNumericoMultidimensional2);

//Sumamos los promedios del array de promedios multidimensional
let promediosPorCuestionario = []
promediosCuestionariosMultidimensionales.forEach(element => {
    let sumaElementos = element[0].reduce((acumulado, value) => acumulado + value);
    promediosPorCuestionario.push(parseFloat((sumaElementos/(element[0].length)).toFixed(2)));
});
console.log('Promedios globales de los cuestionarios contestados = ', promediosPorCuestionario);

//Sumamos el tiempo que se tardo cada estudiante y obtenemos el promedio en horas.
let promedioTiempoPorCuestionario = [];
horaConformatoNumericoMultidimensional2.forEach(element => {
    let sumaElementos = element[0].reduce((sum, value) => sum + value);
    sumaElementos = parseFloat((sumaElementos * (1/60)).toFixed(2))
    promedioTiempoPorCuestionario.push(sumaElementos/element[0].length);
})
console.log('Promedio de tiempo por cuestionario = ', promedioTiempoPorCuestionario)

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
let estadoAprobacionCopia1 = [...estadoAprobacion];

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
console.log('porcentagesDividosPorGrupo', porcentagesDividosPorGrupo);

//////////////////Hacemos la separación de puntajes
let puntajesPorTipoPreguntaCopia2 = [...puntajesPorTipoPregunta];
let opt1Puntos = [];
let opt2Puntos = [];
let opt3Puntos = [];
let opt4Puntos = [];
let opt5Puntos = [];
let opt6Puntos = [];
//Debemos separar los elementos según el tipo de pregunta.
let arrayPuntajesPreguntasFragmentado = puntajesPorTipoPreguntaCopia2.map(element => {
    let arrayTemporal = element.split(',');
    return arrayTemporal;
});
console.log('arrayPuntajesPreguntasFragmentado', arrayPuntajesPreguntasFragmentado)

//Debemos tomar los elementos en orden y meterlos en 6 arrays
arrayPuntajesPreguntasFragmentado.forEach(element => {
    element.forEach((value, i = 0) => {
        if(i == 0){
            opt1Puntos.push(value);
        }else if(i == 1){
            opt2Puntos.push(value);
        }else if(i == 2){
            opt3Puntos.push(value);
        }else if(i == 3){
            opt4Puntos.push(value);
        }else if(i == 4){
            opt5Puntos.push(value);
        }else if(i == 5){
            opt6Puntos.push(value);
        }
    })
});
//Los puntajes de todos los cuestionarios hechos por tipo de pregunta.
console.log({
    opt1Puntos,
    opt2Puntos,
    opt3Puntos,
    opt4Puntos,
    opt5Puntos,
    opt6Puntos
});

//Funcion para dividir los puntajes de los cuestionarios contestados
function separarPuntajeTotal(array){
    let optDividido = [];
    let arrayPuntosTotales = [];
    let arrayPuntosObtenidos = [];
    array.forEach(element => {
        let valorPuntos = element.split('/');
        arrayPuntosTotales.push(parseFloat(valorPuntos[0]));
        arrayPuntosObtenidos.push(parseFloat(valorPuntos[1]));    
    })
    optDividido.push(arrayPuntosTotales, arrayPuntosObtenidos);
    return optDividido;
}

//Debemos separar los puntajes correctos de los incorrectos
let opt1Dividido = separarPuntajeTotal(opt1Puntos);
let opt2Dividido = separarPuntajeTotal(opt2Puntos);
let opt3Dividido = separarPuntajeTotal(opt3Puntos);
let opt4Dividido = separarPuntajeTotal(opt4Puntos);
let opt5Dividido = separarPuntajeTotal(opt5Puntos);
let opt6Dividido = separarPuntajeTotal(opt6Puntos);

console.log({
    opt1Dividido,
    opt2Dividido,
    opt3Dividido,
    opt4Dividido,
    opt5Dividido,
    opt6Dividido
});

//Hacemos una funcion que nos obtenga el total de los puntajes totales y el porcentage obtenido
function calculoPuntajeTipoPregunta(array){
    let sumaTotal = array[0].reduce((sum, value) => sum + value);
    let sumaObtenido = array[1].reduce((sum, value) => sum + value);
    let porcetajeObtenido = parseFloat(((sumaObtenido*100)/sumaTotal).toFixed(2));
    let porcentajeRestante = parseFloat((100- porcetajeObtenido).toFixed(2));
    let arrayValuesImportantes = [porcentajeRestante, porcetajeObtenido, sumaTotal, sumaObtenido];
    return arrayValuesImportantes;
}

//Almacenamos los valores de los tipos de pregunta [Porcentaje error, Obtenido, puntos totales, puntos obtenidos];
let opt1Final = calculoPuntajeTipoPregunta(opt1Dividido);
let opt2Final = calculoPuntajeTipoPregunta(opt2Dividido);
let opt3Final = calculoPuntajeTipoPregunta(opt3Dividido);
let opt4Final = calculoPuntajeTipoPregunta(opt4Dividido);
let opt5Final = calculoPuntajeTipoPregunta(opt5Dividido);
let opt6Final = calculoPuntajeTipoPregunta(opt6Dividido);

console.log({
    opt1Final,
    opt2Final,
    opt3Final,
    opt4Final,
    opt5Final,
    opt6Final
});

let optTotalTipoPregunta = [opt1Final,opt2Final,opt3Final,opt4Final,opt5Final,opt6Final];

//Debemos hacer el calculo de los Puntajes por tipo de pregunta a nivel global
let puntosTotalesFor = 0, puntosObtenidosFor = 0;
optTotalTipoPregunta.forEach(pregunta => {
    pregunta.forEach((puntos, i = 0) => {
        if(i == 2){
            puntosTotalesFor += parseFloat((puntos).toFixed(2));
        }else if (i == 3){
            puntosObtenidosFor += parseFloat((puntos).toFixed(2));
        }
        i++
    });
})

//Calculamos el puntaje del total
let promedioTotalObtenidoTipoPregunta = parseFloat(((puntosObtenidosFor*100)/puntosTotalesFor).toFixed(2));
let promedioTotalFaltanteTipoPregunta = parseFloat((100 - promedioTotalObtenidoTipoPregunta).toFixed(2));
//Aqui metemos los puntos de todos los cuestionarios hechos
let puntosTotalesTipoPreguntaArray = [promedioTotalObtenidoTipoPregunta,promedioTotalFaltanteTipoPregunta,puntosTotalesFor, puntosObtenidosFor];

//Almacenamos todos los puntajes finales de cada tipo de pregunta en el array.
optTotalTipoPregunta.unshift(puntosTotalesTipoPreguntaArray); //🔴 Este es importante para imprimir en gráfico
console.log('optTotalTipoPregunta', optTotalTipoPregunta)

//Hacemos arrays multidimensionales por cuestionarios hechos de los estudiantes aprobados y reprobados
let estadoAprobacionCopia2 = [...estadoAprobacionCopia1];
let estadoAprobacionMultidimensional2 = [];
for (var y = 0; y < contadorFrecuenciaRespuestasArray.length; y++) {
    //Para los tiempos promedios de los cuestionarios
    let arrayTemporal3 = [];
    arrayTemporal3.push(estadoAprobacionCopia2.splice(0, contadorFrecuenciaRespuestasArray[y]));
    estadoAprobacionMultidimensional2.push(arrayTemporal3);
}
console.log('Estado de aprobacion multidimensional (por cuestionario) = ', estadoAprobacionMultidimensional2);


//Debemos contar los elementos que son reprobados/aprobados
let aprobacionCuestionarioMultidimensionalCuenta = [];
let aprobacionCuestionarios = [];
let reprobacionCuestionarios = [];
estadoAprobacionMultidimensional2.forEach(element => {
    let contadorAprobados = 0;
    let contadorReprobados = 0;
    let arrayTemporal = [];
    element[0].forEach(e => {
        if (e == 'aprobado') {
            contadorAprobados++;
        } else if (e == 'reprobado') {
            contadorReprobados++;
        }
    });

    aprobacionCuestionarios.push(contadorAprobados);
    reprobacionCuestionarios.push(contadorReprobados);
});
aprobacionCuestionarioMultidimensionalCuenta.push(aprobacionCuestionarios, reprobacionCuestionarios);

//Es un array con el conteo final de los aprobados y reprobados.
console.log('Contador de aprobacion por cuestionario =', aprobacionCuestionarioMultidimensionalCuenta);

///////////////////////ANALISIS DEL PUNTAJE POR TIPO DE PREGUNTA
let nombreTipoPregunta = ["Global","Opt1","Opt2","Opt3","Opt4","Opt5","Opt6"];


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