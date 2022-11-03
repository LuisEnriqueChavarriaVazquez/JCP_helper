/* <input type="hidden" value="{{datosGrupo}}" id="datosDeLosGrupos">
<input type="hidden" value="{{datosGlobalesAlumnos}}" id="datosGlobalesAlumnosDentroGrupo">
<input type="hidden" value="{{datosCuestionariosProfe}}" id="datosCuestionariosGeneralesCuestionarios">
<input type="hidden" value="{{datosCuestionariosTerminados}}" id="cuestionariosTerminados"></input> */

////////////////////////////////////////////////////////
//Accedemos a la data como string
let datosCuestionariosTerminados = document.getElementById('cuestionariosTerminados').value;
datosCuestionariosTerminados = limpiarDatos(datosCuestionariosTerminados);
//console.log('Cuestionarios terminados = ', datosCuestionariosTerminados);

////////////////////////////////////////////////////////
//Accedemos a los Promedios de los cuestionarios
let promediosCuestionariosHechos = datosCuestionariosTerminados.map((element) => {
    return element[6];
});
//console.log('Promedios de los cuestionarios hechos = ', promediosCuestionariosHechos)

////////////////////////////////////////////////////////
//Accedemos a los IDS de los cuestionarios
let idsCuestionariosHechos = datosCuestionariosTerminados.map((element) => {
    return element[1];
});
//console.log('Ids de los cuestionarios hechos = ', idsCuestionariosHechos)

////////////////////////////////////////////////////////
//Accedemos a los nombres de los grupos del docente
let datosCuestionariosProfe = document.getElementById('datosCuestionariosGeneralesCuestionarios').value;
datosCuestionariosProfe = limpiarDatos(datosCuestionariosProfe);
//console.log('Datos de los cuestionarios = ',datosCuestionariosProfe);

////////////////////////////////////////////////////////
//Extraemos los IDs de los grupos
let idGrupos = [];
idsCuestionariosHechos.map((idGrupo) => {
    datosCuestionariosProfe.forEach(grupoId => {
        if(idGrupo == grupoId[0]){      
            idGrupos.push(grupoId[1]);
        }
    });
});
//console.log('idGrupos', idGrupos)


////////////////////////////////////////////////////////
//Accedemos a los nombres de los grupos del docente
let datosGrupo = document.getElementById('datosDeLosGrupos').value;
datosGrupo = limpiarDatos(datosGrupo);
//console.log('Datos de los grupos = ', datosGrupo);

////////////////////////////////////////////////////////
//Lo definimos como set para eliminar los repetidos
let gruposNames = new Set ();
let gruposIDSet = new Set ();
datosGrupo.filter((grupo) =>{
    idGrupos.forEach(id => {
        if(id == grupo[0]){
            gruposNames.add(grupo[2]);
            gruposIDSet.add(id);
        }
    });
});
let gruposNameArray = Array.from(gruposNames);
let gruposIdsArray = Array.from(gruposIDSet);
//console.log('gruposNameArray', gruposNameArray);
//console.log('gruposIDSet', gruposIdsArray)

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
//console.log('sumaPromedioGrupos', sumaPromedioGrupos);

//Contamos la cantidad de elemento pertenecientes a un grupo
let contadorPosicionesIds = [];
for(var i = 0; i < gruposIdsArray.length; i++){
    contadorPosicionesIds.push(idGrupos.filter(x => x === gruposIdsArray[i]).length);
}
//console.log('contadorPosicionesIds', contadorPosicionesIds)

//Debemos sumar los puntajes de cada grupo
let puntajePorGrupo;
let puntajePorGrupoArray = [];
for(var j = 0; j < contadorPosicionesIds.length; j++){
    puntajePorGrupo = 0;
    for(var r = 0; r < contadorPosicionesIds[j]; r++){
        puntajePorGrupo += parseFloat(promediosCuestionariosHechos[r])
    }
    r = 0;
    puntajePorGrupoArray.push(puntajePorGrupo);
    for(var h = 0; h < contadorPosicionesIds[j]; h++){
        promediosCuestionariosHechos.shift();
    }
}
//console.log('Puntaje por grupo', puntajePorGrupoArray);

//Debemos dividir los puntajes entre el total de elementos por grupo
contador = 0;
let promedioFinalPorGrupo = puntajePorGrupoArray.map(sumatoria => {
    return sumatoria / contadorPosicionesIds[contador++];
});
//console.log('Promedio por cada grupo', promedioFinalPorGrupo);



let promediosPorGrupo = {}; //Objeto
idGrupos.forEach(id => {
    promediosPorGrupo[id] = "2332";
})

//console.log('promediosPorGrupo', promediosPorGrupo)


////////////////////////////////////////////////////////
//Impresión de las gráficas.
var trace1 = {
    type: 'bar', //Definimos el tipo de gráfico
    x: gruposNameArray, //Nombre de los grupos
    y: promedioFinalPorGrupo, //Pasamos la data para y
    marker: { //Definimos los estilos
        color: ['#628E90', '#256D85', '#7895B2', '#5F6F94', '#2B4865'],
        line: {
            width: 2.5
        }
    }
};

var data = [trace1];

var layout = { //Titulo de la gráfica
    title: 'Data',
    font: { size: 10 }
};

var config = { responsive: true } //Ajuste responsivo
//Aqui se hace el render de la gráfica. (el primer parametro es el ID de un contenedor)
Plotly.newPlot('graph1', data, layout, config);
Plotly.newPlot('graph2', data, layout, config);

//Imprime la gráfica de barras
function grafica_barras() {
    var trace1 = {
        type: 'bar',
        x: [1, 2, 3, 4],
        y: [5, 10, 2, 8],
        marker: {
            color: ['#628E90', '#256D85', '#7895B2', '#5F6F94', '#2B4865'],
            line: {
                width: 2.5
            }
        }
    };
    
    var data = [trace1];
    
    var config = { responsive: true }
    
    Plotly.newPlot('graph1', data, layout, config);
}

//Imprime la gráfica pastel
function grafica_pastel() {
    
    var data2 = [{
        values: [19, 26, 55],
        labels: ['Residential', 'Non-Residential', 'Utility'],
        type: 'pie',
        marker: {
            colors: ['#628E90', '#256D85', '#7895B2', '#5F6F94', '#2B4865']
        }
    }];

    var config = { responsive: true }
    
    Plotly.newPlot('graph1', data2, layout, config);
}

//Imprime la gráfica lineal
function grafica_lineal() {
    var trace1 = {
        x: [1, 2, 3, 4],
        y: [10, 15, 13, 17],
        type: 'scatter'
    };
    
    var trace2 = {
        x: [1, 2, 3, 4],
        y: [16, 5, 11, 9],
        type: 'scatter'
    };
    
    var data = [trace1, trace2];
    
    var config = { responsive: true }
    
    Plotly.newPlot('graph1', data, layout, config);
}

//Funcion para limpiar los datos
function limpiarDatos(string){
    //Como en python eran tuplas, necesitamos convertir todo en array
    string = string.replaceAll('(', '[');
    string = string.replaceAll(')', ']');
    string = string.replaceAll("\'","\"");
    string = string.replaceAll("None", "0");
    //Son los datos de los cuestionarios evaluados. (en estado ready)
    string = JSON.parse(string);
    return string
}