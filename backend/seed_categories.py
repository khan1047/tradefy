from database import SessionLocal
from models.category import Category

db = SessionLocal()

categories = [
    "Mobiles",
    "Vehicles",
    "Electronics",
    "Furniture",
    "Real Estate",
    "Jobs"
]

for name in categories:
    exists = db.query(Category).filter(Category.name == name).first()
    if not exists:
        db.add(Category(name=name))

db.commit()
db.close()

print("Categories seeded")
