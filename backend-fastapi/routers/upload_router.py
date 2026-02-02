from fastapi import APIRouter, UploadFile, File
import cloudinary.uploader
from cloudinary_config import cloudinary

router = APIRouter(prefix="/upload")

@router.post("/")
async def upload_image(file: UploadFile = File(...)):
    result = cloudinary.uploader.upload(file.file)
    return {"url": result["secure_url"]}
