function validarSiPostTieneFoto(){
    const imagePost = document.getElementsByClassName('imagePost');
    const fotoValuePost = document.getElementsByClassName('fotoValuePost');

    for(var i = 0; i < imagePost.length; i++){
        if(imagePost[i].getAttribute('style').indexOf('http') == -1){
            fotoValuePost[i].classList.remove('postGeneral');
            fotoValuePost[i].classList.add('postGeneralSinFoto');
        }   
    }
}

validarSiPostTieneFoto();