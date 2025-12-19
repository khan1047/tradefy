import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Inbox() {
  const [conversations, setConversations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8003/conversations")
      .then((res) => res.json())
      .then(setConversations);
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inbox</h1>

      {conversations.map((c) => (
        <div
          key={c.room_id}
          onClick={() => navigate(`/chat/${c.room_id}`)}
          className="border p-3 rounded mb-2 cursor-pointer hover:bg-gray-100"
        >
          <div className="font-semibold">{c.room_id}</div>
          <div className="text-sm text-gray-600 truncate">
            {c.last_message}
          </div>
        </div>
      ))}
    </div>
  );
}
