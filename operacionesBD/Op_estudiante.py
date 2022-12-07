from operacionesBD.conexion import obtener_conexion

def insertar_estudiante(nombre,alias,foto,correo,contra,area,escuela,descripcion,fondo):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("INSERT INTO alumnos(Nombre,Alias,Foto,correo,contra,area,escuela,descripcion,fondo) VALUES(%s, %s, %s,%s,%s,%s, %s, %s, %s)",
        (nombre,alias,foto,correo,contra,area,escuela,descripcion,fondo))
    conexion.commit()
    conexion.close()


def obtener_estudiantes():
    conexion = obtener_conexion()
    estudiantes = []
    with conexion.cursor() as cursor:
        cursor.execute("SELECT*FROM alumnos")
        estudiantes = cursor.fetchall()
    conexion.close()
    return estudiantes


def eliminar_estudiante(id):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("DELETE FROM alumnos WHERE IDAlumno = %s", (id))
    conexion.commit()
    conexion.close()

def salir_de_grupo(id_docente, id_grupo ,id_estudiante):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("DELETE FROM grupos_alumnos WHERE IDDocente = %s and IDGrupo = %s and IDAlumno = %s", (id_docente, id_grupo ,id_estudiante))
    conexion.commit()
    conexion.close()


def login_est(correo):
    conexion = obtener_conexion()
    estudiante = None
    with conexion.cursor() as cursor:
        cursor.execute("SELECT*FROM alumnos WHERE correo = %s", (correo))
        estudiante = cursor.fetchone()
    conexion.close()
    return estudiante

############################EDICION DE PERFIL######################################
##
## Nos ayuda a subir los cambios del perfil del alumno
##

def update_alumno_perfil(id_alumno,nombreUsuario,aliasUsuario, area, escuela, descUser):
    conexion=obtener_conexion()
    confirmacion = True

    with conexion.cursor() as cursor:
        cursor.execute("UPDATE alumnos SET nombre = %s, alias = %s, area = %s, escuela = %s, descripcion = %s WHERE IDAlumno = %s", (nombreUsuario, aliasUsuario, area, escuela, descUser, id_alumno))

    conexion.commit()
    conexion.close()
    return confirmacion

def update_alumno_perfil_foto(id_alumno, foto):
    conexion=obtener_conexion()
    confirmacion = True

    with conexion.cursor() as cursor:
        cursor.execute("UPDATE alumnos SET foto = %s WHERE IDAlumno = %s", (foto, id_alumno))

    conexion.commit()
    conexion.close()
    return confirmacion


##
## Nos ayuda a subir los cambios del perfil del alumno CON PASSWORD INCLUIDO
##

def update_alumno_perfil_con_password(id_alumno,nombreUsuario,aliasUsuario, area, escuela, descUser, hashed):
    conexion=obtener_conexion()
    confirmacion = True

    with conexion.cursor() as cursor:
        cursor.execute("UPDATE alumnos SET nombre = %s, alias = %s, area = %s, escuela = %s, descripcion = %s, contra = %s WHERE IDAlumno = %s", (nombreUsuario, aliasUsuario, area, escuela, descUser, hashed, id_alumno))

    conexion.commit()
    conexion.close()
    return confirmacion
#####################################################################


# va a servir para el perfil del alumno
def datos_completos_alumno_by_id(IDAlumno):
    conexion = obtener_conexion()
    datosAlumnos = None
    with conexion.cursor() as cursor:
        cursor.execute("SELECT*FROM alumnos WHERE IDAlumno = %s", (IDAlumno))
        datosAlumnos = cursor.fetchone()
    conexion.close()
    return datosAlumnos

# va a servir para el perfil del alumno
def datos_completos_cuestionario_by_id_estudiante(IDCuestionario):
    conexion = obtener_conexion()
    datosAlumnos = None
    with conexion.cursor() as cursor:
        cursor.execute("SELECT*FROM cuestionarios WHERE IDCuestionario = %s", (IDCuestionario))
        datosAlumnos = cursor.fetchone()
    conexion.close()
    return datosAlumnos

# Obtiene los datos del grupo con su código
#Lo mismo pero con IDGrupo (un grupo en concreto)
def obtener_grupo_datos_importantes_unitario(codigo_grupo):
    conexion=obtener_conexion()
    grupos=[]

    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM grupos WHERE codigo = %s", (codigo_grupo))
        grupos=cursor.fetchone()

    conexion.close()
    return grupos

def obtener_grupo_datos_importantes_id(id_grupo):
    conexion=obtener_conexion()
    grupos=[]

    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM grupos WHERE IDgrupo = %s", (id_grupo))
        grupos=cursor.fetchone()

    conexion.close()
    return grupos

#Insertar alumnos en grupos una vez que aceptan
def insertar_estudiante_grupo( id_docente, id_grupo, id_estudiante):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("INSERT INTO Grupos_Alumnos (IDDocente, IDGrupo, IDAlumno) VALUES(%s, %s, %s)",
        (id_docente, id_grupo, id_estudiante))
    conexion.commit()
    conexion.close()
    return "listo"

#Obtiene los IDDocente y IDGrupo con el IDALUMNO
##
## Obtiene los datos de los estudiantes vinculados a un grupo
##
def obtener_IDs_dentro_de_grupo(id_alumno):
    conexion=obtener_conexion()
    idsObtenidos=[]

    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM grupos_alumnos WHERE IDAlumno = %s", (id_alumno))
        idsObtenidos=cursor.fetchall()

    conexion.close()
    return idsObtenidos

def obtener_IDs_dentro_de_grupo_con_grupo(id_grupo):
    conexion=obtener_conexion()
    idsObtenidos=[]

    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM grupos_alumnos WHERE IDGrupo = %s", (id_grupo))
        idsObtenidos=cursor.fetchall()

    conexion.close()
    return idsObtenidos

##
## Nos ayuda a registrar acceso a cuestionario
##

def insertar_primera_vez_cuestionario(idCuestionarioHecho, id_cuestionario, id_estudiante, caducidad_cuestionario, revision_estado, intentos):
    conexion = obtener_conexion()
    pendingState = "pending"
    with conexion.cursor() as cursor:
        cursor.execute("INSERT INTO Alumnos_hacen_Cuestionario (IDCuestionarioHecho, IDCuestionario, IDAlumno, Caducidad_cuestionario, Revision_estado,Numero_intentos, Aprobacion_estado, Promedio_general, Puntaje_general, Puntaje_segmentado) VALUES(%s,%s, %s, %s, %s, %s, %s, %s, %s, %s)",
        (idCuestionarioHecho, id_cuestionario, id_estudiante,caducidad_cuestionario, revision_estado, intentos, pendingState, pendingState, pendingState, pendingState))
    conexion.commit()
    conexion.close()
    return "listo"

##
## Nos ayuda a registrar la ruta del archivo de respuestas
## Nos ayuda a registrar el tiempo que tardo el usuario en contestar
##

def insertar_data_cuestinario_respondido(idCuestionarioHecho, tiempo_respuestas, ruta_resultados, retraso_estado):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("UPDATE Alumnos_hacen_Cuestionario SET Tiempo_respuestas = %s, Ruta_resultados = %s, Retraso_estado = %s WHERE IDCuestionarioHecho = %s",
        (tiempo_respuestas, ruta_resultados,retraso_estado,idCuestionarioHecho))
    conexion.commit()
    conexion.close()
    return "listo"

def insertar_data_cuestinario_revisado(idCuestionarioHecho, revisionEstado,aprovacionEstado,promedioGeneral,puntajeGeneral,puntajeSegmentado):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("UPDATE Alumnos_hacen_Cuestionario SET Revision_estado = %s, Aprobacion_estado = %s, Promedio_general = %s, Puntaje_general = %s, Puntaje_segmentado = %s WHERE IDCuestionarioHecho = %s",
        (revisionEstado, aprovacionEstado, promedioGeneral, puntajeGeneral, puntajeSegmentado, idCuestionarioHecho))
    conexion.commit()
    conexion.close()
    return "listo"

##
## Nos ayuda a sumar intentos
##

def update_intentos_hacer_cuestionario(intentos, idCuestionarioHecho):
    conexion=obtener_conexion()
    confirmacion = True

    with conexion.cursor() as cursor:
        cursor.execute("UPDATE Alumnos_hacen_Cuestionario SET Numero_intentos = %s WHERE IDCuestionarioHecho = %s", (intentos, idCuestionarioHecho));

    conexion.commit()
    conexion.close()
    return confirmacion

##
## Nos ayuda a obtener los cuestionarios que han sido contestados
##
#Operacion para obtener los post
def obtener_hacer_cuestionario(id_cuestionario, id_alumno, caducidad):
    conexion=obtener_conexion()
    cuestionarioHechoData=[]

    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM Alumnos_hacen_Cuestionario WHERE IDCuestionario = %s AND IDAlumno = %s AND Caducidad_cuestionario = %s", (id_cuestionario, id_alumno, caducidad))
        cuestionarioHechoData=cursor.fetchall()
    
    if len(cuestionarioHechoData) != 0:
        conexion.close()
        return cuestionarioHechoData
    else:
        return "noData"

#Operacion para obtener los post
def obtener_hacer_cuestionario_idCuestionarioHecho(id_cuestionario):
    conexion=obtener_conexion()
    cuestionarioHechoData=[]

    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM Alumnos_hacen_Cuestionario WHERE IDCuestionarioHecho  = %s", (id_cuestionario))
        cuestionarioHechoData=cursor.fetchall()

    return cuestionarioHechoData

##
## Nos ayuda a modificar el fondo del alumno
##

def update_fondo_alumno(fondo, id_alumno):
    conexion=obtener_conexion()
    confirmacionDeDelete = True

    with conexion.cursor() as cursor:
        cursor.execute("UPDATE alumnos SET fondo = %s WHERE IDAlumno = %s", (fondo, id_alumno))

    conexion.commit()
    conexion.close()
    return confirmacionDeDelete

#pendiente

# def actualizar_estudiante(nombre, apellidos, edad,grupo, id):
#     conexion = obtener_conexion()
#     with conexion.cursor() as cursor:
#         cursor.execute("UPDATE estudiantes SET nombre = %s, apellidos = %s, edad = %s, grupo=%s WHERE id = %s",
#         (nombre, apellidos, edad,grupo, id))
#     conexion.commit()
#     conexion.close()

####################################Operaciones para los post
#Operacion para la creación de un post
def crearPost(id_alumno, tituloPost, descripcionPost, fondoPost):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("INSERT INTO PublicacionesAlumno(IDAlumno, Titulo, Descripcion, Foto) VALUES(%s,%s,%s,%s)",
        (id_alumno, tituloPost, descripcionPost, fondoPost))
    conexion.commit()
    conexion.close()

#Operacion para obtener los post
def obtenerPost(id_alumno):
    conexion=obtener_conexion()
    publicaciones=[]

    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM PublicacionesAlumno WHERE IDAlumno = %s", (id_alumno))
        publicaciones=cursor.fetchall()

    conexion.close()
    return publicaciones

#Operacion para obtener los post
def obtenerPostUnitario(id_publicacion):
    conexion=obtener_conexion()
    publicaciones=[]

    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM PublicacionesAlumno WHERE IDPublicacionAlumno = %s", (id_publicacion))
        publicaciones=cursor.fetchall()

    conexion.close()
    return publicaciones

#Operacion para borrar los post
def deletePost(id_publicacion):
    conexion=obtener_conexion()
    confirmacionDeDelete = True

    with conexion.cursor() as cursor:
        cursor.execute("DELETE from PublicacionesAlumno WHERE IDPublicacionAlumno = %s", (id_publicacion))

    conexion.commit()
    conexion.close()
    return confirmacionDeDelete

#Para editar los post
def updatePost(id_publicacion,tituloPost, descripcionPost, fondoPost):
    conexion=obtener_conexion()
    confirmacionDeDelete = True

    with conexion.cursor() as cursor:
        cursor.execute("UPDATE PublicacionesAlumno SET titulo = %s, descripcion = %s, foto = %s WHERE IDPublicacionAlumno = %s", (tituloPost, descripcionPost, fondoPost, id_publicacion))

    conexion.commit()
    conexion.close()
    return confirmacionDeDelete


#Obtener cuestionarios realizados por un alumno
def obtener_cuestionarios_alumnos(idAlumno):
    conexion=obtener_conexion()
    cuestionariosHechos=[]

    with conexion.cursor() as cursor:
        cursor.execute("SELECT Alumnos_hacen_Cuestionario.IDCuestionarioHecho, Cuestionarios.IDCuestionario, Cuestionarios.Titulo"+
        " FROM Alumnos_hacen_Cuestionario INNER JOIN Cuestionarios"+
         " ON Alumnos_hacen_Cuestionario.IDCuestionario = Cuestionarios.IDCuestionario"+
         " WHERE Alumnos_hacen_Cuestionario.IDAlumno = %s AND  "+
        "Alumnos_hacen_Cuestionario.Revision_estado = 'ready'  ", (idAlumno))
        cuestionarioHechoData=cursor.fetchall()
    
    if len(cuestionarioHechoData) != 0:
        conexion.close()
        return cuestionarioHechoData
    else:
        return "noData"

#Obtener cuestionarios realizados por un alumno
def obtener_cuestionarios_alumnos_all_data(idAlumno):
    conexion=obtener_conexion()
    cuestionariosHechos=[]

    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM Alumnos_hacen_Cuestionario WHERE IDAlumno = %s",(idAlumno))
        cuestionarioHechoData=cursor.fetchall()
    
    if len(cuestionarioHechoData) != 0:
        conexion.close()
        return cuestionarioHechoData
    else:
        return "noData"


#Recuperar ruta archivo de respuesta de un alumno
def ruta_archivo_respuesta_alumno(id_cuestionario_respuesta):
    conexion=obtener_conexion()
    registro_cuestionario =""
    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM Alumnos_hacen_Cuestionario WHERE IDCuestionarioHecho = %s",(id_cuestionario_respuesta))
        registro_cuestionario = cursor.fetchone()
    return registro_cuestionario

####################################Operaciones para los comentarios de retroalimentacion
#Operacion para la creación de un comentario
def creaComentarioRetroalimentacion(id_grupo, id_alumno, comentario):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("INSERT INTO ComentariosRetroalimentacion(IDGrupo, IDAlumno, Comentario) VALUES(%s,%s,%s)",
        (id_grupo, id_alumno, comentario))
    conexion.commit()
    conexion.close()

#Operacion para la creación de un comentario
def obtieneComentarioRetroalimentacion(id_grupo):
    conexion=obtener_conexion()
    comentarios=[]

    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM ComentariosRetroalimentacion WHERE IDGrupo = %s", (id_grupo))
        comentarios=cursor.fetchall()

    conexion.close()
    return comentarios

###################Operaciones para las notificaciones del docente a su alumno
def agregarNotificacion_para_profesor(id_docente, texto, importancia, categoria):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("INSERT INTO Notificaciones_Docente(IDDocente, Texto, Importancia, Categoria) VALUES(%s,%s,%s,%s)",
        (id_docente, texto, importancia, categoria))
    conexion.commit()
    conexion.close()


##############################################################################
####                                                                      ####
####                Estudiante elimina su cuenta                          ####
####                                                                      ####
##############################################################################

def alumnoEliminaCuenta(id_alumno):
    conexion=obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("DELETE from Alumnos WHERE IDAlumno = %s",(id_alumno))
    conexion.commit()
    conexion.close()