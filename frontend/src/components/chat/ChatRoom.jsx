import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export default function ChatRoom({ username = "guest" }) {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const wsRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5002");
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "join", roomId }));
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);

      if (data.type === "message") {
        setMessages((prev) => [...prev, data]);
      }

      if (data.type === "seen") {
        setMessages((prev) =>
          prev.map((m) =>
            m.sender !== username ? { ...m, seen: true } : m
          )
        );
      }
    };

    return () => ws.close();
  }, [roomId]);

  const sendMessage = () => {
    if (!input.trim()) return;

    wsRef.current.send(
      JSON.stringify({
        type: "message",
        roomId,
        sender: username,
        text: input,
      })
    );

    setInput("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Chat Room: {roomId}</h2>

      <div style={{ height: 300, overflowY: "auto", border: "1px solid #ccc", padding: 10 }}>
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.sender}</b>: {m.text} {m.seen && "✔✔"}
          </div>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
