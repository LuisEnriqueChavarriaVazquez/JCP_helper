$(document).ready(function () {
    //$('.buscador_scroll_down').toggleClass("buscador_scrolled_down", ($(window).scrollTop() > 54));
    let buscador_contenedor = document.getElementById("container_browser_id_uno");
    let buscador_fondo = document.getElementById("fondo_browser_id_dos");
    let buscador_box_secundario = document.getElementById("container_browser_id_dos");
    let buscador_input = document.getElementById("buscadorInput_tres");
    let icon_browser_mine = document.getElementById("icon_browser_mine");
    
    //Para cuando la app inicie
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
        }
    
        let slider_recomendaciones = document.getElementById("slider_recomendaciones_id");
    
        if ($(window).scrollTop() > (136)) {
            slider_recomendaciones.classList.add("slider_recomendaciones_sticky", "color2");
        } else {
            slider_recomendaciones.classList.remove("slider_recomendaciones_sticky", "color2");
        }
    });
});
