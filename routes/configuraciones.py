from flask import render_template
from . import routes

#Ponemos la ruta para el archivo de las configuraciones.
@routes.route('/configuraciones')
def configuraciones():
    return render_template('configuraciones.html')