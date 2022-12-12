import pymysql
import os

def obtener_conexion():
    #Conexion para railway

    ##Amigos lo cambie temporalmente para hacer pruebas en mi PC
    
    #return pymysql.connect(host=os.environ["MYSQLHOST"],user=os.environ["MYSQLUSER"],password=os.environ["MYSQLPASSWORD"],db=os.environ["MYSQLDATABASE"],port=7722)
    return pymysql.connect(host='localhost',user='root',password='',db='jcp_helper_db')