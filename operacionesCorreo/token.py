from itsdangerous import URLSafeTimedSerializer
from flask import current_app


def generate_confirmation_token(email):
    serializer = URLSafeTimedSerializer('1234')
    return serializer.dumps(email, salt=current_app.config['SECURITY_PASSWORD_SALT'])
    



def confirm_token(token, expiration=3600):
    
    serializer = URLSafeTimedSerializer('1234')
    try:
        email = serializer.loads(
            token,
            salt=current_app.config['SECURITY_PASSWORD_SALT'],
            max_age=expiration
        )
    except:
        return False
    return email