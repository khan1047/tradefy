from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.db import get_db
from models.message import Message

router = APIRouter(prefix="/chat")

@router.post("/send")
def send_message(sender: str, receiver: str, product_id: int, content: str, db: Session = Depends(get_db)):
    msg = Message(sender=sender, receiver=receiver, product_id=product_id, content=content)
    db.add(msg)
    db.commit()
    return {"message": "Sent"}

@router.get("/conversation")
def get_chat(sender: str, receiver: str, product_id: int, db: Session = Depends(get_db)):
    msgs = db.query(Message).filter(
        Message.product_id == product_id,
        ((Message.sender == sender) & (Message.receiver == receiver)) |
        ((Message.sender == receiver) & (Message.receiver == sender))
    ).all()

    return [{"from": m.sender, "msg": m.content} for m in msgs]
