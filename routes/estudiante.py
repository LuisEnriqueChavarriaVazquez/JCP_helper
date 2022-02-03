from flask import render_template
from . import routes
from operacionesBD import Op_estudiante

@routes.route('/nuevo_est')
def login_Est():
    return render_template('estudiante/login_est.html')