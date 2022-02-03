from flask import render_template
from . import routes
from operacionesBD import Op_estudiante

@routes.route('/nuevo_est')
def nuevoEstudiante():
    return render_template('/algo.html')