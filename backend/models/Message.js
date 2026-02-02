import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    roomId: { type: String, required: true },

    sender: { type: String, required: true },
    receiver: { type: String, required: true }, // ✅ REQUIRED

    text: { type: String, required: true },

    deliveredAt: { type: Date },
    seenAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
