
function selectorFondoPerfilUsuario() {
    //El contenedor POP UP en donde guardamos los temas (cajitas de temas)
    const boxContainerPopUp = document.getElementById('popUpThemes');

    //El fondo con la imagen del perfil
    const fondoDinamicoUsuario = document.getElementById('fondoDinamicoUsuario');

    // Direcciones de la fotos
    direccionesPhotos = ['../static/images/fondos/aqua/aqua_1.png', '../static/images/fondos/aqua/aqua_2.png', '../static/images/fondos/aqua/aqua_3.png', '../static/images/fondos/aqua/aqua_4.png', '../static/images/fondos/aqua/aqua_5.png', '../static/images/fondos/aqua/aqua_6.png', '../static/images/fondos/aqua/aqua_7.png', '../static/images/fondos/aqua/aqua_8.png'
        , '../static/images/fondos/azul/azul_1.png', '../static/images/fondos/azul/azul_2.png', '../static/images/fondos/azul/azul_3.png', '../static/images/fondos/azul/azul_4.png', '../static/images/fondos/azul/azul_5.png', '../static/images/fondos/azul/azul_6.png', '../static/images/fondos/azul/azul_7.png', '../static/images/fondos/azul/azul_8.png', '../static/images/fondos/azul/azul_9.png', '../static/images/fondos/azul/azul_10.png', '../static/images/fondos/azul/azul_11.png', '../static/images/fondos/azul/azul_12.png', '../static/images/fondos/azul/azul_13.png', '../static/images/fondos/azul/azul_14.png', '../static/images/fondos/azul/azul_15.png', '../static/images/fondos/azul/azul_16.png'
        , '../static/images/fondos/black/black_1.png', '../static/images/fondos/black/black_2.png', '../static/images/fondos/black/black_3.png', '../static/images/fondos/black/black_4.png', '../static/images/fondos/black/black_5.png', '../static/images/fondos/black/black_6.png', '../static/images/fondos/black/black_7.png', '../static/images/fondos/black/black_8.png', '../static/images/fondos/black/black_9.png', '../static/images/fondos/black/black_10.png', '../static/images/fondos/black/black_11.png', '../static/images/fondos/black/black_12.png', '../static/images/fondos/black/black_13.png', '../static/images/fondos/black/black_14.png'
        , '../static/images/fondos/cafe/cafe_1.png', '../static/images/fondos/cafe/cafe_2.png', '../static/images/fondos/cafe/cafe_3.png', '../static/images/fondos/cafe/cafe_4.png', '../static/images/fondos/cafe/cafe_5.png', '../static/images/fondos/cafe/cafe_6.png', '../static/images/fondos/cafe/cafe_7.png', '../static/images/fondos/cafe/cafe_8.png', '../static/images/fondos/cafe/cafe_9.png', '../static/images/fondos/cafe/cafe_10.png', '../static/images/fondos/cafe/cafe_11.png'
        , '../static/images/fondos/gotico/gotico_1.png', '../static/images/fondos/gotico/gotico_2.png', '../static/images/fondos/gotico/gotico_3.png', '../static/images/fondos/gotico/gotico_4.png', '../static/images/fondos/gotico/gotico_5.png', '../static/images/fondos/gotico/gotico_6.png', '../static/images/fondos/gotico/gotico_7.png', '../static/images/fondos/gotico/gotico_8.png', '../static/images/fondos/gotico/gotico_9.png'
        , '../static/images/fondos/morado/morado_1.png', '../static/images/fondos/morado/morado_2.png', '../static/images/fondos/morado/morado_3.png', '../static/images/fondos/morado/morado_4.png', '../static/images/fondos/morado/morado_5.png', '../static/images/fondos/morado/morado_6.png', '../static/images/fondos/morado/morado_7.png', '../static/images/fondos/morado/morado_8.png', '../static/images/fondos/morado/morado_9.png', '../static/images/fondos/morado/morado_10.png'
        , '../static/images/fondos/naranja/naranja_1.png', '../static/images/fondos/naranja/naranja_2.png', '../static/images/fondos/naranja/naranja_3.png', '../static/images/fondos/naranja/naranja_4.png', '../static/images/fondos/naranja/naranja_5.png', '../static/images/fondos/naranja/naranja_6.png', '../static/images/fondos/naranja/naranja_7.png'
        , '../static/images/fondos/rojo/rojo_1.png', '../static/images/fondos/rojo/rojo_2.png', '../static/images/fondos/rojo/rojo_3.png', '../static/images/fondos/rojo/rojo_4.png', '../static/images/fondos/rojo/rojo_5.png', '../static/images/fondos/rojo/rojo_6.png', '../static/images/fondos/rojo/rojo_7.png'
        , '../static/images/fondos/rosa/rosa_1.png', '../static/images/fondos/rosa/rosa_2.png', '../static/images/fondos/rosa/rosa_3.png', '../static/images/fondos/rosa/rosa_4.png', '../static/images/fondos/rosa/rosa_5.png', '../static/images/fondos/rosa/rosa_6.png', '../static/images/fondos/rosa/rosa_7.png', '../static/images/fondos/rosa/rosa_8.png', '../static/images/fondos/rosa/rosa_9.png'
        , '../static/images/fondos/verde/verde_1.png', '../static/images/fondos/verde/verde_2.png', '../static/images/fondos/verde/verde_3.png', '../static/images/fondos/verde/verde_4.png', '../static/images/fondos/verde/verde_5.png', '../static/images/fondos/verde/verde_6.png', '../static/images/fondos/verde/verde_7.png', '../static/images/fondos/verde/verde_8.png', '../static/images/fondos/verde/verde_9.png'
    ];

    //Funcion para meter cajitas para seleccionar temas
    //La longitud de la cajas depende solamente de la cantidad de direcciones almacenadas
    function insertarCajasParaTemas() {
        for (j = 1; j <= direccionesPhotos.length; j++) {
            boxContainerPopUp.innerHTML +=
                "<div class='col s6 m4 l3 xl2'><div class='foto_fondo_picker bordered1 shadow-2' id='foto_" + j + "'></div></div>";

            //Para que en el selector de temas todas las cajas tengan imagen
            elementoCardAsignacionIdBackground = document.querySelector('#foto_' + j);
            elementoCardAsignacionIdBackground.style.backgroundImage = "url('" + direccionesPhotos[j - 1] + "')";
        };

    };

    insertarCajasParaTemas();

    //Selector del tema de fondo.
    /*
    * Se hace la selecciones de los temas para el background del cliente.
    */

    //Seleccionamos la cajas insertadas
    cardTheme = document.getElementsByClassName("foto_fondo_picker");

    for (var i = 0; i < cardTheme.length; i++) {
        let banderitaThema = i;
        cardTheme[i].onclick = function () {
            fondoDinamicoUsuario.classList.remove("fondoDinamico");
            //Guardamos el valor del "Fondo" elegido en local storage
            localStorage.setItem('fondoElegidoPorUsuario', direccionesPhotos[banderitaThema]);
            fondoDinamicoUsuario.style.backgroundImage = "url('" + localStorage.getItem('fondoElegidoPorUsuario') + "')";
        };
    };

    //Esta validación es para que en caso de que exista el
    //fondo guardado en localStorage lo recuerde
    //sino, lo que hace es poner el fondo por defecto.
    if (localStorage.getItem('fondoElegidoPorUsuario') != undefined) {
        fondoDinamicoUsuario.style.backgroundImage = "url('" + localStorage.getItem('fondoElegidoPorUsuario') + "')";
    }
}

// Datos del cliente
const datos_perfil_containerSelector = document.querySelector('#datos_perfil_containerSelector');
const datos_perfil_containerNombrePerfil = document.querySelector('#datos_perfil_containerNombrePerfil');
const datos_perfil_containerAliasPerfil = document.querySelector('#datos_perfil_containerAliasPerfil');
const datos_perfil_containerDescPerfil = document.querySelector('#datos_perfil_containerDescPerfil');

const containerScrolled = document.querySelector('#containerScrolled');

//Scroll del menú
$(window).scroll(function(){
    if ($(window).scrollTop() > (100)) {
        containerScrolled.classList.remove('containerScrolledHide');
    }else{
        containerScrolled.classList.add('containerScrolledHide');
    }
});



selectorFondoPerfilUsuario();