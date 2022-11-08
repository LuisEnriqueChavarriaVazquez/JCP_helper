
function imprimimosGruposComentarios(){
    //Se encuentra en el JS para obtener los datos
    let gruposNameArrayCopia = [...gruposNameArray];
    //Container de los titulos de los grupos
    let containerGruposComentarios = document.getElementById('containerGruposComentarios');

    //Generamos los enlaces para mostrar los comentarios
    let contenido = "";
    gruposNameArrayCopia.forEach(grupo => {
        contenido += `
        <div class="waves-effect linkGrupo bordered1 colorGreyWhiter">
            <p class="linkGrupoTexto coloredText">${grupo}</p>
        </div>
        `;
    });
    containerGruposComentarios.innerHTML = contenido;
    
}
imprimimosGruposComentarios();