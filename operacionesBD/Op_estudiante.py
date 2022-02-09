from operacionesBD.conexion import obtener_conexion

def insertar_estudiante(nombre,alias,foto,correo,password,es_proc,grupo,desc_alum,area_esp_a,correoA,linkedinA,facebookA,instagramA,vkA,telefonoA):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("INSERT INTO alumnos(nombreA,aliasA,fotoA,correoA,passwordA,es_proc,grupo,desc_alum,area_esp_a,correoA_alt,linkedinA,facebookA,instagramA,vkA,telefonoA) VALUES(%s, %s, %s,%s,%s,%s, %s, %s,%s,%s,%s, %s, %s,%s,%s)",
        (nombre,alias,foto,correo,password,es_proc,grupo,desc_alum,area_esp_a,correoA,linkedinA,facebookA,instagramA,vkA,telefonoA))
    conexion.commit()
    conexion.close()


def obtener_estudiantes():
    conexion = obtener_conexion()
    estudiantes = []
    with conexion.cursor() as cursor:
        cursor.execute("SELECT id, nombre, apellidos,email, edad,grupo FROM estudiantes")
        estudiantes = cursor.fetchall()
    conexion.close()
    return estudiantes


def eliminar_estudiante(id):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("DELETE FROM estudiantes WHERE id = %s", (id,))
    conexion.commit()
    conexion.close()


def obtener_estudiante_por_id(id):
    conexion = obtener_conexion()
    estudiante = None
    with conexion.cursor() as cursor:
        cursor.execute(
            "SELECT id, nombre, apellidos, edad FROM estudiantes WHERE id = %s", (id,))
        estudiante = cursor.fetchone()
    conexion.close()
    return estudiante


def actualizar_estudiante(nombre, apellidos, edad,grupo, id):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("UPDATE estudiantes SET nombre = %s, apellidos = %s, edad = %s, grupo=%s WHERE id = %s",
        (nombre, apellidos, edad,grupo, id))
    conexion.commit()
    conexion.close()