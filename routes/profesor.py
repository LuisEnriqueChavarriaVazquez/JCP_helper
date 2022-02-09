from flask import render_template
from . import routes


@routes.route('/signup_prof')
def signup_Prof():
    return render_template('profesor/signup_prof.html')

##Pagina de bienvenida
@routes.route('/bienvenidaProfesor')
def bienvenidaProfesor():
    return render_template('profesor/bienvenidaProfesor.html')