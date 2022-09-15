const fondoBienvenida = document.querySelector('#fondoBienvenida');
const fondoActual = localStorage.getItem('fondoElegidoPorUsuario');

function aplicarFondoSidenav(){
    //Esta validación es para que en caso de que exista el
    //fondo guardado en localStorage lo recuerde
    //sino, lo que hace es poner el fondo por defecto.
    if (localStorage.getItem('fondoElegidoPorUsuario') != undefined) {
        fondoBienvenida.style.backgroundImage = "url('" + fondoActual + "')";
    }
}

aplicarFondoSidenav();
