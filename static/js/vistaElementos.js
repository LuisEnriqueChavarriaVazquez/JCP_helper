$(document).ready(function () {

    //Opciones de visualizar los elementos
    var listaOpcion = document.getElementById("listaGrafGrupos");
    var carouselOpcion = document.getElementById("carouselGrafGrupos");
    var dashboardOpcion = document.getElementById("dashboardGrafGrupos");
    var dashboardVerticalOpcion = document.getElementById("dashboardVerticalGrafGrupos");

    //Cargador
    var cargador = document.getElementById("hidder");

    //Componentes de elementos para cargar
    var carouselGrafGruposSegmento = document.getElementById("carouselGrafGruposSegmento");
    var listadoGrafGruposSegmento = document.getElementById("listadoGrafGruposSegmento");
    var dashboardGrafGruposSegmento = document.getElementById("dashboardGrafGruposSegmento");
    var dashboardVerticalGrafGruposSegmento = document.getElementById("dashboardVerticalGrafGruposSegmento");

    //Espera del cargador
    setInterval(cargadorQuitar, 2000);

    function cargadorQuitar() {
        cargador.style.display = 'none';
    }

    //Para los dispositivos móviles
    listaOpcion.onclick = function () {
        carouselGrafGruposSegmento.style.display = 'none';
        listadoGrafGruposSegmento.style.display = 'block';
        cargador.style.display = 'block';
    }

    carouselOpcion.onclick = function () {
        carouselGrafGruposSegmento.style.display = 'block';
        listadoGrafGruposSegmento.style.display = 'none';
        cargador.style.display = 'block';
    }

    //Para las pantallas de las tabletas y escritorio
    dashboardOpcion.onclick = function () {
        dashboardGrafGruposSegmento.style.display = 'block';
        dashboardVerticalGrafGruposSegmento.style.display = 'none';
        cargador.style.display = 'block';
    }

    dashboardVerticalOpcion.onclick = function () {
        dashboardGrafGruposSegmento.style.display = 'none';
        dashboardVerticalGrafGruposSegmento.style.display = 'block';
        cargador.style.display = 'block';
    }

    /*
        Para la parte de la comunidad
    */

    //Opciones de visualizar los elementos
    var listaOpcionComunidad = document.getElementById("listaGrafComunidad");
    var carouselOpcionComunidad = document.getElementById("carouselGrafComunidad");
    var dashboardOpcionComunidad = document.getElementById("dashboardGrafComunidad");
    var dashboardVerticalOpcionComunidad = document.getElementById("dashboardVerticalGrafComunidad");

    //Cargador
    var cargador = document.getElementById("hidder");

    //Componentes de elementos para cargar
    var carouselGrafComunidadSegmento = document.getElementById("carouselGrafComunidadSegmento");
    var listadoGrafComunidadSegmento = document.getElementById("listadoGrafComunidadSegmento");
    var dashboardGrafComunidadSegmento = document.getElementById("dashboardGrafComunidadSegmento");
    var dashboardVerticalGrafComunidadSegmento = document.getElementById("dashboardVerticalGrafComunidadSegmento");

    //Para los dispositivos móviles
    listaOpcionComunidad.onclick = function () {
        carouselGrafComunidadSegmento.style.display = 'none';
        listadoGrafComunidadSegmento.style.display = 'block';
        cargador.style.display = 'block';
    }

    carouselOpcionComunidad.onclick = function () {
        carouselGrafComunidadSegmento.style.display = 'block';
        listadoGrafComunidadSegmento.style.display = 'none';
        cargador.style.display = 'block';
    }

    //Para las pantallas de las tabletas y escritorio
    dashboardOpcionComunidad.onclick = function () {
        dashboardGrafComunidadSegmento.style.display = 'block';
        dashboardVerticalGrafComunidadSegmento.style.display = 'none';
        cargador.style.display = 'block';
    }

    dashboardVerticalOpcionComunidad.onclick = function () {
        dashboardGrafComunidadSegmento.style.display = 'none';
        dashboardVerticalGrafComunidadSegmento.style.display = 'block';
        cargador.style.display = 'block';
    }

    /*
        Para la parte de los cuestionarios
    */

    //Opciones de visualizar los elementos
    var listaOpcionCuestionarios = document.getElementById("listaGrafCuestionarios");
    var carouselOpcionCuestionarios = document.getElementById("carouselGrafCuestionarios");
    var dashboardOpcionCuestionarios = document.getElementById("dashboardGrafCuestionarios");
    var dashboardVerticalOpcionCuestionarios = document.getElementById("dashboardVerticalGrafCuestionarios");

    //Cargador
    var cargador = document.getElementById("hidder");

    //Componentes de elementos para cargar
    var carouselGrafCuestionariosSegmento = document.getElementById("carouselGrafCuestionariosSegmento");
    var listadoGrafCuestionariosSegmento = document.getElementById("listadoGrafCuestionariosSegmento");
    var dashboardGrafCuestionariosSegmento = document.getElementById("dashboardGrafCuestionariosSegmento");
    var dashboardVerticalGrafCuestionariosSegmento = document.getElementById("dashboardVerticalGrafCuestionariosSegmento");

    //Para los dispositivos móviles
    listaOpcionCuestionarios.onclick = function () {
        carouselGrafCuestionariosSegmento.style.display = 'none';
        listadoGrafCuestionariosSegmento.style.display = 'block';
        cargador.style.display = 'block';
    }

    carouselOpcionCuestionarios.onclick = function () {
        carouselGrafCuestionariosSegmento.style.display = 'block';
        listadoGrafCuestionariosSegmento.style.display = 'none';
        cargador.style.display = 'block';
    }

    //Para las pantallas de las tabletas y escritorio
    dashboardOpcionCuestionarios.onclick = function () {
        dashboardGrafCuestionariosSegmento.style.display = 'block';
        dashboardVerticalGrafCuestionariosSegmento.style.display = 'none';
        cargador.style.display = 'block';
    }

    dashboardVerticalOpcionCuestionarios.onclick = function () {
        dashboardGrafCuestionariosSegmento.style.display = 'none';
        dashboardVerticalGrafCuestionariosSegmento.style.display = 'block';
        cargador.style.display = 'block';
    }

     /*
        Para la parte de los estudiantes
    */

    //Opciones de visualizar los elementos
    var listaOpcionEstudiantes = document.getElementById("listaGrafEstudiantes");
    var carouselOpcionEstudiantes = document.getElementById("carouselGrafEstudiantes");
    var dashboardOpcionEstudiantes = document.getElementById("dashboardGrafEstudiantes");
    var dashboardVerticalOpcionEstudiantes = document.getElementById("dashboardVerticalGrafEstudiantes");

    //Cargador
    var cargador = document.getElementById("hidder");

    //Componentes de elementos para cargar
    var carouselGrafEstudiantesSegmento = document.getElementById("carouselGrafEstudiantesSegmento");
    var listadoGrafEstudiantesSegmento = document.getElementById("listadoGrafEstudiantesSegmento");
    var dashboardGrafEstudiantesSegmento = document.getElementById("dashboardGrafEstudiantesSegmento");
    var dashboardVerticalGrafEstudiantesSegmento = document.getElementById("dashboardVerticalGrafEstudiantesSegmento");

    //Para los dispositivos móviles
    listaOpcionEstudiantes.onclick = function () {
        carouselGrafEstudiantesSegmento.style.display = 'none';
        listadoGrafEstudiantesSegmento.style.display = 'block';
        cargador.style.display = 'block';
    }

    carouselOpcionEstudiantes.onclick = function () {
        carouselGrafEstudiantesSegmento.style.display = 'block';
        listadoGrafEstudiantesSegmento.style.display = 'none';
        cargador.style.display = 'block';
    }

    //Para las pantallas de las tabletas y escritorio
    dashboardOpcionEstudiantes.onclick = function () {
        dashboardGrafEstudiantesSegmento.style.display = 'block';
        dashboardVerticalGrafEstudiantesSegmento.style.display = 'none';
        cargador.style.display = 'block';
    }

    dashboardVerticalOpcionEstudiantes.onclick = function () {
        dashboardGrafEstudiantesSegmento.style.display = 'none';
        dashboardVerticalGrafEstudiantesSegmento.style.display = 'block';
        cargador.style.display = 'block';
    }
});