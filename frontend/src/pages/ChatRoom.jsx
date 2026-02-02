import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export default function ChatRoom() {
  const { receiver } = useParams();
  const sender = localStorage.getItem("tradefy_user");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const ws = useRef(null);

  useEffect(() => {
    if (!sender || !receiver) return;

    ws.current = new WebSocket(`ws://127.0.0.1:8001/ws/chat/${sender}/${receiver}`);

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages((prev) => [...prev, data]);
    };

    return () => ws.current.close();
  }, [receiver]);

  const sendMessage = () => {
    ws.current.send(JSON.stringify({
      sender,
      receiver,
      message: text
    }));
    setText("");
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Chat with {receiver}</h2>

      <div style={{ border: "1px solid #ccc", height: 300, padding: 10, overflowY: "auto" }}>
        {messages.map((m, i) => (
          <div key={i}><b>{m.sender}</b>: {m.message}</div>
        ))}
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
