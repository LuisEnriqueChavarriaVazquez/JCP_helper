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
    console.log('favicon', favicon)

    //Notificacion de contador
    const contadorNotificacion = document.getElementById('contadorNotificacion')
    if(notificacionContadorCuenta != 0){
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
function validarNotificaciones(numeroNotis){
    return numeroNotis == 0 ? false : true; 
}

console.log(validarNotificaciones(numeroNotificaciones));
