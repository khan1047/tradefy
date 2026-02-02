import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

export default function Inbox() {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const currentUserId = Number(
    localStorage.getItem("tradefy_user_id")
  );

  useEffect(() => {
    loadInbox();
  }, []);

  const loadInbox = async () => {
    const res = await axiosClient.get("/messages/inbox");

    const map = {};

    res.data.forEach((msg) => {
      const productId = msg.product.id;

      if (!map[productId]) {
        map[productId] = {
          ...msg,
          unread: 0,
        };
      }

      const lastOpened = localStorage.getItem(
        `last_opened_${productId}`
      );

      const isUnread =
        msg.sender_id !== currentUserId &&
        (!lastOpened ||
          new Date(msg.created_at) >
            new Date(lastOpened));

      if (isUnread) {
        map[productId].unread += 1;
      }

      // keep latest message
      if (
        new Date(msg.created_at) >
        new Date(map[productId].created_at)
      ) {
        map[productId] = {
          ...map[productId],
          ...msg,
        };
      }
    });

    const grouped = Object.values(map).sort(
      (a, b) =>
        new Date(b.created_at) - new Date(a.created_at)
    );

    setConversations(grouped);
  };

  const formatTime = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h2 style={{ marginBottom: 20 }}>Inbox</h2>

      {conversations.length === 0 && (
        <p>No conversations yet</p>
      )}

      {conversations.map((msg) => (
        <div
          key={msg.product.id}
          onClick={() =>
            navigate(`/chat/${msg.product.id}`)
          }
          style={{
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: 12,
            marginBottom: 10,
            cursor: "pointer",
            background: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* LEFT */}
          <div>
            <div
              style={{
                fontWeight: "bold",
                marginBottom: 4,
              }}
            >
              {msg.product.title}
            </div>

            <div style={{ color: "#374151" }}>
              {msg.content.length > 60
                ? msg.content.slice(0, 60) + "…"
                : msg.content}
            </div>
          </div>

          {/* RIGHT */}
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontSize: 12,
                color: "#6b7280",
                marginBottom: 6,
              }}
            >
              {formatTime(msg.created_at)}
            </div>

            {msg.unread > 0 && (
              <div
                style={{
                  background: "#dc2626",
                  color: "#fff",
                  borderRadius: 999,
                  padding: "4px 8px",
                  fontSize: 12,
                  minWidth: 20,
                  textAlign: "center",
                }}
              >
                {msg.unread}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
