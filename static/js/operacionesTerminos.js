function activarButtonFlotante() {
    //Obtenemos acceso al button
    const buttonGoUpTerminos = document.getElementById('buttonGoUpTerminos');

    //Se modifca el buscador cuando se hace scroll down
    $(window).scroll(function () {
        if ($(window).scrollTop() > (110)) {
            buttonGoUpTerminos.classList.add('animate__bounceIn');
            buttonGoUpTerminos.classList.remove('hiddenElement');
        } else {
            buttonGoUpTerminos.classList.remove('animate__bounceIn');
            buttonGoUpTerminos.classList.add('hiddenElement');
        }
    });
}

function irArribaDocumento() {
    //Obtenemos acceso al button
    const buttonGoUpTerminos = document.getElementById('buttonGoUpTerminos');

    //Funcion de dar click

    buttonGoUpTerminos.addEventListener('click', topFunction);

    //Funcion de ir arriba
    function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
}

activarButtonFlotante();
irArribaDocumento();