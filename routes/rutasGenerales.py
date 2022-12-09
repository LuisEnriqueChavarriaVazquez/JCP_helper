from flask import render_template
from . import routes



#Este sirve para recibir al usuario
@routes.route('/login_general')
def login_general():
    return render_template('login_general.html')

#Este nos sirve para acceder a una pequeña sección de guia para el usuario
#No es exactamente un manual, simplemente es una página con información general
@routes.route('/saber_mas')
def saber_mas():
    return render_template('general/saber_mas.html')

#Terminos y condiciones
@routes.route('/terminos_condiciones')
def terminos_condiciones():
    return render_template('general/terminos_condiciones.html')

#Politicas
@routes.route('/politica_cookies')
def politica_cookies():
    return render_template('general/politica_cookies.html')

@routes.route('/politica_privacidad')
def politica_privacidad():
    return render_template('general/politica_privacidad.html')

#Ayuda
@routes.route('/ayuda')
def ayuda():
    return render_template('general/ayuda.html')


#recuperarContra
@routes.route('/recuperarContra')
def recuperarContra():
    return render_template('/recuperarContra.html')