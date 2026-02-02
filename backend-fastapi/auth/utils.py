from passlib.context import CryptContext
from jose import jwt
import datetime

# Use Argon2 instead of bcrypt (bcrypt is broken in your docker env)
pwd = CryptContext(schemes=["argon2"], deprecated="auto")

SECRET = "TRADEFY_SUPER_SECRET_KEY"

def hash_password(password: str):
    return pwd.hash(password)

def verify_password(password: str, hashed: str):
    return pwd.verify(password, hashed)

def create_token(data: dict):
    payload = data.copy()
    payload["exp"] = datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    return jwt.encode(payload, SECRET, algorithm="HS256")
