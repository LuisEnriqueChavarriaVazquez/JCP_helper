from itsdangerous import URLSafeTimedSerializer

secret_key_provisional= "secret_key"
security_password_salt = "my_precious_two"

def generate_confirmation_token(email):
    #serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])
    serializer = URLSafeTimedSerializer(secret_key_provisional)
    #return serializer.dumps(email, salt=app.config['SECURITY_PASSWORD_SALT'])
    return serializer.dumps(email, salt=security_password_salt)



def confirm_token(token, expiration=3600):
    #serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])
    serializer = URLSafeTimedSerializer(secret_key_provisional)
    try:
        email = serializer.loads(
            token,
            #salt=app.config['SECURITY_PASSWORD_SALT'],
            salt = security_password_salt ,
            max_age=expiration
        )
    except:
        return False
    return email