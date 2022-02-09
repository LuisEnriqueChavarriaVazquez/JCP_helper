from flask import Blueprint
routes = Blueprint('routes', __name__)

from .estudiante import *
from .profesor import *
from .rutasGenerales import *
from .configuraciones import *