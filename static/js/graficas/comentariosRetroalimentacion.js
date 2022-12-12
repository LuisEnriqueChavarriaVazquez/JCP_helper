//////////////////////////////////
//Manejo y limpieza de los datos.
let idAlumnoComentario = [];
let idGrupoComentario = [];
let idGrupoComentario_SET = new Set;
let idGrupoComentario_sinRepetir = [];
let comentarioRetroalimentacion = [];

//Vaciamos el contenido de la DB.
datosComentariosRetro.forEach(comentario => {
    idGrupoComentario.push(comentario[1]);
    idGrupoComentario_SET.add(comentario[1]);
    idAlumnoComentario.push(comentario[2]);
    comentarioRetroalimentacion.push(comentario[3]);
});
console.log('idAlumnoComentario', idAlumnoComentario)
console.log('idGrupoComentario', idGrupoComentario);
console.log('comentarioRetroalimentacion', comentarioRetroalimentacion)
idGrupoComentario_sinRepetir = Array.from(idGrupoComentario_SET);

//Vaciamos los datos de los alumnos que han contestado
let nombreAlumnoComentario = [];
let fotoAlumnoComentario = [];

datosAlumnosRetroalimentacion.forEach(alumno => {
    nombreAlumnoComentario.push(alumno[1]);
    fotoAlumnoComentario.push(alumno[3]);
})
console.log('nombreAlumnoComentario', nombreAlumnoComentario)
console.log('fotoAlumnoComentario', fotoAlumnoComentario)

//Vaciamos los nombres de los grupos que tienes retroalimentacion
let nombreGrupoComentarioRetro = []
let nombreGrupoComentarioRetro_SET = new Set;
let arrayNombresSinRepetir_retro = [];
datosGruposConRetroalimentacion.forEach(grupo => {
    nombreGrupoComentarioRetro.push(grupo[2]);
    nombreGrupoComentarioRetro_SET.add(grupo[2]);
})
console.log('nombreGrupoComentarioRetro', nombreGrupoComentarioRetro)
console.log('Nombre grupos retro sin repetir', nombreGrupoComentarioRetro_SET);
arrayNombresSinRepetir_retro = Array.from(nombreGrupoComentarioRetro_SET);
/////////////////////////////////////////////

//Hay que contar los elementos que tiene cada grupo
const count = {};
idGrupoComentario.forEach(element => {
    count[element] = (count[element] || 0) + 1;
});
let conteoIds_comentarios = Object.values(count);
let llavesIds_comentarios = Object.keys(count);
console.log('llavesIds_comentarios', llavesIds_comentarios)
console.log('conteoIds_comentarios', conteoIds_comentarios);

//Hay que dividir los comentarios de acuerdo a la cantidad que hay en cada grupo
let comentarioRetroMultidimensional = [];
let nombreAlumnoRetroMultidimensional = [];
let fotoAlumnoRetroMultidimensional = [];
for (var y = 0; y < conteoIds_comentarios.length; y++) {
    //Para los comentarios de los grupo
    let arrayTemporal1 = [];
    arrayTemporal1.push(comentarioRetroalimentacion.splice(0, conteoIds_comentarios[y]));
    comentarioRetroMultidimensional.push(arrayTemporal1);
    //Para los nombres de los alumnos que hacen los comentarios
    let arrayTemporal2 = [];
    arrayTemporal2.push(nombreAlumnoComentario.splice(0, conteoIds_comentarios[y]));
    nombreAlumnoRetroMultidimensional.push(arrayTemporal2);
    //Para las fotos de los alumnos que hacen los comentarios
    let arrayTemporal3 = [];
    arrayTemporal3.push(fotoAlumnoComentario.splice(0, conteoIds_comentarios[y]));
    fotoAlumnoRetroMultidimensional.push(arrayTemporal3);
}
console.log('Comentarios retroalimentacion multidimensional = ', comentarioRetroMultidimensional)
console.log('Nombre de alumnos multidimensional = ', nombreAlumnoRetroMultidimensional)
console.log('Foto de alumnos multidimensional = ', fotoAlumnoRetroMultidimensional)

///////////////////////////////////////////////////
function imprimimosGruposComentarios() {
    //Container de los titulos de los grupos
    let containerGruposComentarios = document.getElementById('containerGruposComentarios');

    //Generamos los enlaces para mostrar los comentarios
    let contenido = "";
    arrayNombresSinRepetir_retro.forEach((grupo, i = 0) => {
        contenido += `
        <div onclick="mostrarComentarios('`+ i + `','link_grupo_` + idGrupoComentario_sinRepetir[i] + `', '` + idGrupoComentario_sinRepetir[i++] + `')" id="link_grupo_` + idGrupoComentario_sinRepetir[i++] + `" class="waves-effect linkGrupo bordered1 colorGreyWhiter">
            <p class="linkGrupoTexto coloredText">${grupo}</p>
        </div>
        `;
    });
    i++;
    containerGruposComentarios.innerHTML = contenido;

}
imprimimosGruposComentarios();

//Funcion que muestra los comentarios en la pantalla.
let contenedorDinamico = document.getElementById('containerMessages_retro');
function mostrarComentarios(selectorArray, id, numeroGrupo) {
    contenedorDinamico.innerHTML = "";

    comentarioRetroMultidimensional[selectorArray].forEach((comentario, j = 0) => {
        comentario.forEach((contenidoIndividual, i = 0) => {
            contenedorDinamico.innerHTML += `
                <div class="comentarioContainerRetroalimentacion bordered1 colorGreyWhiter">
                    <div class="comentarioContainerRetroalimentacion-userData">
                        <div class="comentarioContainerRetroalimentacion-userData-img">
                            <img class="shadow-1e" src="../../../static/images/alumnos/${fotoAlumnoRetroMultidimensional[selectorArray][j][i]}">
                        </div>
                        <div class="comentarioContainerRetroalimentacion-userData-name">
                            <p class="coloreTextReverse">${nombreAlumnoRetroMultidimensional[selectorArray][j][i]}</p>
                        </div>
                    </div>
                    <div class="comentarioContainerRetroalimentacion-comentary colorTextReverse">
                            ${contenidoIndividual}
                    </div>
                </div>
                `;
            i++;
        });
        j++;
    });
}
