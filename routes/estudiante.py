from flask import render_template
from . import routes
from operacionesBD import Op_estudiante

@routes.route('/signup_est')
def signup_Est():
    return render_template('estudiante/signup_est.html')

##Pagina de bienvenida
@routes.route('/bienvenidaEstudiante')
def bienvenidaEstudiante():
    return render_template('profesor/bienvenidaEstudiante.html')

