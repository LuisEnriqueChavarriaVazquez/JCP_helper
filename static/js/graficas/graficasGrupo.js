//Definición de la gráfica por default
var comillas_simples = new RegExp("\'", "g");
console.log('comillas_simples', comillas_simples)

let xgrupos = $('#xgrupos').val()
xgrupos = xgrupos.replace(comillas_simples, "\"")
xgrupos = JSON.parse(xgrupos)

let ygrupos = $('#ygrupos').val()
ygrupos = ygrupos.replace(comillas_simples, "\"")
ygrupos = JSON.parse(ygrupos)

var trace1 = {
    type: 'bar',
    x: xgrupos,
    y: ygrupos,
    marker: {
        color: ['#628E90', '#256D85', '#7895B2', '#5F6F94', '#2B4865'],
        line: {
            width: 2.5
        }
    }
};

var data = [trace1];

var layout = {
    title: 'Responsive graphs examples',
    font: { size: 10 }
};
var config = { responsive: true }
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

    var layout = {
        title: 'Responsive graphs examples',
        font: { size: 10 }
    };

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

    var layout = {
        title: 'Responsive graphs examples',
        font: { size: 10 }
    };

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

    var layout = {
        title: 'Responsive graphs examples',
        font: { size: 10 }
    };

    var data = [trace1, trace2];

    var config = { responsive: true }

    Plotly.newPlot('graph1', data, layout, config);
}