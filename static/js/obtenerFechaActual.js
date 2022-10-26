function obtenerFechaActual(){
    //Obtenemos el input para insertar la fecha
    const inputValue = document.getElementById('fechaLimiteRespuesta');

    //Obtenemos la fecha
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();

    //Damos formato a la fecha
    let fecha = `${month}/${day}/${year}`;

    //Insertamos la fecha en el value
    function insertarFechaActual(fechaDato){
        inputValue.value = fechaDato;
    }
    insertarFechaActual(fecha);
}

obtenerFechaActual();