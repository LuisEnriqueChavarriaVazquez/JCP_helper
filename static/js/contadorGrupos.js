    //Contamos los elementos en pantalla
    const cardOperationGroup = document.getElementsByClassName('cardOperationGroup');
    const contadorAlumnosNumber = document.getElementsByClassName('contadorAlumnosNumber');

    let numeroGrupos;
    let studentsNumber = 0;

    //Parrafos para mostrar el conteo
    let contadorGrupos = document.querySelectorAll('#contadorGrupos');
    let contadorEstudiantes = document.querySelectorAll('#contadorEstudiantes');

    //Cuenta los estudiantes
    for (var i = 0; i < contadorAlumnosNumber.length; i++) {
        studentsNumber += Number(contadorAlumnosNumber[i].innerText);
    }

    //Cuenta los grupos
    numeroGrupos = cardOperationGroup.length;

    //Insertamos los elementos
    contadorEstudiantes.innerHTML = studentsNumber;
    contadorGrupos.innerHTML = numeroGrupos;


