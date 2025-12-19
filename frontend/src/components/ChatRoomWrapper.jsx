import React from "react";
import { useParams } from "react-router-dom";
import ChatRoom from "./ChatRoom.jsx";

export default function ChatRoomWrapper() {
  const { roomId, username } = useParams();

  console.log("📌 ChatRoomWrapper params:", { roomId, username });

  if (!roomId || !username) {
    return (
      <div style={{ padding: 20, color: "red", fontWeight: "bold" }}>
        ❌ Chat Error: Missing roomId or username in the URL.<br />
        Example format: <code>/chat/room1/ambigous</code>
      </div>
    );
  }

  return <ChatRoom roomId={roomId} username={username} />;
}
