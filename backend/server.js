import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { WebSocketServer } from "ws";
import authRoutes from "./routes/auth.routes.js";
import adsRoutes from "./routes/ad.routes.js";
import categoriesRoutes from "./routes/categories.js";
import Message from "./models/Message.js";
import chatRoutes from "./routes/chat.routes.js";

dotenv.config();

const app = express();

/* -------------------- MIDDLEWARE -------------------- */
app.use(cors());
app.use(express.json());

/* -------------------- ROUTES -------------------- */
app.use("/api/auth", authRoutes);
app.use("/api/ads", adsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/chat", chatRoutes);

/* -------------------- DATABASE -------------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

/* -------------------- HTTP SERVER -------------------- */
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 HTTP server running on port ${PORT}`);
});

/* -------------------- WEBSOCKET SERVER -------------------- */
const wss = new WebSocketServer({ port: 5002 });
const rooms = {};

console.log("💬 WebSocket server running on ws://localhost:5002");

wss.on("connection", (ws) => {
  ws.on("message", async (msg) => {
    const data = JSON.parse(msg.toString());
    const { type, roomId, text, sender } = data;

    // JOIN ROOM
    if (type === "join") {
      if (!rooms[roomId]) rooms[roomId] = new Set();
      rooms[roomId].add(ws);
      ws.roomId = roomId;

      const history = await Message.find({ roomId })
        .sort({ createdAt: 1 })
        .limit(50);

      history.forEach((m) => {
        ws.send(
          JSON.stringify({
            type: "message",
            sender: m.sender,
            text: m.text,
            deliveredAt: m.deliveredAt,
            seenAt: m.seenAt,
          })
        );
      });
      return;
    }

    // MESSAGE
    if (type === "message") {
      const saved = await Message.create({
        roomId,
        sender,
        text,
        deliveredAt: new Date(),
      });

      rooms[roomId]?.forEach((client) => {
        client.send(
          JSON.stringify({
            type: "message",
            sender,
            text,
            deliveredAt: saved.deliveredAt,
          })
        );
      });
    }

    // TYPING
    if (type === "typing") {
      rooms[roomId]?.forEach((client) => {
        if (client !== ws) {
          client.send(JSON.stringify({ type: "typing", sender }));
        }
      });
    }

    // SEEN
    if (type === "seen") {
      await Message.updateMany(
        { roomId, sender: { $ne: sender }, seenAt: null },
        { $set: { seenAt: new Date() } }
      );

      rooms[roomId]?.forEach((client) => {
        client.send(JSON.stringify({ type: "seen" }));
      });
    }
  });

  ws.on("close", () => {
    if (ws.roomId && rooms[ws.roomId]) {
      rooms[ws.roomId].delete(ws);
    }
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    mongo: mongoose.connection.readyState === 1,
    uptime: process.uptime(),
  });
});
