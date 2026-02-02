from fastapi import APIRouter, Depends, Form
from sqlalchemy.orm import Session

from ..database.database import get_db
from models.product import Product
from models.product_image import ProductImage

router = APIRouter(prefix="/products")

@router.post("/create")
def create_product(
    title: str = Form(...),
    description: str = Form(...),
    price: str = Form(...),
    category: str = Form(...),
    owner: str = Form(...),
    image_urls: str = Form(...),
    db: Session = Depends(get_db),
):
    product = Product(
        title=title,
        description=description,
        price=price,
        category=category,
        owner=owner,
    )
    db.add(product)
    db.commit()
    db.refresh(product)

    for url in image_urls.split(","):
        db.add(ProductImage(url=url.strip(), product_id=product.id))

    db.commit()
    return {"message": "Product created"}

@router.get("/all")
def get_all_products(db: Session = Depends(get_db)):
    products = db.query(Product).all()
    result = []

    for p in products:
        result.append({
            "id": p.id,
            "title": p.title,
            "description": p.description,
            "price": p.price,
            "category": p.category,
            "owner": p.owner,
            "images": [img.url for img in p.images],
        })

    return result
