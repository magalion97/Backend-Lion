import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("🟢 Conectado a MongoDB");
  } catch (error) {
    console.error("🔴 Error MongoDB:", error.message);
  }
};
