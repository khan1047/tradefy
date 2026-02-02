from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from database import get_db
from models.user import User
from core.security import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/auth")


class AuthSchema(BaseModel):
    email: str
    password: str


@router.post("/signup")
def signup(data: AuthSchema, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    user = User(
        email=data.email,
        password_hash=hash_password(data.password)
    )

    db.add(user)
    db.commit()

    return {"status": "created"}


@router.post("/login")
def login(data: AuthSchema, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()

    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"user_id": user.id})
    return {
        "access_token": token,
        "token_type": "bearer"
    }

from fastapi import Depends
from core.dependencies import get_current_user
from models.user import User

@router.get("/me")
def get_me(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "email": current_user.email
    }
