$(document).ready(function(){

    //Opciones de visualizar los elementos
    var listaOpcion = document.getElementById("listaGrafGrupos");
    var carouselOpcion = document.getElementById("carouselGrafGrupos");
    var dashboardOpcion =  document.getElementById("dashboardGrafGrupos");
    var dashboardVerticalOpcion = document.getElementById("dashboardVerticalGrafGrupos");

    //Componentes de elementos para cargar
    var carouselGrafGruposSegmento = document.getElementById("carouselGrafGruposSegmento");
    var listadoGrafGruposSegmento = document.getElementById("listadoGrafGruposSegmento");
    var dashboardGrafGruposSegmento = document.getElementById("dashboardGrafGruposSegmento");
    var dashboardVerticalGrafGruposSegmento = document.getElementById("dashboardVerticalGrafGruposSegmento");

    listaOpcion.onclick = function(){
        carouselGrafGruposSegmento.style.display = 'none';
        listadoGrafGruposSegmento.style.display = 'block';
    }

    carouselOpcion.onclick = function(){
        carouselGrafGruposSegmento.style.display = 'block';
        listadoGrafGruposSegmento.style.display = 'none';
    }
});