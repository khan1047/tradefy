from jose import JWTError, jwt

# MUST match the secret used when creating tokens
SECRET_KEY = "CHANGE_THIS_SECRET"
ALGORITHM = "HS256"

def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
