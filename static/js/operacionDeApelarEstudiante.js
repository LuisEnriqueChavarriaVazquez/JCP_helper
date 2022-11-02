function logicaDePedirApelacion(){
    //Botones de la página de inicio
    let aceptarResultado = document.getElementById('aceptarResultado');
    let apelarResultado = document.getElementById('apelarResultado');

    //Valor del input para las apelacion
    let pedirApelacion = document.getElementById('pedirApelacion');

    //Click para el boton de aceptar el resultado
    aceptarResultado.addEventListener('click', function(){
        pedirApelacion.value = 'aceptar';
    });

    //Click para el boton de apelar el resultado
    apelarResultado.addEventListener('click', function(){
        pedirApelacion.value = 'apelar';
    });
}
logicaDePedirApelacion();