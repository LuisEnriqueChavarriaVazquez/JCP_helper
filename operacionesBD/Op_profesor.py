from operacionesBD.conexion import obtener_conexion

def insertar_profesor(nombre,alias,foto,correo,contra,unidad_academica,descripcion):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("INSERT INTO docentes(Nombre,Alias,Foto,correo,contra,unidad_academica,descripcion) VALUES(%s,%s,%s,%s,%s,%s,%s)",
        (nombre,alias,foto,correo,contra,unidad_academica,descripcion))
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

    with conexion.cursor() as cursor:
        cursor.execute("SELECT IDDocente FROM docentes WHERE correo = %s", (correo))
        profesores_id=cursor.fetchone()
    id_profesor = ''.join(str(profesores_id[0]))
    conexion.close()
    return id_profesor

def login_prof(correo):
    conexion = obtener_conexion()
    profesor = None
    with conexion.cursor() as cursor:
        cursor.execute("SELECT*FROM docentes WHERE correo = %s", (correo))
        profesor = cursor.fetchone()
    conexion.close()
    return profesor

def insertar_grupo(id_profesor, nombreGrupo,descGrupo,fondoGrupo,codigoGrupo,lenguajesGrupo,temasGrupo):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("INSERT INTO grupos(IDDocente,Nombre,Descripcion,Fondo,Codigo,Lenguajes,Temas) VALUES(%s,%s,%s,%s,%s,%s,%s)",
        (id_profesor, nombreGrupo,descGrupo,fondoGrupo,codigoGrupo,temasGrupo,lenguajesGrupo))
    conexion.commit()
    conexion.close()