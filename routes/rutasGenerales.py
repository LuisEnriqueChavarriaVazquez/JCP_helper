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
    return render_template('saber_mas.html')