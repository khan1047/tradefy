from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models.category import Category

router = APIRouter(prefix="/categories", tags=["Categories"])


@router.get("/")
def get_categories(db: Session = Depends(get_db)):
    categories = db.query(Category).all()
    return [{"id": c.id, "name": c.name} for c in categories]
