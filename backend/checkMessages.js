import mongoose from "mongoose";
import dotenv from "dotenv";
import Message from "./models/Message.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
console.log("✅ Mongo connected");

const msg = await Message.findOne();
console.log(msg);

process.exit();
