from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database.db import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    price = Column(String)
    category = Column(String)
    owner = Column(String)

    images = relationship("ProductImage", back_populates="product", cascade="all, delete")
