//Sirve para mover el icono de las notificaciones
function moverIconoNotificacion() {
    const buttonNotificationOurs = document.getElementById('buttonNotificationOurs');
    const iconNotificationOurs = document.getElementById('iconNotificationOurs');

    buttonNotificationOurs.addEventListener('click', sacudir);

    function sacudir() {
        iconNotificationOurs.classList.add('animate__swing');
        setTimeout(() => {
            iconNotificationOurs.classList.remove('animate__swing');
        }, 1050);
    }
}

/////////////////////////////////////////////////
let valorNotificaciones = document.getElementById('notificacionesValue').value;
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
let datosLimpios = limpiarDatos(valorNotificaciones);

////////////////////////////////////////////////////
function insertarNotificaciones(notificacionesArray) {
    let contenidoNotificaciones = document.getElementById('contenidoNotificaciones');
    let arrayDeNotificaciones = [];
    //Metemos las notificaciones
    notificacionesArray.forEach((element, i = 0) => {
        if (i <= 4) {
            arrayDeNotificaciones.push(
                `<div class="notificacionContador paddingerStyleNotificacion colorGreyDarker shadow-1e bordered1">
                <h6 class="colorTextReverse textNotificationStyle">${element[2]}</h6>
                </div>`
            )
            i++;
        }
    });
    //Insertamos los elementos
    contenidoNotificaciones.innerHTML = [...arrayDeNotificaciones].join('');
}
insertarNotificaciones(datosLimpios);

//Sirve para registrar las notificaciones contenidas en la caja de notificaciones
function notificacionesExiten() {
    //Contamos lo elementos
    let notificacionContador = document.getElementsByClassName('notificacionContador');
    let notificacionContadorCuenta = notificacionContador.length;

    //Mensaje de notificacion
    let msgNoNoti = document.getElementById('notNoti');
    let msgYesNoti = document.getElementById('yesNoti');

    //Accedemos a nuestro favicon
    var favicon = document.querySelector("link[rel~='icon']")

    //Notificacion de contador
    const contadorNotificacion = document.getElementById('contadorNotificacion')
    if (notificacionContadorCuenta != 0) {
        //Solo se cambia el color del indicador de notificaciones y se cuentan los elementos
        contadorNotificacion.classList.remove('color1');
        contadorNotificacion.innerText = notificacionContadorCuenta;
        contadorNotificacion.setAttribute('style', 'background-color: red;');

        //Aparecemos el mensaje de ir a ver todas las notificaciones
        msgYesNoti.classList.remove('hiddenElement');
        //Quitamos el mensaje de no hay notificaciones
        msgNoNoti.classList.add('hiddenElement');

        //Modificamos la ruta del favicon
        favicon.href = '../../static/images/favicon/ico_noti.ico';
    }

    return notificacionContadorCuenta;
}

moverIconoNotificacion();
const numeroNotificaciones = notificacionesExiten();

//Debemos validar si existen notificaciones
function validarNotificaciones(numeroNotis) {
    return numeroNotis == 0 ? false : true;
}

console.log(validarNotificaciones(numeroNotificaciones));
