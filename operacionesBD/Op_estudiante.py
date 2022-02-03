from operacionesBD.conexion import obtener_conexion

def insertar_estudiante(nombre, apellidos,email,password, edad,grupo):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("INSERT INTO estudiantes(nombre, apellidos,email,password, edad,grupo) VALUES (%s, %s, %s,%s,%s,%s)",
        (nombre, apellidos,email,password, edad,grupo))
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