from flask import Flask
from flask_mysqldb import MySQL

app = Flask(__name__)

#Conexión con la base de datos
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'password'
app.config['MYSQL_DB'] = 'jcp_helper'
mysql = MySQL(app)


#Nos envia a la ruta principal de bienvenida
@app.route('/')
def Index():
    return "Default"

#Nota, con esta estructura base pueden crear nuevas rutas
#Para el LOG IN
@app.route('/log_in')
def log_in():
    return "log_in"

#Para el SING UP
@app.route('/sign_up')
def sign_up():
    return "sign_up"

#Indicamos el puerto en que trabajaremos y que
#estaremos en modo de debug
if __name__ == '__main__':
    app.run(port = 3000, debug = True)

