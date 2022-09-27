function fondoGrupoVerificar() {

    //Seleccionamos el picker para elegir un fondo por defecto
    const titleGeneral = document.getElementsByClassName('title-general');

    //Evalua si las cards tienen fondo por dafault
    function evaluarSiFondoDefault(){
        let estiloDeFondo;
        for(var y = 0; y < titleGeneral.length; y++){
            estiloDeFondo = titleGeneral[y].getAttribute('style');
            if(estiloDeFondo.indexOf("default") != -1){
                titleGeneral[y].removeAttribute('style');
                titleGeneral[y].classList.add('fondoDinamico');
            }
        }
    }
    evaluarSiFondoDefault();
}

function contarNumeroDeCuestionariosAlumnos(){
    const cuestionarios = document.getElementsByClassName('cardCuestionarioGrupoVer');
    const alumnos = document.getElementsByClassName('cardAlumnoSecondary');

    const cuestionariosContador = document.getElementById('cuestionariosContador');
    const alumnosContador = document.getElementById('alumnosContador');

    alumnosContador.innerText = alumnos.length;
    cuestionariosContador.innerText = cuestionarios.length;
}

fondoGrupoVerificar();
contarNumeroDeCuestionariosAlumnos();


