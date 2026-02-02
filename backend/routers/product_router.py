from fastapi import APIRouter, Depends, Body
from sqlalchemy.orm import Session
from database import get_db
from models.product import Product
from models.product_image import ProductImage
from core.dependencies import get_current_user
from models.user import User
from fastapi import Query
from sqlalchemy import or_

router = APIRouter(prefix="/products", tags=["Products"])

@router.post("/")
def create_product(
    data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    p = Product(
        title=data["title"],
        price=data["price"],
        seller_id=current_user.id,
        category_id=data.get("category_id")
    )

    db.add(p)
    db.commit()
    db.refresh(p)

    for url in data.get("image_urls", []):
        img = ProductImage(url=url, product_id=p.id)
        db.add(img)

    db.commit()

    return {
        "status": "created",
        "id": p.id
    }

@router.get("/")
def get_products(
    search: str | None = Query(default=None),
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=10, ge=1, le=50),
    db: Session = Depends(get_db)
):
    print("GET /products called", search, page, limit)
    query = db.query(Product)

    # 🔍 Search by title
    if search:
        query = query.filter(Product.title.ilike(f"%{search}%"))

    total = query.count()

    products = (
        query
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )

    return {
        "items": [
            {
                "id": p.id,
                "title": p.title,
                "price": p.price,
                "seller": {
                    "id": p.seller.id,
                    "email": p.seller.email
                },
                "category": (
               {
        "id": p.category.id,
        "name": p.category.name
    }
    if p.category
    else None
)
            }
            for p in products
        ],
        "page": page,
        "limit": limit,
        "total": total
    }

@router.get("/{product_id}")
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()

    if not product:
        return {"error": "Product not found"}

    return {
        "id": product.id,
        "title": product.title,
        "price": product.price,
        "seller": {
            "id": product.seller.id,
            "email": product.seller.email
        },
        "images": [
            {"url": img.url} for img in product.images
        ],
        "category": (
            {
                "id": product.category.id,
                "name": product.category.name
            }
            if product.category
            else None
        )
    }

@router.put("/{product_id}")
def update_product(
    product_id: int,
    data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    product = db.query(Product).filter(Product.id == product_id).first()

    if not product:
        return {"error": "Product not found"}

    if product.seller_id != current_user.id:
        return {"error": "You are not allowed to update this product"}

    # TEMP: no ownership check yet
    product.title = data.get("title", product.title)
    product.price = data.get("price", product.price)

    db.commit()
    db.refresh(product)

    return {
        "status": "updated",
        "id": product.id
    }

@router.delete("/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    product = db.query(Product).filter(Product.id == product_id).first()

    if not product:
        return {"error": "Product not found"}

    if product.seller_id != current_user.id:
        return {"error": "You are not allowed to delete this product"}

    db.delete(product)
    db.commit()

    return {"status": "deleted"}
