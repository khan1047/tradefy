from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer
from jose import jwt, JWTError
from database.db import get_db
from models.user import User

SECRET = "TRADEFY_SUPER_SECRET_KEY"
security = HTTPBearer()

def get_current_user(token: str = Depends(security), db=Depends(get_db)):
    try:
        decoded = jwt.decode(token.credentials, SECRET, algorithms=["HS256"])
        user_id = decoded.get("user_id")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
