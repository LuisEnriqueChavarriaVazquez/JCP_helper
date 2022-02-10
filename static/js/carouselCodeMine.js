$('.owl-carousel').owlCarousel({
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