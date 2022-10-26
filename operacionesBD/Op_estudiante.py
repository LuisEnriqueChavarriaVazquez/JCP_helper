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

##
## Nos ayuda a registrar acceso a cuestionario
##

def insertar_primera_vez_cuestionario( id_cuestionario, id_estudiante, revision_estado, numero_intentos):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("INSERT INTO Alumnos_hacen_Cuestionario (IDCuestionario, IDAlumno, Revision_estado, Numero_intentos) VALUES(%s, %s, %s, %s)",
        (id_cuestionario, id_estudiante, revision_estado, numero_intentos))
    conexion.commit()
    conexion.close()
    return "listo"

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