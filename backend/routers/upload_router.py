from fastapi import APIRouter, UploadFile, File, HTTPException
import os
import uuid

router = APIRouter(prefix="/upload", tags=["Upload"])

UPLOAD_DIR = "uploads"

@router.post("/")
def upload_image(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Invalid image file")

    ext = file.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    filepath = os.path.join(UPLOAD_DIR, filename)

    with open(filepath, "wb") as f:
        f.write(file.file.read())

    return {
        "url": f"/uploads/{filename}"
    }
