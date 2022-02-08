from flask import render_template
from . import routes
from operacionesBD import Op_estudiante

@routes.route('/nuevo_est')
def signup_Est():
    return render_template('estudiante/signup_est.html')

