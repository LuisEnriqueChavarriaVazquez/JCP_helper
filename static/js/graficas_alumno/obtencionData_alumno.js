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