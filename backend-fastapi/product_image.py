from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database.db import Base

class ProductImage(Base):
    __tablename__ = "product_images"

    id = Column(Integer, primary_key=True, index=True)
    url = Column(String)
    product_id = Column(Integer, ForeignKey("products.id"))

    product = relationship("Product", back_populates="images")
