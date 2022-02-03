from flask import render_template
from . import routes


@routes.route('/nuevo_prof')
def login_Prof():
    return render_template('profesor/login_prof.html')