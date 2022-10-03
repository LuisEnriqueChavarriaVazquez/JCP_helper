//Actualiza el icono de tendencias de las gráficas
function leerTendenciaIcono() {
    const porcentageNumero = document.getElementsByClassName('porcentageNumero');
    const tendenciaGrafica = document.getElementsByClassName('tendenciaGrafica');

    for (var i = 0; i < porcentageNumero.length; i++) {
        if (parseInt(porcentageNumero[i].innerText) > 60) {
            tendenciaGrafica[(3 * i)].classList.remove('hiddenElement');
            tendenciaGrafica[(3 * i) + 1].classList.add('hiddenElement');
            tendenciaGrafica[(3 * i) + 2].classList.add('hiddenElement');
        }else if (parseInt(porcentageNumero[i].innerText) <= 59 && parseInt(porcentageNumero[i].innerText) != 0) {
            tendenciaGrafica[(3 * i)].classList.add('hiddenElement');
            tendenciaGrafica[(3 * i) + 1].classList.remove('hiddenElement');
            tendenciaGrafica[(3 * i) + 2].classList.add('hiddenElement');
        }else if(parseInt(porcentageNumero[i].innerText) == 0){
            tendenciaGrafica[(3 * i)].classList.add('hiddenElement');
            tendenciaGrafica[(3 * i) + 1].classList.add('hiddenElement');
            tendenciaGrafica[(3 * i) + 2].classList.remove('hiddenElement');
        }
    }
}

//Actualiza los fondos de las cards de grupo
function actualizarFondoGruposSiDefault(){
    const contenedorGruposInfoStatsContenedorSon1 = document.getElementsByClassName('contenedorGruposInfoStatsContenedorSon1');

    for(var i = 0; i < contenedorGruposInfoStatsContenedorSon1.length; i++){
        if(contenedorGruposInfoStatsContenedorSon1[i].getAttribute('style').indexOf('default') != -1){
            contenedorGruposInfoStatsContenedorSon1[i].removeAttribute('style');
            contenedorGruposInfoStatsContenedorSon1[i].classList.add('fondoDinamico');
        }
    }
}

//Contador de grupos global
function contarGruposGlobal(){
    const gruposContador = document.getElementById('gruposContador');
    const contenedorGruposInfoStatsContenedor = document.getElementsByClassName('contenedorGruposInfoStatsContenedor');

    const counterGroupsMed = document.getElementById('counterGroupsMed');    
    const counterGroupsSmall = document.getElementById('counterGroupsSmall');

    gruposContador.innerText = contenedorGruposInfoStatsContenedor.length;
    counterGroupsMed.innerText = contenedorGruposInfoStatsContenedor.length;
    counterGroupsSmall.innerText = contenedorGruposInfoStatsContenedor.length;
}

//Contador de estudiantes por grupo
function contarEstudiantesGrupo(){
    //Contenedor de cada alumno
    const cardAlumnoCounter = document.getElementsByClassName('cardAlumnoCounter');
    //Contador de alumnos
    const counterStudentsMed = document.getElementById('counterStudentsMed');    
    const counterStudentsSmall = document.getElementById('counterStudentsSmall');

    counterStudentsMed.innerText = cardAlumnoCounter.length;
    counterStudentsSmall.innerText = cardAlumnoCounter.length;

}

actualizarFondoGruposSiDefault();
leerTendenciaIcono();
contarGruposGlobal();
contarEstudiantesGrupo();