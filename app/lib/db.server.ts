import mongoose from "mongoose";

let isConnected = false;

export async function initMongoDB() {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI || "mongodb+srv://..."; // fallback for local dev

  await mongoose.connect(uri);
  isConnected = true;
  console.log("MongoDB connected");
}
