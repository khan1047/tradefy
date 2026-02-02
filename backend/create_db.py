from database import Base, engine
import models.user
import models.product
import models.product_image
import models.category
import models.message

Base.metadata.create_all(bind=engine)
print("Database created")
