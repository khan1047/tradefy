import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export default function Chat() {
  const { conversationId } = useParams(); // MUST MATCH ROUTE
  const socketRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!conversationId) {
      console.error("❌ conversationId is missing");
      return;
    }

    console.log("✅ CONNECTING TO CHAT:", conversationId);

const token = localStorage.getItem("access_token");

const ws = new WebSocket(
  `ws://127.0.0.1:8001/messages/ws/chat/${conversationId}?token=${token}`
);

    socketRef.current = ws;

    ws.onopen = () => {
      console.log("🟢 WS CONNECTED");
    };

    ws.onmessage = (event) => {
      console.log("📩 WS MESSAGE:", event.data);
      setMessages((prev) => [...prev, event.data]);
    };

    ws.onerror = (err) => {
      console.error("❌ WS ERROR", err);
    };

    ws.onclose = () => {
      console.log("🔴 WS CLOSED");
    };

    return () => {
      ws.close();
    };
  }, [conversationId]);

  const sendMessage = () => {
    if (!socketRef.current || socketRef.current.readyState !== 1) {
      alert("WebSocket not connected yet");
      return;
    }

    socketRef.current.send(input);
    setInput("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Chat #{conversationId}</h2>

      <div
        style={{
          border: "1px solid #ccc",
          height: 300,
          padding: 10,
          marginBottom: 10,
          overflowY: "auto",
        }}
      >
        {messages.map((m, i) => (
          <div key={i}>{m}</div>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
