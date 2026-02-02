from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from routers.auth_router import router as auth_router
from routers.product_router import router as product_router
from routers.message_router import router as message_router
from routers.category_router import router as category_router
from routers.upload_router import router as upload_router

app = FastAPI()

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# ROUTERS
# -------------------------
app.include_router(auth_router)
app.include_router(product_router)
app.include_router(message_router)
app.include_router(category_router)
app.include_router(upload_router)

# -------------------------
# ROOT
# -------------------------
@app.get("/")
def root():
    return {"status": "TradeFy API Running"}

# -------------------------
# 🔥 ROOT WEBSOCKET TEST 🔥
# -------------------------
@app.websocket("/ws-test")
async def ws_test(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            await websocket.send_text(data)
    except WebSocketDisconnect:
        print("WS TEST DISCONNECTED")
