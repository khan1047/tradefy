import { useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function ChatRoom() {
  const { roomId } = useParams();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi, is this still available?", sender: "other" },
    { id: 2, text: "Yes, it is available.", sender: "me" },
  ]);

  const bottomRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: input, sender: "me" },
    ]);
    setInput("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="flex items-center px-4 py-3 bg-white border-b">
        <div className="font-semibold">Chat – Ad #{roomId}</div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-xs px-4 py-2 rounded-lg text-sm
              ${
                msg.sender === "me"
                  ? "ml-auto bg-teal-600 text-white"
                  : "mr-auto bg-white border"
              }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 p-3 bg-white border-t">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message"
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-teal-600 text-white px-4 py-2 rounded-full"
        >
          Send
        </button>
      </div>
    </div>
  );
}
