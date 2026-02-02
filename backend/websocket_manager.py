from typing import Dict, List
from fastapi import WebSocket

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[int, List[WebSocket]] = {}

    async def connect(self, product_id: int, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.setdefault(product_id, []).append(websocket)

    def disconnect(self, product_id: int, websocket: WebSocket):
        self.active_connections[product_id].remove(websocket)

    async def broadcast(self, product_id: int, message: dict):
        for ws in self.active_connections.get(product_id, []):
            await ws.send_json(message)

manager = ConnectionManager()
