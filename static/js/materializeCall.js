$(document).ready(function(){
    $('.sidenav').sidenav();
    $('.collapsible').collapsible();
    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true
        
    });
    $('.modal').modal();
    $('ul.tabs').tabs();

    /*
    //  Código para la parte de elegir la foto de perfil
    */
    //Acceder a el selector de fotos cuando presionemos la imagen
    $("#profileImageEst").click(function(e) {
        $("#imageUploadEst").click();
    });

    //Ver la imagen que hemos seleccionado en nuestro formulario antes de enviar
    function previewProfileImageEst( uploader ) {   
        //Nos aseguramos que el archivo fue elegido
        if (uploader.files && uploader.files[0]) {
            var imageFile = uploader.files[0];
            var reader = new FileReader();    
            reader.onload = function (e) {
                //Establecemos la data con la imagen que elegimos
                $('#profileImageEst').attr('src', e.target.result);
            }    
            reader.readAsDataURL( imageFile );
        }
    }
    
    $("#imageUploadEst").change(function(){
        previewProfileImageEst( this );
    });

    //Acceder a el selector de fotos cuando presionemos la imagen
    $("#profileImageProf").click(function(e) {
        $("#imageUploadProf").click();
    });

    //Ver la imagen que hemos seleccionado en nuestro formulario antes de enviar
    function previewProfileImageProf( uploader ) {   
        //Nos aseguramos que el archivo fue elegido
        if (uploader.files && uploader.files[0]) {
            var imageFile = uploader.files[0];
            var reader = new FileReader();    
            reader.onload = function (e) {
                //Establecemos la data con la imagen que elegimos
                $('#profileImageProf').attr('src', e.target.result);
            }    
            reader.readAsDataURL( imageFile );
        }
    }
    
    $("#imageUploadProf").change(function(){
        previewProfileImageProf( this );
    });

});
        