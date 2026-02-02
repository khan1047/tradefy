from fastapi import APIRouter, UploadFile, File, HTTPException
import uuid
import os

router = APIRouter(prefix="/upload")

UPLOAD_DIR = "/app/uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/image")
async def upload_image(file: UploadFile = File(...)):
    file_ext = file.filename.split(".")[-1]
    new_filename = f"{uuid.uuid4()}.{file_ext}"
    file_path = os.path.join(UPLOAD_DIR, new_filename)

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    return {"url": f"/static/{new_filename}"}
