import pymysql

def obtener_conexion():
    #Conexion para heroku
    return pymysql.connect(host='qvti2nukhfiig51b.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',user='etiaob16vzbuo4cu',password='n8zzmlh5wda1ihbk',db='l5l3jax1eg8p2sg0')
    #return pymysql.connect(host='localhost',user='root',password='',db='jcp_helper_db')