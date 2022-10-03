from operacionesBD.conexion import obtener_conexion

def insertar_profesor(nombre,alias,foto,correo,contra,unidad_academica,descripcion,fondo):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("INSERT INTO docentes(Nombre,Alias,Foto,correo,contra,unidad_academica,descripcion,fondo) VALUES(%s,%s,%s,%s,%s,%s,%s,%s)",
        (nombre,alias,foto,correo,contra,unidad_academica,descripcion,fondo))
    conexion.commit()
    conexion.close()

def obtener_profesores():
    conexion=obtener_conexion()
    profesores=[]

    with conexion.cursor() as cursor:
        cursor.execute("SELECT*FROM docentes")
        profesores=cursor.fetchall()
    conexion.close()
    return profesores

def obtener_profesores_id(correo):
    conexion=obtener_conexion()
    profesores_id=[]
    id_profesor = ""

    with conexion.cursor() as cursor:
        cursor.execute("SELECT IDDocente FROM docentes WHERE correo = %s", (correo))
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
        cursor.execute("SELECT * FROM grupos WHERE IDDocente = %s", (id_profesor))
        grupos=cursor.fetchall()

    conexion.close()
    return grupos

def obtener_grupos_IDS(id_profesor):
    conexion=obtener_conexion()
    grupos=[]

    with conexion.cursor() as cursor:
        cursor.execute("SELECT IDGrupo FROM grupos WHERE IDDocente = %s", (id_profesor))
        grupos=cursor.fetchall()

    conexion.close()
    return grupos

def obtener_alumnos_con_profesor_IDS(id_profesor):
    conexion=obtener_conexion()
    alumnosIds=[]

    with conexion.cursor() as cursor:
        cursor.execute("SELECT IDAlumno FROM grupos_alumnos WHERE IDDocente = %s", (id_profesor))
        alumnosIds=cursor.fetchall()

    conexion.close()
    return alumnosIds

#Lo mismo pero con IDGrupo (un grupo en concreto)
def obtener_grupo_datos_importantes_unitario(id_grupo):
    conexion=obtener_conexion()
    grupos=[]

    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM grupos WHERE IDGrupo = %s", (id_grupo))
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
        cursor.execute("SELECT codigo FROM grupos WHERE IDDocente = %s", (id_profesor))
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
        cursor.execute("DELETE from grupos WHERE IDGrupo = %s", (id_grupo))

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
        cursor.execute("UPDATE grupos SET nombre = %s, descripcion = %s, fondo = %s, lenguajes = %s, temas = %s WHERE IDGrupo = %s", (nombreGrupo, descGrupo, fondoGrupo, lenguajesGrupo, temasGrupo, id_grupo))

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
        cursor.execute("UPDATE docentes SET fondo = %s WHERE IDDocente = %s", (fondo, id_docente))

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
        cursor.execute("SELECT IDAlumno FROM grupos_alumnos WHERE IDGrupo = %s", (id_grupo))
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
        cursor.execute("SELECT COUNT(IDAlumno) FROM grupos_alumnos WHERE IDGrupo = %s", (id_grupo))
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
        cursor.execute("SELECT*FROM alumnos WHERE IDAlumno = %s", (IDAlumno))
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
        cursor.execute("SELECT*FROM docentes WHERE correo = %s", (correo))
        profesor = cursor.fetchone()
    conexion.close()
    return profesor


############################EDICION DE PERFIL######################################
##
## Nos ayuda a subir los cambios del perfil del docente
##

def update_docente_perfil(id_docente,nombreUsuario,aliasUsuario,unidadAcademica,descUser):
    conexion=obtener_conexion()
    confirmacion = True

    with conexion.cursor() as cursor:
        cursor.execute("UPDATE docentes SET nombre = %s, alias = %s, unidad_academica = %s, descripcion = %s WHERE IDDocente = %s", (nombreUsuario, aliasUsuario, unidadAcademica, descUser, id_docente))

    conexion.commit()
    conexion.close()
    return confirmacion

def update_docente_perfil_foto(id_docente, foto):
    conexion=obtener_conexion()
    confirmacion = True

    with conexion.cursor() as cursor:
        cursor.execute("UPDATE docentes SET foto = %s WHERE IDDocente = %s", (foto, id_docente))

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
        cursor.execute("UPDATE docentes SET nombre = %s, alias = %s, unidad_academica = %s, descripcion = %s, contra = %s WHERE IDDocente = %s", (nombreUsuario, aliasUsuario, unidadAcademica, descUser, hashed, id_docente))

    conexion.commit()
    conexion.close()
    return confirmacion
#####################################################################

# va a servir para el perfil del docente
def datos_completos_docente_by_id(IDDocente):
    conexion = obtener_conexion()
    datosProfesor = None
    with conexion.cursor() as cursor:
        cursor.execute("SELECT*FROM docentes WHERE IDDocente = %s", (IDDocente))
        datosProfesor = cursor.fetchone()
    conexion.close()
    return datosProfesor

def insertar_grupo(id_profesor, nombreGrupo,descGrupo,fondoGrupo,codigoGrupo,lenguajesGrupo,temasGrupo):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("INSERT INTO grupos(IDDocente,Nombre,Descripcion,Fondo,Codigo,Lenguajes,Temas) VALUES(%s,%s,%s,%s,%s,%s,%s)",
        (id_profesor, nombreGrupo,descGrupo,fondoGrupo,codigoGrupo,temasGrupo,lenguajesGrupo))
    conexion.commit()
    conexion.close()