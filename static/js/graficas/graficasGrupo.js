/* <input type="hidden" value="{{datosGrupo}}" id="datosDeLosGrupos">
<input type="hidden" value="{{datosGlobalesAlumnos}}" id="datosGlobalesAlumnosDentroGrupo">
<input type="hidden" value="{{datosCuestionariosProfe}}" id="datosCuestionariosGeneralesCuestionarios">
<input type="hidden" value="{{datosCuestionariosTerminados}}" id="cuestionariosTerminados"></input> */

//Accedemos a la data como string
let datosCuestionariosTerminados = document.getElementById('cuestionariosTerminados').value;
//Como en python eran tuplas, necesitamos convertir todo en array
datosCuestionariosTerminados = datosCuestionariosTerminados.replaceAll('(', '[');
datosCuestionariosTerminados = datosCuestionariosTerminados.replaceAll(')', ']');
datosCuestionariosTerminados = datosCuestionariosTerminados.replaceAll("\'","\"");
datosCuestionariosTerminados = datosCuestionariosTerminados.replaceAll("None", "0");
//Son los datos de los cuestionarios evaluados. (en estado ready)
datosCuestionariosTerminados = JSON.parse(datosCuestionariosTerminados);
console.log('datosCuestionariosTerminados', datosCuestionariosTerminados); 

//Accedemos a los IDS de los cuestionarios
let idsGrupos = datosCuestionariosTerminados.map((element) => {
    return element[1];
});

//Accedemos a los nombres de los grupos a los que pertenecen los cuestionarios
let datosGeneralesCuestionarios = document.getElementById('datosCuestionariosGeneralesCuestionarios').value;
//Como en python eran tuplas, necesitamos convertir todo en array
datosGeneralesCuestionarios = datosGeneralesCuestionarios.replaceAll('(', '[');
datosGeneralesCuestionarios = datosGeneralesCuestionarios.replaceAll(')', ']');
datosGeneralesCuestionarios = datosGeneralesCuestionarios.replaceAll("\'","\"");
datosGeneralesCuestionarios = datosGeneralesCuestionarios.replaceAll("None", "0");
//Son los datos de los cuestionarios evaluados. (en estado ready)
datosGeneralesCuestionarios = JSON.parse(datosGeneralesCuestionarios);
console.log(datosGeneralesCuestionarios);
let nombreGrupos



//Definición de la gráfica por default
var comillas_simples = new RegExp("\'", "g"); //Surve para el formato de la gráfica

let xgrupos = $('#xgrupos').val() //Accedemos al valor del input
xgrupos = xgrupos.replace(comillas_simples, "\"") //Damos formato al texto
xgrupos = JSON.parse(xgrupos) //Convertimos a formato de objeto
console.log('xgrupos', xgrupos)

let ygrupos = $('#ygrupos').val()
ygrupos = ygrupos.replace(comillas_simples, "\"")
ygrupos = JSON.parse(ygrupos)
console.log('ygrupos', ygrupos)

var trace1 = {
    type: 'bar', //Definimos el tipo de gráfico
    x: xgrupos, //Pasamos la data para X
    y: ygrupos, //Pasamos la data para y
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