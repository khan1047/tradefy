import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ChatRoom() {
  const { seller } = useParams();
  const me = localStorage.getItem("tradefy_user");

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const sendMessage = async () => {
    if (!text.trim()) return;

    await fetch("http://127.0.0.1:8001/messages/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sender: me,
        receiver: seller,
        message: text,
      }),
    });

    setText("");
    loadMessages();
  };

  const loadMessages = async () => {
    const res = await fetch(`http://127.0.0.1:8001/messages/chat/${me}/${seller}`);
    const data = await res.json();
    setMessages(data);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>Chat with {seller}</h2>

      <div style={{ border: "1px solid #ccc", padding: 10, height: 300, overflowY: "scroll" }}>
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.sender}:</b> {m.message}
          </div>
        ))}
      </div>

      <br />
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
