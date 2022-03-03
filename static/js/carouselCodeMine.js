/*
    Este es el carousel para las opciones principales.
*/

$('.owl-one').owlCarousel({
    loop:false,
    margin:20,
    autoWidth:true,
    touchDrag:true,
    nav:false,
    dotsData: false,
    dots: false,
    fluidSpeed: true,
    center: true,
    responsive:{
        0:{
            items:1.5
        },
        600:{
            items:1.5
        }
    }
})


/*
    Es el carousel para nuestra parte de los informes
*/
$('.owl-two').owlCarousel({
    loop:false,
    margin:10,
    autoWidth:true,
    touchDrag:true,
    nav:false,
    dotsData: false,
    dots: false,
    fluidSpeed: true,
    center: true,
    responsive:{
        0:{
            items:1.5
        },
        600:{
            items:1.5
        }
    }
})

/*
    Es el carousel para nuestra parte las estadisticas del sistema
*/
$('.owl-three').owlCarousel({
    loop:false,
    margin:10,
    autoWidth:true,
    touchDrag:true,
    nav:false,
    dotsData: false,
    dots: false,
    fluidSpeed: true,
    center: true,
    responsive:{
        0:{
            items:1.5
        },
        600:{
            items:1.5
        }
    }
})

/*
    Es el carousel para nuestra parte las estadisticas del sistema en las cards solamente
*/
$('.owl-four').owlCarousel({
    loop:false,
    margin:2,
    autoWidth:true,
    touchDrag:true,
    nav:false,
    dotsData: false,
    dots: false,
    fluidSpeed: true,
    center: true,
    responsive:{
        0:{
            items:1.2
        },
        600:{
            items:1.2
        }
    }
})

/*
    Para las recomendaciones en pequeños globitos
*/
$('.owl-five').owlCarousel({
    loop:false,
    margin:10,
    autoWidth:true,
    touchDrag:true,
    nav:false,
    dotsData: false,
    dots: false,
    fluidSpeed: true,
    center: false,
    responsive:{
        0:{
            items:1.2
        },
        600:{
            items:1.2
        }
    }
})