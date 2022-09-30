function verFoto(){
    //Guardamos las opciones de la imagen
    const cardConfiguracionesMain = document.getElementsByClassName('cardConfiguracionesMain');

    //Guardamos la foto
    const fotoPerfil = document.getElementsByClassName('fotoPerfil');

    //Contenedor de opciones de la foto (enlace)
    const opcionesFoto = document.getElementById('opcionesFoto');

    //Guardamos el modal
    const modalFoto = document.getElementById('modalFoto');

    //Evento de click
    cardConfiguracionesMain[0].addEventListener('click', agregarMaterialBox);

    //Agrega las propiedades para que la foto se vea grande
    function agregarMaterialBox(){
        //Agrego materialboxed a la foto
        fotoPerfil[0].classList.add('materialboxed');

        //Oculto el link
        opcionesFoto.classList.add('fondoLink');

        //Cierro el menu de opciones
        $('#modalFoto').modal('close');

        //Hago click sobre la foto
        fotoPerfil[0].click();
    }
}

verFoto()