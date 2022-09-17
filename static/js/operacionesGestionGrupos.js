function contarGruposAlumnos(){
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

function alternarVistas(){
    const buttonVistasAlternateGroup = document.getElementById('buttonVistasAlternateGroup');
    const iconVistasAlternateGroup = document.getElementById('iconVistasAlternateGroup');

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

    function cambiarIcono(){
        if(iconVistasAlternateGroup.innerText == 'grid_view'){
            iconVistasAlternateGroup.innerText = 'view_list';
        }else{
            iconVistasAlternateGroup.innerText = 'grid_view';
        }
    }

    function cambiarClaseLista(){
        contenedorCardsGruposOperation.classList.toggle('contenedorCardsGruposOperationList');
        for(var i = 0; i < sectionCardOperationDescriptionListId.length; i++){
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

contarGruposAlumnos();
alternarVistas();
  
