from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database.db import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    price = Column(String, nullable=False)

    seller_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    seller = relationship("User")

    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    category = relationship("Category")

    images = relationship("ProductImage", back_populates="product")
