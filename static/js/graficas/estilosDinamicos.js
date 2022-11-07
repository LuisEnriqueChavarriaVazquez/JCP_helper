let colorEstilo = localStorage.getItem('tema');

//Se almacenan los colores aqui
let arrayColores = [];


//Se meten los colores de acuerdo a la ruta...
if(colorEstilo == "../static/css/temas/accesibilidadColoresDeuteranomalia.css"){
    arrayColores.push('rgb(13, 13, 3)', 'rgb(38, 47, 42)', 'rgb(102, 115, 95)', 'rgb(189, 177, 143)', 'rgb(234, 209, 185)','rgb(13, 13, 3)', 'rgb(38, 47, 42)', 'rgb(102, 115, 95)', 'rgb(189, 177, 143)', 'rgb(234, 209, 185)','rgb(13, 13, 3)', 'rgb(38, 47, 42)', 'rgb(102, 115, 95)', 'rgb(189, 177, 143)', 'rgb(234, 209, 185)','rgb(13, 13, 3)', 'rgb(38, 47, 42)', 'rgb(102, 115, 95)', 'rgb(189, 177, 143)', 'rgb(234, 209, 185)','rgb(13, 13, 3)', 'rgb(38, 47, 42)', 'rgb(102, 115, 95)', 'rgb(189, 177, 143)', 'rgb(234, 209, 185)');
}else if(colorEstilo == "../static/css/temas/accesibilidadColoresDeuteranopia.css"){
    arrayColores.push('#140F04','rgb(54, 46, 45)','rgb(130, 108, 97)','rgb(208, 171, 144)','rgb(245, 205, 186)','#140F04','rgb(54, 46, 45)','rgb(130, 108, 97)','rgb(208, 171, 144)','rgb(245, 205, 186)','#140F04','rgb(54, 46, 45)','rgb(130, 108, 97)','rgb(208, 171, 144)','rgb(245, 205, 186)','#140F04','rgb(54, 46, 45)','rgb(130, 108, 97)','rgb(208, 171, 144)','rgb(245, 205, 186)','#140F04','rgb(54, 46, 45)','rgb(130, 108, 97)','rgb(208, 171, 144)','rgb(245, 205, 186)');
}else if(colorEstilo == "../static/css/temas/accesibilidadColoresProtanopia.css"){
    arrayColores.push('#121000','#323028','#787056','#BFB287','#E0d4b5','#121000','#323028','#787056','#BFB287','#E0d4b5','#121000','#323028','#787056','#BFB287','#E0d4b5','#121000','#323028','#787056','#BFB287','#E0d4b5','#121000','#323028','#787056','#BFB287','#E0d4b5');
}else if(colorEstilo == "../static/css/temas/accesibilidadColoresTritanopia.css"){
    arrayColores.push('rgb(8, 17, 18)', 'rgb(26, 51, 56)', 'rgb(71, 120, 129)', 'rgb(164, 180, 194)', '#d8d8b8','rgb(8, 17, 18)', 'rgb(26, 51, 56)', 'rgb(71, 120, 129)', 'rgb(164, 180, 194)', '#d8d8b8','rgb(8, 17, 18)', 'rgb(26, 51, 56)', 'rgb(71, 120, 129)', 'rgb(164, 180, 194)', '#d8d8b8','rgb(8, 17, 18)', 'rgb(26, 51, 56)', 'rgb(71, 120, 129)', 'rgb(164, 180, 194)', '#d8d8b8','rgb(8, 17, 18)', 'rgb(26, 51, 56)', 'rgb(71, 120, 129)', 'rgb(164, 180, 194)', '#d8d8b8','rgb(8, 17, 18)', 'rgb(26, 51, 56)', 'rgb(71, 120, 129)', 'rgb(164, 180, 194)', '#d8d8b8');
}else if(colorEstilo == "../static/css/temas/coloresAqua.css"){
    arrayColores.push('#436a73','#123b3e','#126063','#158a93','#1dc7be','#121b1d','#123b3e','#126063','#158a93','#1dc7be','#121b1d','#123b3e','#126063','#158a93','#1dc7be');
}else if(colorEstilo == "../static/css/temas/coloresBlue.css"){
    arrayColores.push('#3e5e7b', '#1c2936', '#3e5b65', '#5f91a4', '#85d0e5','#131c25', '#1c2936', '#3e5b65', '#5f91a4', '#85d0e5','#131c25', '#1c2936', '#3e5b65', '#5f91a4', '#85d0e5');
}else if(colorEstilo == "../static/css/temas/coloresBronce.css"){
    arrayColores.push('#4f1502', '#712c00', '#9b4b00', '#cf7800', '#ffad07','#4f1502', '#712c00', '#9b4b00', '#cf7800', '#ffad07','#4f1502', '#712c00', '#9b4b00', '#cf7800', '#ffad07');
}else if(colorEstilo == "../static/css/temas/coloresCafe.css"){
    arrayColores.push('#2c1b18', '#4e342e', '#5d4037', '#bcaaa4', '#d7ccc8','#2c1b18', '#4e342e', '#5d4037', '#bcaaa4', '#d7ccc8','#2c1b18', '#4e342e', '#5d4037', '#bcaaa4', '#d7ccc8');
}else if(colorEstilo == "../static/css/temas/coloresDefault.css"){
    arrayColores.push('#000a00', '#0c3226', '#377e5b', '#9bbd8c', '#d8d8b8','#000a00', '#0c3226', '#377e5b', '#9bbd8c', '#d8d8b8','#000a00', '#0c3226', '#377e5b', '#9bbd8c', '#d8d8b8');
}else if(colorEstilo == "../static/css/temas/coloresGotico.css"){
    arrayColores.push('#313131', '#444444', '#747474', '#bbbbbb', '#e2e2e2','#313131', '#444444', '#747474', '#bbbbbb', '#e2e2e2','#313131', '#444444', '#747474', '#bbbbbb', '#e2e2e2');
}else if(colorEstilo == "../static/css/temas/coloresModoOscuro.css"){
    arrayColores.push('#313131', '#444444', '#747474', '#bbbbbb', '#e2e2e2','#313131', '#444444', '#747474', '#bbbbbb', '#e2e2e2','#313131', '#444444', '#747474', '#bbbbbb', '#e2e2e2');
}else if(colorEstilo == "../static/css/temas/coloresNaranja.css"){
    arrayColores.push('#5a1411', '#842b19', '#bc521c', '#fa8c1e', '#ffd530','#5a1411', '#842b19', '#bc521c', '#fa8c1e', '#ffd530','#5a1411', '#842b19', '#bc521c', '#fa8c1e', '#ffd530');
}else if(colorEstilo == "../static/css/temas/coloresPink.css"){
    arrayColores.push('#4d2c4c', '#743b5e', '#b0537a', '#fb7799', '#ffb2bf','#4d2c4c', '#743b5e', '#b0537a', '#fb7799', '#ffb2bf','#4d2c4c', '#743b5e', '#b0537a', '#fb7799', '#ffb2bf');
}else if(colorEstilo == "../static/css/temas/coloresPurple.css"){
    arrayColores.push('#3b264d', '#594668', '#7a5a89', '#be77b0', '#dc91d1','#3b264d', '#594668', '#7a5a89', '#be77b0', '#dc91d1','#3b264d', '#594668', '#7a5a89', '#be77b0', '#dc91d1');
}else if(colorEstilo == "../static/css/temas/coloresRed.css"){
    arrayColores.push('#5c1928', '#74232d', '#9c3537', '#d45044', '#ff7751','#5c1928', '#74232d', '#9c3537', '#d45044', '#ff7751','#5c1928', '#74232d', '#9c3537', '#d45044', '#ff7751');
}else if(colorEstilo == "../static/css/temas/dark_aqua.css"){
    arrayColores.push('#436a73','#123b3e','#126063','#158a93','#1dc7be','#121b1d','#123b3e','#126063','#158a93','#1dc7be','#121b1d','#123b3e','#126063','#158a93','#1dc7be');
}else if(colorEstilo == "../static/css/temas/dark_blue.css"){
    arrayColores.push('#3e5e7b', '#1c2936', '#3e5b65', '#5f91a4', '#85d0e5','#131c25', '#1c2936', '#3e5b65', '#5f91a4', '#85d0e5','#131c25', '#1c2936', '#3e5b65', '#5f91a4', '#85d0e5');
}else if(colorEstilo == "../static/css/temas/dark_green.css"){
    arrayColores.push('#000a00', '#0c3226', '#377e5b', '#9bbd8c', '#d8d8b8','#000a00', '#0c3226', '#377e5b', '#9bbd8c', '#d8d8b8','#000a00', '#0c3226', '#377e5b', '#9bbd8c', '#d8d8b8');
}else if(colorEstilo == "../static/css/temas/dark_orange.css"){
    arrayColores.push('#5a1411', '#842b19', '#bc521c', '#fa8c1e', '#ffd530','#5a1411', '#842b19', '#bc521c', '#fa8c1e', '#ffd530','#5a1411', '#842b19', '#bc521c', '#fa8c1e', '#ffd530');
}else if(colorEstilo == "../static/css/temas/dark_pink.css"){
    arrayColores.push('#4d2c4c', '#743b5e', '#b0537a', '#fb7799', '#ffb2bf','#4d2c4c', '#743b5e', '#b0537a', '#fb7799', '#ffb2bf','#4d2c4c', '#743b5e', '#b0537a', '#fb7799', '#ffb2bf');
}else if(colorEstilo == "../static/css/temas/dark_purple.css"){
    arrayColores.push('#3b264d', '#594668', '#7a5a89', '#be77b0', '#dc91d1','#3b264d', '#594668', '#7a5a89', '#be77b0', '#dc91d1','#3b264d', '#594668', '#7a5a89', '#be77b0', '#dc91d1');
}else if(colorEstilo == "../static/css/temas/dark_red.css"){
    arrayColores.push('#5c1928', '#74232d', '#9c3537', '#d45044', '#ff7751','#5c1928', '#74232d', '#9c3537', '#d45044', '#ff7751','#5c1928', '#74232d', '#9c3537', '#d45044', '#ff7751');
}else if(colorEstilo == "../static/css/temas/dark_yellow.css"){
    arrayColores.push('#313131', '#444444', '#747474', '#bbbbbb', '#e2e2e2','#313131', '#444444', '#747474', '#bbbbbb', '#e2e2e2','#313131', '#444444', '#747474', '#bbbbbb', '#e2e2e2');
}