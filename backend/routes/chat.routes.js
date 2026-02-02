import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

router.get("/inbox/:email", async (req, res) => {
  try {
    const email = req.params.email;

    const chats = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: email }, { receiver: email }],
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$roomId",
          sender: { $first: "$sender" },
          receiver: { $first: "$receiver" },
          text: { $first: "$text" },
          unreadCount: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$receiver", email] },
                    { $eq: ["$seenAt", null] },
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          roomId: "$_id",
          sender: 1,
          receiver: 1,
          text: 1,
          unreadCount: 1,
        },
      },
    ]);

    res.json(chats);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Inbox error" });
  }
});

export default router;
