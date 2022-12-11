FROM operacionesBD.conexion import obtener_conexion

def insertar_profesor(nombre,alias,foto,correo,contra,unidad_academica,descripcion,fondo,correo_sin_hash):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("INSERT INTO Docentes(Nombre,Alias,Foto,correo,contra,unidad_academica,descripcion,fondo,correo_normal) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s)",
        (nombre,alias,foto,correo,contra,unidad_academica,descripcion,fondo,correo_sin_hash))
    conexion.commit()
    conexion.close()

def validar_correo_profesor(correo_entrada):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("UPDATE Docentes SET val_correo=%s WHERE correo=%s",
        (True,correo_entrada))
    conexion.commit()
    conexion.close()


def obtener_profesores():
    conexion=obtener_conexion()
    profesores=[]

    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM Docentes")
        profesores=cursor.fetchall()
    conexion.close()
    return profesores

def obtener_profesores_id(correo):
    conexion=obtener_conexion()
    profesores_id=[]
    id_profesor = ""

    with conexion.cursor() as cursor:
        cursor.execute("SELECT IDDocente FROM Docentes WHERE correo = %s", (correo))
        profesores_id=cursor.fetchone()
    
    if profesores_id is not None:
        id_profesor = ''.join(str(profesores_id[0]))
        conexion.close()
        return id_profesor
    else:
        id_profesor = '0'
        return id_profesor

##Operaciones de la gestion de grupos
##
## Nos retorna tuplas con nombre y descripcion de grupos de un profesor dado
##
def obtener_grupos_datos_importantes(id_profesor):
    conexion=obtener_conexion()
    grupos=[]

    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM Grupos WHERE IDDocente = %s", (id_profesor))
        grupos=cursor.fetchall()

    conexion.close()
    return grupos

def obtener_grupos_IDS(id_profesor):
    conexion=obtener_conexion()
    grupos=[]

    with conexion.cursor() as cursor:
        cursor.execute("SELECT IDGrupo FROM Grupos WHERE IDDocente = %s", (id_profesor))
        grupos=cursor.fetchall()

    conexion.close()
    return grupos

def obtener_grupos_Nombre(id_grupo):
    conexion=obtener_conexion()
    grupos=[]

    with conexion.cursor() as cursor:
        cursor.execute("SELECT Nombre FROM Grupos WHERE IDGrupo = %s", (id_grupo))
        grupos=cursor.fetchall()

    conexion.close()
    return grupos

def obtener_alumnos_con_profesor_IDS(id_profesor):
    conexion=obtener_conexion()
    alumnosIds=[]

    with conexion.cursor() as cursor:
        cursor.execute("SELECT IDAlumno FROM Grupos_Alumnos WHERE IDDocente = %s", (id_profesor))
        alumnosIds=cursor.fetchall()

    conexion.close()
    return alumnosIds

#Lo mismo pero con IDGrupo (un grupo en concreto)
def obtener_grupo_datos_importantes_unitario(id_grupo):
    conexion=obtener_conexion()
    grupos=[]

    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM Grupos WHERE IDGrupo = %s", (id_grupo))
        grupos=cursor.fetchall()

    conexion.close()
    return grupos

##
## Obtiene un codigo de los grupos
##
def obtener_grupos_codigo(id_profesor):
    conexion=obtener_conexion()
    grupos_codigos=[]
    grupo = ""

    with conexion.cursor() as cursor:
        cursor.execute("SELECT Codigo FROM Grupos WHERE IDDocente = %s", (id_profesor))
        grupos_codigos=cursor.fetchone()
    
    if grupos_codigos is not None:
        grupo = ''.join(str(grupos_codigos[0]))
        conexion.close()
        return grupo
    else:
        grupo = '0'
        return grupo
##
## Obtiene un IDGrupo con nombre del grupo
##
def obtener_id_grupo_con_nombre_grupo(nombreGrupo):
    conexion=obtener_conexion()
    grupos_codigos=[]
    grupo = ""

    with conexion.cursor() as cursor:
        cursor.execute("SELECT IDGrupo FROM Grupos WHERE Nombre = %s", (nombreGrupo))
        grupos_codigos=cursor.fetchone()
    
    if grupos_codigos is not None:
        grupo = ''.join(str(grupos_codigos[0]))
        conexion.close()
        return grupo
    else:
        grupo = '0'
        return grupo
##
## Nos ayuda a eliminar un grupo
##
def delete_grupos(id_grupo):
    conexion=obtener_conexion()
    confirmacionDeDelete = True

    with conexion.cursor() as cursor:
        cursor.execute("DELETE FROM Grupos WHERE IDGrupo = %s", (id_grupo))

    conexion.commit()
    conexion.close()
    return confirmacionDeDelete

##
## Nos ayuda a editar un grupo
##

def update_grupos(nombreGrupo, descGrupo, fondoGrupo, lenguajesGrupo, temasGrupo, id_grupo):
    conexion=obtener_conexion()
    confirmacionDeDelete = True

    with conexion.cursor() as cursor:
        cursor.execute("UPDATE Grupos SET Nombre = %s, Descripcion = %s, Fondo = %s, Lenguajes = %s, Temas = %s WHERE IDGrupo = %s", (nombreGrupo, descGrupo, fondoGrupo, lenguajesGrupo, temasGrupo, id_grupo))

    conexion.commit()
    conexion.close()
    return confirmacionDeDelete

##
## Nos ayuda a modificar el fondo del docente
##

def update_fondo_docente(fondo, id_docente):
    conexion=obtener_conexion()
    confirmacionDeDelete = True

    with conexion.cursor() as cursor:
        cursor.execute("UPDATE Docentes SET fondo = %s WHERE IDDocente = %s", (fondo, id_docente))

    conexion.commit()
    conexion.close()
    return confirmacionDeDelete

##
## Obtiene los datos de los estudiantes vinculados a un grupo
##
def obtener_IDAlumno_dentro_de_grupo(id_grupo):
    conexion=obtener_conexion()
    alumnosIds=[]

    with conexion.cursor() as cursor:
        cursor.execute("SELECT IDAlumno FROM Grupos_Alumnos WHERE IDGrupo = %s", (id_grupo))
        alumnosIds=cursor.fetchall()

    conexion.close()
    return alumnosIds

##
## Obtiene los datos de los estudiantes vinculados a un grupo
##
def contar_IDAlumno_dentro_de_grupo(id_grupo):
    conexion=obtener_conexion()
    alumnosIds=[]

    with conexion.cursor() as cursor:
        cursor.execute("SELECT COUNT(IDAlumno) FROM Grupos_Alumnos WHERE IDGrupo = %s", (id_grupo))
        alumnosIds=cursor.fetchall()

    conexion.close()
    return alumnosIds

##
## Va a servir para el perfil del alumno
##
def datos_completos_alumno_by_id(IDAlumno):
    conexion = obtener_conexion()
    datosAlumnos = None

    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM Alumnos WHERE IDAlumno = %s", (IDAlumno))
        datosAlumnos = cursor.fetchall()
        
    conexion.close()
    return datosAlumnos
    

##
## ###### FIN DEL GRUPO DE FUNCIONES DE GESTION DE GRUPOS
##


def login_prof(correo):
    conexion = obtener_conexion()
    profesor = None
    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM Docentes WHERE correo = %s", (correo))
        profesor = cursor.fetchone()
    conexion.close()
    return profesor


def checar_correo_verificado(correo):
    conexion = obtener_conexion()
    verificado= False
    profesor = None
    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM Docentes WHERE correo = %s", (correo))
        profesor = cursor.fetchone()
    conexion.close()
    verificado = profesor[9]
    return verificado

############################EDICION DE PERFIL######################################
##
## Nos ayuda a subir los cambios del perfil del docente
##

def update_docente_perfil(id_docente,nombreUsuario,aliasUsuario,unidadAcademica,descUser):
    conexion=obtener_conexion()
    confirmacion = True

    with conexion.cursor() as cursor:
        cursor.execute("UPDATE Docentes SET Nombre = %s, Alias = %s, unidad_academica = %s, descripcion = %s WHERE IDDocente = %s", (nombreUsuario, aliasUsuario, unidadAcademica, descUser, id_docente))

    conexion.commit()
    conexion.close()
    return confirmacion

def update_docente_perfil_foto(id_docente, foto):
    conexion=obtener_conexion()
    confirmacion = True

    with conexion.cursor() as cursor:
        cursor.execute("UPDATE Docentes SET Foto = %s WHERE IDDocente = %s", (foto, id_docente))

    conexion.commit()
    conexion.close()
    return confirmacion

##
## Nos ayuda a subir los cambios del perfil del docente CON PASSWORD INCLUIDO
##

def update_docente_perfil_con_password(id_docente,nombreUsuario,aliasUsuario,unidadAcademica,descUser,hashed):
    conexion=obtener_conexion()
    confirmacion = True

    with conexion.cursor() as cursor:
        cursor.execute("UPDATE Docentes SET Nombre = %s, Alias = %s, unidad_academica = %s, descripcion = %s, contra = %s WHERE IDDocente = %s", (nombreUsuario, aliasUsuario, unidadAcademica, descUser, hashed, id_docente))

    conexion.commit()
    conexion.close()
    return confirmacion
#####################################################################

# va a servir para el perfil del docente
def datos_completos_docente_by_id(IDDocente):
    conexion = obtener_conexion()
    datosProfesor = None
    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM Docentes WHERE IDDocente = %s", (IDDocente))
        datosProfesor = cursor.fetchone()
    conexion.close()
    return datosProfesor

# va a servir para insertar un nuevo grupo
def insertar_grupo(id_profesor, nombreGrupo,descGrupo,fondoGrupo,codigoGrupo,lenguajesGrupo,temasGrupo):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("INSERT INTO Grupos(IDDocente,Nombre,Descripcion,Fondo,Codigo,Lenguajes,Temas) VALUES(%s,%s,%s,%s,%s,%s,%s)",
        (id_profesor, nombreGrupo,descGrupo,fondoGrupo,codigoGrupo,temasGrupo,lenguajesGrupo))
    conexion.commit()
    conexion.close()

##
## Nos retorna tuplas con datos de cuestionarios del docente
##
def obtener_cuestionarios_datos_importantes(id_profesor):
    conexion=obtener_conexion()
    grupos=[]

    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM Cuestionarios WHERE IDDocente = %s", (id_profesor))
        grupos=cursor.fetchall()

    conexion.close()
    return grupos

def obtener_cuestionarios_datos_importantes_id_cuestionario(id_cuestionario):
    conexion=obtener_conexion()
    grupos=[]

    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM Cuestionarios WHERE IDCuestionario = %s", (id_cuestionario))
        grupos=cursor.fetchall()

    conexion.close()
    return grupos

def obtener_cuestionarios_datos_importantes_con_grupo(id_grupo):
    conexion=obtener_conexion()
    grupos=[]

    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM Cuestionarios WHERE IDGrupo = %s", (id_grupo))
        grupos=cursor.fetchall()

    conexion.close()
    return grupos

#Operacion para obtener los post
def obtener_hacer_cuestionario_hecho_dos(id_cuestionario):
    conexion=obtener_conexion()
    cuestionarioHechoData=[]

    with conexion.cursor() as cursor:
        cursor.execute("SELECT IDCuestionarioHecho FROM Alumnos_hacen_Cuestionario WHERE IDCuestionario = %s", (id_cuestionario))
        cuestionarioHechoData=cursor.fetchall()

    conexion.close()
    return cuestionarioHechoData

#Operacion para obtener los post
def contar_cuestionarios_hechos_por_alumno(id_cuestionario):
    conexion=obtener_conexion()
    cuestionarioHechoData=[]

    with conexion.cursor() as cursor:
        cursor.execute("SELECT COUNT(IDCuestionario) AS count_elements FROM Alumnos_hacen_Cuestionario WHERE IDCuestionario = %s", (id_cuestionario))
        cuestionarioHechoData=cursor.fetchall()

    conexion.close()
    return cuestionarioHechoData

#SELECT COUNT(CustomerID) AS OrdersFROMCustomerID7 FROM Orders WHERE CustomerID=7

def obtener_cuestionarios_en_estado_pending(id_cuestionario):
    conexion=obtener_conexion()
    grupos=[]
    pendingState = "pending"

    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM Alumnos_hacen_Cuestionario WHERE IDCuestionario = %s AND Revision_estado = %s", (id_cuestionario, pendingState))
        grupos=cursor.fetchall()

    conexion.close()
    return grupos

def obtener_cuestionarios_en_estado_ready(id_cuestionario):
    conexion=obtener_conexion()
    cuestionarios=[]
    readyState = "ready"

    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM Alumnos_hacen_Cuestionario WHERE IDCuestionario = %s AND Revision_estado = %s", (id_cuestionario, readyState))
        cuestionarios=cursor.fetchall()

    conexion.close()
    return cuestionarios

def obtener_grupo_datos_importantes_id_hecho(codigo_cuestionario_hecho):
    conexion=obtener_conexion()
    grupos=[]

    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM Alumnos_hacen_Cuestionario WHERE IDCuestionarioHecho = %s", (codigo_cuestionario_hecho))
        grupos=cursor.fetchone()

    conexion.close()
    return grupos

##
## Nos ayuda a actualizar los cuestionarios que estaban en estado de pending
##

def insertar_data_revision_apelacion(revisionEstado, aprovacionEstado, promedioGeneral, puntajeGeneral, puntajeSegmentado,idCuestionarioHecho):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("UPDATE Alumnos_hacen_Cuestionario SET Revision_estado = %s,Aprobacion_estado = %s,Promedio_general = %s,Puntaje_general = %s,Puntaje_segmentado = %s WHERE IDCuestionarioHecho = %s",
        (revisionEstado, aprovacionEstado, promedioGeneral, puntajeGeneral, puntajeSegmentado,idCuestionarioHecho))
    conexion.commit()
    conexion.close()
    return "listo"

def insertar_apelacion(idCuestionarioHecho):
    revisionEstado = "pending"
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("UPDATE Alumnos_hacen_Cuestionario SET Revision_estado = %s WHERE IDCuestionarioHecho = %s",
        (revisionEstado,idCuestionarioHecho))
    conexion.commit()
    conexion.close()
    return "listo"

def obtener_cuestionarios_rutas(id_profesor):
    conexion=obtener_conexion()
    grupos=[]

    with conexion.cursor() as cursor:
        cursor.execute("SELECT Titulo,IDCuestionario FROM Cuestionarios WHERE IDDocente = %s", (id_profesor))
        grupos=cursor.fetchall()

    conexion.close()
    return grupos

#Lo mismo pero con IDCuestionario (un cuestionario en concreto)
def obtener_cuestionario_datos_importantes_unitario(id_cuestionario):
    conexion=obtener_conexion()
    cuestionarios=[]

    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM Cuestionarios WHERE IDCuestionario = %s", (id_cuestionario))
        cuestionarios=cursor.fetchall()

    conexion.close()
    return cuestionarios

##
## Nos ayuda a editar un cuestionario
##

def update_cuestionarios(id_grupo, tituloCuestionario, fechaCuestionario, autorCuestionario, temasCuestionario, tipoCuestionario, lenguajeCuestionario, ordenCuestionario, tiempoCuentaAtras, fechaLimiteRespuesta, horaLimiteParaResolver, numeroIntentosDisponibles, id_cuestionario):
    conexion=obtener_conexion()
    confirmacionUpdate = True

    with conexion.cursor() as cursor:
        cursor.execute("UPDATE Cuestionarios SET IDGrupo = %s, Titulo = %s, Fecha = %s, Autor = %s, Temas = %s, Tipo = %s, Lenguaje = %s, Orden = %s, TiempoCuentaAtras = %s, FechaLimiteRespuesta = %s, HoraLimiteParaResolver = %s, NumeroIntentosDisponibles = %s WHERE IDCuestionario = %s", (id_grupo,tituloCuestionario, fechaCuestionario, autorCuestionario, temasCuestionario, tipoCuestionario, lenguajeCuestionario, ordenCuestionario, tiempoCuentaAtras, fechaLimiteRespuesta, horaLimiteParaResolver, numeroIntentosDisponibles, id_cuestionario))

    conexion.commit()
    conexion.close()
    return confirmacionUpdate

##
## Nos ayuda a eliminar un cuestionario
##
def delete_cuestionarios(id_cuestionario):
    conexion=obtener_conexion()
    confirmacionDeDelete = True

    with conexion.cursor() as cursor:
        cursor.execute("DELETE FROM Cuestionarios WHERE IDCuestionario = %s", (id_cuestionario))

    conexion.commit()
    conexion.close()
    return confirmacionDeDelete

##
## Obtiene los datos de los cuestionarios vinculados a un grupo
##
def contar_IDCuestionario_dentro_de_grupo(id_grupo):
    conexion=obtener_conexion()
    cuestionariosIds=[]

    with conexion.cursor() as cursor:
        cursor.execute("SELECT COUNT(IDCuestionario) FROM Cuestionarios WHERE IDGrupo = %s", (id_grupo))
        cuestionariosIds=cursor.fetchall()

    conexion.close()
    return cuestionariosIds

#Con cuestionarios de un docente
def obtener_cuestionarios_IDS(id_profesor):
    conexion=obtener_conexion()
    IDS_cuestionarios=[]

    with conexion.cursor() as cursor:
        cursor.execute("SELECT IDCuestionario FROM Cuestionarios WHERE IDDocente = %s", (id_profesor))
        IDS_cuestionarios=cursor.fetchall()

    conexion.close()
    return IDS_cuestionarios


# va a servir para meter un JSON en un nuevo cuestionario
def insertar_cuestionario_JSON(id_grupo, id_profesor, tituloCuestionario, fechaCuestionario, autorCuestionario, temasCuestionario, tipoCuestionario, lenguajeCuestionario, archivoCuestionario, ordenCuestionario, tiempoCuentaAtras, fechaLimiteRespuesta, horaLimiteParaResolver,numeroIntentosDisponibles):
    
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("INSERT INTO Cuestionarios(IDGrupo, IDDocente, Titulo, Fecha, Autor, Temas, Tipo, Lenguaje, Preguntas, Orden, TiempoCuentaAtras, FechaLimiteRespuesta, HoraLimiteParaResolver, NumeroIntentosDisponibles) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",
        (id_grupo, id_profesor, tituloCuestionario, fechaCuestionario, autorCuestionario, temasCuestionario, tipoCuestionario, lenguajeCuestionario, archivoCuestionario, ordenCuestionario, tiempoCuentaAtras, fechaLimiteRespuesta, horaLimiteParaResolver, numeroIntentosDisponibles))
    conexion.commit()
    conexion.close()


# Agregar la ruta del preview del cuestionario
def insertar_ruta_preview_cuestionario(id_cuestionario, rutaPreview):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("UPDATE Cuestionarios SET PreviewCuestionarioRuta = %s WHERE IDCuestionario = %s", (rutaPreview, id_cuestionario))
    conexion.commit()
    conexion.close()

####################################Operaciones para los post
#Operacion para la creación de un post
def crearPost(id_docente, tituloPost, descripcionPost, fondoPost):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("INSERT INTO PublicacionesDocente(IDDocente, Titulo, Descripcion, Foto) VALUES(%s,%s,%s,%s)",
        (id_docente, tituloPost, descripcionPost, fondoPost))
    conexion.commit()
    conexion.close()

#Operacion para obtener los post
def obtenerPost(id_docente):
    conexion=obtener_conexion()
    publicaciones=[]

    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM PublicacionesDocente WHERE IDDocente = %s", (id_docente))
        publicaciones=cursor.fetchall()

    conexion.close()
    return publicaciones

#Operacion para obtener los post
def obtenerPostUnitario(id_publicacion):
    conexion=obtener_conexion()
    publicaciones=[]

    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM PublicacionesDocente WHERE IDPublicacionDocente = %s", (id_publicacion))
        publicaciones=cursor.fetchall()

    conexion.close()
    return publicaciones

#Operacion para borrar los post
def deletePost(id_publicacion):
    conexion=obtener_conexion()
    confirmacionDeDelete = True

    with conexion.cursor() as cursor:
        cursor.execute("DELETE FROM PublicacionesDocente WHERE IDPublicacionDocente = %s", (id_publicacion))

    conexion.commit()
    conexion.close()
    return confirmacionDeDelete

#Para editar los post
def updatePost(id_publicacion,tituloPost, descripcionPost, fondoPost):
    conexion=obtener_conexion()
    confirmacionDeDelete = True

    with conexion.cursor() as cursor:
        cursor.execute("UPDATE PublicacionesDocente SET Titulo = %s, Descripcion = %s, Foto = %s WHERE IDPublicacionDocente = %s", (tituloPost, descripcionPost, fondoPost, id_publicacion))

    conexion.commit()
    conexion.close()
    return confirmacionDeDelete

###################Operaciones para las notificaciones del docente a su alumno
def agregarNotificacion_para_alumno(id_alumno, texto, importancia, categoria):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("INSERT INTO Notificaciones_Alumno(IDAlumno, Texto, Importancia, Categoria) VALUES(%s,%s,%s,%s)",
        (id_alumno, texto, importancia, categoria))
    conexion.commit()
    conexion.close()

#Operacion para la creación de un comentario
def obtenerNotificacion_de_profesor(id_docente):
    conexion=obtener_conexion()
    comentarios=[]
    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM Notificaciones_Docente WHERE IDDocente = %s", (id_docente))
        comentarios=cursor.fetchall()
    conexion.close()
    return comentarios

#Operacion para borrar de un comentario
def borrarUnaNotificacionParticular(id_comentario):
    conexion=obtener_conexion()
    comentarios=[]
    with conexion.cursor() as cursor:
        cursor.execute("DELETE FROM Notificaciones_Docente WHERE IDNotificacion_Docente = %s", (id_comentario))
    conexion.commit()
    conexion.close()

#Operacion para eliminar todos los comentarios
def borrarNotificaciones(id_profe):
    conexion=obtener_conexion()
    comentarios=[]
    with conexion.cursor() as cursor:
        cursor.execute("DELETE FROM Notificaciones_Docente WHERE IDDocente = %s", (id_profe))
    conexion.commit()
    conexion.close()

################### Operaciones para las politicas
#Agregar al docente y su respuesta sobre la politica
def agregarResPolitica(id_docente, estado):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("INSERT INTO DocentesPoliticasPrivacidad(IDDocente, Estado) VALUES(%s,%s)",
        (id_docente, estado))
    conexion.commit()
    conexion.close()


def estadoPolitica(id_docente):
    conexion=obtener_conexion()
    politica=[]

    with conexion.cursor() as cursor:
        cursor.execute("SELECT Estado FROM DocentesPoliticasPrivacidad WHERE IDDocente = %s", (id_docente))
        politica=cursor.fetchall()

    conexion.close()
    return politica
    
def actualizarPolitica(id_docente, estado):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("UPDATE DocentesPoliticasPrivacidad SET Estado=%s where IDDocente=%s",(estado,id_docente))
    conexion.commit()
    conexion.close()

##############################################################################
####                                                                      ####
####                   Docente elimina su cuenta                          ####
####                                                                      ####
##############################################################################

def docenteEliminaCuenta(id_docente):
    conexion=obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("DELETE FROM Docentes WHERE IDDocente = %s",(id_docente))
    conexion.commit()
    conexion.close()


#Función para los reportes de grupos-sirve para ver si hay grupos que no tengan cuestionarios resueltos
def grupos_con_cuestionarios_resueltos(id_grupo):
    conexion=obtener_conexion()
    gruposConCuestionariosResueltos = []
    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM Alumnos_hacen_Cuestionario INNER JOIN Cuestionarios ON "+
                       "Alumnos_hacen_Cuestionario.IDCuestionario = Cuestionarios.IDCuestionario"+
                       "WHERE Cuestionarios.IDGrupo =  %s", (id_grupo))
        gruposConCuestionariosResueltos = cursor.fetchall()
    conexion.close()
    return gruposConCuestionariosResueltos
