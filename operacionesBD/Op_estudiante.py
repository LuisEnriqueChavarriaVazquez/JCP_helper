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