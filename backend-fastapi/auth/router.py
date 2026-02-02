from fastapi import APIRouter

router = APIRouter(prefix="/auth")

@router.get("/status")
def auth_status():
    return {"status": "auth module working"}
