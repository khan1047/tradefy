from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from utils.jwt import verify_token

router = APIRouter(prefix="/messages")

@router.websocket("/ws/chat/{conversation_id}")
async def chat_ws(websocket: WebSocket, conversation_id: int):
    token = websocket.query_params.get("token")

    if not token:
        await websocket.close(code=1008)
        return

    payload = verify_token(token)
    if not payload:
        await websocket.close(code=1008)
        return

    user_id = payload.get("user_id")

    await websocket.accept()
    print(f"WS AUTH OK user={user_id} conversation={conversation_id}")

    try:
        while True:
            data = await websocket.receive_text()
            print(f"WS RECEIVED from {user_id}: {data}")
            await websocket.send_text(data)
    except WebSocketDisconnect:
        print(f"WS DISCONNECTED user={user_id}")
