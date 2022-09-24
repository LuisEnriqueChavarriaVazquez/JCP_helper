/*
    Funcion para contar los elementos del gestor de grupos
*/
function contarGruposAlumnos() {
    //Contamos los elementos en pantalla
    const cardOperationGroup = document.getElementsByClassName('cardOperationGroup');
    const contadorAlumnosNumber = document.getElementsByClassName('contadorAlumnosNumber');

    let numeroGrupos;
    let numeroEstudiantes = 0;

    //Parrafos para mostrar el conteo
    let contadorGruposElement = document.querySelector('#contadorGruposId');
    let contadorEstudiantesElement = document.querySelector('#contadorEstudiantesId');

    //Cuenta los estudiantes
    for (var i = 0; i < contadorAlumnosNumber.length; i++) {
        numeroEstudiantes += Number(contadorAlumnosNumber[i].innerText);
    }

    //Cuenta los grupos
    numeroGrupos = cardOperationGroup.length;

    //Insertamos los elementos
    contadorGruposElement.insertAdjacentText('beforeend', numeroGrupos);
    contadorEstudiantesElement.insertAdjacentText('beforeend', numeroEstudiantes);
}


/*
    Funcion para alternar las vista de los elementos (grupos)
*/
function alternarVistas() {
    const buttonVistasAlternateGroup = document.getElementById('buttonVistasAlternateGroup');
    const buttonVistasAlternateGroupMobile = document.getElementById('buttonVistasAlternateGroupMobile');
    const iconVistasAlternateGroup = document.getElementById('iconVistasAlternateGroup');
    const iconVistasAlternateGroupMobile = document.getElementById('iconVistasAlternateGroupMobile');

    /*Contenedor principal*/
    const contenedorCardsGruposOperation = document.getElementById('contenedorCardsGruposOperationId');
    //Elementos secundarios
    const cardOperationGroupList = document.getElementsByClassName('cardOperationGroupListId')
    const sectionCardOperationTitle = document.getElementsByClassName('sectionCardOperationTitleId');
    const sectionCardOperationDescriptionListId = document.getElementsByClassName('sectionCardOperationDescriptionListId');
    const sectionCardOperationActions = document.getElementsByClassName('sectionCardOperationActionsId');

    //Llmando al boton para el cambio de vista
    buttonVistasAlternateGroup.addEventListener('click', cambiarIcono);
    buttonVistasAlternateGroup.addEventListener('click', cambiarClaseLista);

    //Llmando al boton para el cambio de vista para el boton de mobbile
    buttonVistasAlternateGroupMobile.addEventListener('click', cambiarIcono);
    buttonVistasAlternateGroupMobile.addEventListener('click', cambiarClaseLista);

    function cambiarIcono() {
        if (iconVistasAlternateGroup.innerText == 'grid_view') {
            iconVistasAlternateGroup.innerText = 'view_list';
            iconVistasAlternateGroupMobile.innerText = 'view_list';
        } else {
            iconVistasAlternateGroup.innerText = 'grid_view';
            iconVistasAlternateGroupMobile.innerText = 'grid_view';
        }
    }

    function cambiarClaseLista() {
        contenedorCardsGruposOperation.classList.toggle('contenedorCardsGruposOperationList');
        for (var i = 0; i < sectionCardOperationDescriptionListId.length; i++) {
            sectionCardOperationDescriptionListId[i].classList.toggle('sectionCardOperationDescriptionList');
            cardOperationGroupList[i].classList.toggle('cardOperationGroupList');
            sectionCardOperationTitle[i].classList.toggle('sectionCardOperationTitleList');
            sectionCardOperationTitle[i].classList.toggle('color2');
            sectionCardOperationTitle[i].classList.toggle('fondoDinamico');
            sectionCardOperationActions[i].classList.toggle('color2');
            sectionCardOperationActions[i].classList.toggle('colorGreyWhiter');
            sectionCardOperationActions[i].classList.toggle('sectionCardOperationActionsList');
        }
    }
}

/*Funcion para buscar los grupos*/
function buscarGrupos() {
    //Se guarda el input de busqueda y el button de busqueda.
    const buscadorGruposGestor = document.getElementById('buscadorGruposGestor');
    const buscadorGruposButton = document.getElementById('buscadorGruposButton');
    //Se guarda el valor del nombre de cada grupo.
    let titleGroupContentId = document.getElementsByClassName('titleGroupContentId');
    //Se guardan los contenedores padres de las cards
    let cardOperationGroupListId = document.getElementsByClassName('cardOperationGroupListId');

    //Nos ayuda a comparar dos arrays
    function compararArrays(arr1, arr2) {
        const finalarray = [];
        arr1.forEach((e1) => arr2.forEach((e2) => {
            if (e1 === e2) {
                finalarray.push(e1);
            }
        }
        ));
        return finalarray;
    }

    //Reiniciamos los elementos que estaban ocultos.
    function reiniciarElementosBuscador() {
        for (var k = 0; k < cardOperationGroupListId.length; k++) {
            cardOperationGroupListId[k].classList.remove('hiddenElement');
        }
    }

    //Funcion de busqueda cuando damos click
    function busquedaGrupos() {
        //Reiniciamos los elementos en pantalla
        reiniciarElementosBuscador();

        //Valor del input del buscador convertidor a minuscula y luego en array
        let buscadorValue = buscadorGruposGestor.value;
        buscadorValue = buscadorValue.toLowerCase();
        let buscadorValueArray = Array.from(buscadorValue);

        //Esta variable será true si encuentra el resultado
        let encontrado = false;

        //Declaramos el array resultado de la busqueda
        let arrayFinalBusqueda = [];

        //Validamos si el valor esta vacio en el input
        if (buscadorValue != '') {

            //Guardamos los grupos actuales (los que estan en pantalla)
            let gruposActuales = [];

            //Guardamos cada grupos en un array (string to array)
            let grupoActualArray = [];

            //Recorremos la lista de grupos actuales
            for (var j = 0; j < titleGroupContentId.length; j++) {
                gruposActuales[j] = titleGroupContentId[j].innerText;

                //Convertimos los valores a minuscula
                gruposActuales[j] = gruposActuales[j].toLowerCase();

                //Convertimos cada grupo en un array
                grupoActualArray = Array.from(gruposActuales[j]);


                //Los comparamos con el valor del input
                arrayFinalBusqueda = compararArrays(buscadorValueArray, grupoActualArray);

                if (arrayFinalBusqueda.length == 0) {
                    //Eliminamos los elementos que no coinciden en la busqueda
                    cardOperationGroupListId[j].classList.add('hiddenElement');
                } else {
                    //Guardamos en la variable que hemos encontrado el elemento.
                    encontrado = true;
                }

                //Verificamos si algún grupo coincide con el valor de input
                /*if(gruposActuales[j] == buscadorValue){
                    console.log("La busqueda coincide con " + gruposActuales[j]);
                    encontrado = true;
                }*/
            }

            //Ultima validación en caso de no haber encontrado nada
            if (encontrado == true) {
                M.toast({ html: 'Busqueda exitosa.' })
            } else {
                M.toast({ html: 'No encontramos elementos que coincidan.' })
            }

        } else {
            reiniciarElementosBuscador();
            M.toast({ html: 'Input de busqueda vacio.' })
        }
    }


    //Hacemos la busqueda con el boton de buscar
    buscadorGruposButton.addEventListener('click', busquedaGrupos);
    buscadorGruposGestor.addEventListener('keypress', function(e){
        if (e.key === 'Enter') {
            busquedaGrupos();
        }
    });
}

function buscadorMobileEstilosSticky(){
    //Guardamos cada uno de los elementos del buscador
    const buscador_contenedor = document.getElementById("container_browser_id_uno");
    const buscador_fondo = document.getElementById("fondo_browser_id_dos");
    const buscador_box_secundario = document.getElementById("container_browser_id_dos");
    const buscador_input = document.getElementById("buscadorInput_tres");
    const icon_browser_mine = document.getElementById("icon_browser_mine");
    const icon_search_voice_mine = document.getElementById("icon_search_voice_mine")

    //Elemento de la caja de titulo
    const cajaTituloBuscadorId = document.getElementById('cajaTituloBuscadorId');
    const cajaTituloBuscadorContenidoId = document.getElementById('cajaTituloBuscadorContenidoId');
    const cajaTituloBuscadorContenidoLargeId = document.getElementById('cajaTituloBuscadorContenidoLargeId');
    
    /*
        Para cuando la app inicie los estilos deben ser precargados
    */

    //Caja principal
    buscador_contenedor.classList.add("container_browser");
    //Caja del fondo del buscador
    buscador_fondo.classList.add("headerComunidad");
    //Caja que contiene al input del buscador
    buscador_box_secundario.classList.add("contenedorBuscador");
    //Input del buscador
    buscador_input.classList.add("buscador_input_tres");
    //Icono del buscador
    icon_browser_mine.classList.add("icon_browser_mine");
    icon_search_voice_mine.classList.add("icon_search_voice_mine");
    
    //Se modifca el buscador cuando se hace scroll down
    $(window).scroll(function () {
    
        if ($(window).scrollTop() > (110)) {
            //Caja principal
            buscador_contenedor.classList.add("contenedorBuscador_sticky");
            buscador_contenedor.classList.remove("container_browser");
            //Caja del fondo del buscador
            buscador_fondo.classList.add("headerComunidad_sticky");
            buscador_fondo.classList.remove("headerComunidad");
            //Caja que contiene al input
            buscador_box_secundario.classList.add("contenedorBuscador_fixed", "color2");
            buscador_box_secundario.classList.remove("contenedorBuscador");
            //Input del buscador
            buscador_input.classList.add("buscador_input_tres_sticky");
            buscador_input.classList.remove("buscador_input_tres");
            //Icono del buscador
            icon_browser_mine.classList.add("icon_browser_mine_sticky");
            icon_browser_mine.classList.remove("icon_browser_mine");
            //Icono de microfono
            icon_search_voice_mine.classList.add("icon_search_voice_mine_sticky");
            icon_search_voice_mine.classList.remove("icon_search_voice_mine");

            //Titulo dinamico de la pagina
            cajaTituloBuscadorId.classList.add('color2');
            cajaTituloBuscadorContenidoId.classList.add('colorText'); 
            cajaTituloBuscadorContenidoLargeId.classList.add('colorText');
            cajaTituloBuscadorId.classList.remove('colorGrey');
        } else {
            //Caja principal
            buscador_contenedor.classList.add("container_browser");
            buscador_contenedor.classList.remove("contenedorBuscador_sticky");
            //Caja del fondo del buscador
            buscador_fondo.classList.add("headerComunidad");
            buscador_fondo.classList.remove("headerComunidad_sticky");
            //Caja que contiene al input del buscador
            buscador_box_secundario.classList.add("contenedorBuscador");
            buscador_box_secundario.classList.remove("contenedorBuscador_fixed", "color2");
            //Input del buscador
            buscador_input.classList.add("buscador_input_tres");
            buscador_input.classList.remove("buscador_input_tres_sticky");
            //Icono del buscador
            icon_browser_mine.classList.add("icon_browser_mine");
            icon_browser_mine.classList.remove("icon_browser_mine_sticky");
            //Icono de microfono
            icon_search_voice_mine.classList.add("icon_search_voice_mine");
            icon_search_voice_mine.classList.remove("icon_search_voice_mine_sticky");

            //Titulo dinamico de la pagina
            cajaTituloBuscadorId.classList.remove('color2');
            cajaTituloBuscadorContenidoId.classList.remove('colorText'); 
            cajaTituloBuscadorContenidoLargeId.classList.remove('colorText');
            cajaTituloBuscadorId.classList.add('colorGrey');
        }
    });
}

//Elemento con class
function aplicarFondoSidenavMobile(){
    //Esta validación es para que en caso de que exista el
    //fondo guardado en localStorage lo recuerde
    //sino, lo que hace es poner el fondo por defecto.
    if (localStorage.getItem('fondoElegidoPorUsuario') != undefined) {
        fondo_browser_id_dos.style.backgroundImage = "url('" + fondoActual + "')";
    }
}

contarGruposAlumnos();
alternarVistas();
buscarGrupos();
buscadorMobileEstilosSticky();
aplicarFondoSidenavMobile();


