from operacionesBD.conexion import obtener_conexion

def insertar_profesor(nombre,alias,foto,correo,password,correoAlt,linkedin,facebook,instagram,vk,telefono,unidad_ac,desc_perfil):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("INSERT INTO profesores(nombreP,aliasP,fotoP,correoP,passwordP,correoP_alt,linkedinP,facebookP,instagramP,vkP,telefonoP,unidad_ac,desc_perfil_p) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",
        (nombre,alias,foto,correo,password,correoAlt,linkedin,facebook,instagram,vk,telefono,unidad_ac,desc_perfil))
    conexion.commit()
    conexion.close()

def obtener_profesores():
    conexion=obtener_conexion()
    profesores=[]

    with conexion.cursor() as cursor:
        cursor.execute("SELECT*FROM profesores")
        profesores=cursor.fetchall()
    conexion.close()
    return profesores