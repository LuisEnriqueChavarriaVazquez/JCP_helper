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
function contarNotificaciones() {
    //Contamos lo elementos
    let notificacionContador = document.getElementsByClassName('notificacionContador');
    let notificacionContadorCuenta = notificacionContador.length;

    //Notificacion de contador
    const contadorNotificacion = document.getElementById('contadorNotificacion');

    //Se pone aqui para cuando cargue la pagina
    contadorNotificacion.innerText = notificacionContadorCuenta;
}

//El orden de los titulos debe coincidir con el orden en que estan en pantalla en la caja de notificaciones
let notificacionesTitles = ['politicasN', 'ayudaN', 'crearGrupoN', 'configuracionesN'];
let notificacionesButtonTitles = ['politicasNButton', 'ayudaNButton', 'crearGrupoNButton', 'configuracionesNButton'];

function validarNotificacionesEstado() {
    let notificacionContador = document.getElementsByClassName('notificacionContador');

    for(var i = 0; i < notificacionContador.length; i++){
        //En caso de que las variables esten en local storage no se muestra notificacion
        if (localStorage.getItem(notificacionesTitles[i]) !== null) {
            notificacionContador[i].remove();
        }else{
            console.log("El elemento se muestra, no esta en localstorage")
        }
    }

    //Volvemos a contar los elementos
    contarNotificaciones();
}

function guardarEnLocalStorageEdoDeNotificacion(){
    
    //Guardamos todos los botones de las notificaciones
    let politicasNButton = document.getElementsByClassName('politicasNButton');
    let ayudaNButton = document.getElementsByClassName('ayudaNButton');
    let crearGrupoNButton = document.getElementsByClassName('crearGrupoNButton');
    let configuracionesNButton = document.getElementsByClassName('configuracionesNButton');

    /*
    *   parte de notificaciones pendiente... Corregir esta funcion
    */

    //Hacemos que el click se aplique a ambos botones
    for(var t = 0; t < 2; t++){
        politicasNButton[t].addEventListener('click', function(){
            localStorage.setItem(notificacionesTitles[0], "ocultar");
        });

        ayudaNButton[t].addEventListener('click', function(){
            localStorage.setItem(notificacionesTitles[1], "ocultar");
        });

        crearGrupoNButton[t].addEventListener('click', function(){
            localStorage.setItem(notificacionesTitles[2], "ocultar");
        });

        configuracionesNButton[t].addEventListener('click', function(){
            localStorage.setItem(notificacionesTitles[3], "ocultar");
        });
    }

    validarNotificacionesEstado();
}

moverIconoNotificacion();
contarNotificaciones();
validarNotificacionesEstado();
guardarEnLocalStorageEdoDeNotificacion();