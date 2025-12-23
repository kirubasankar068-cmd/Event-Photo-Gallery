import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import imageRoutes from "./routes/ImageRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", imageRoutes);

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    // 1️⃣ Connect DB first
    await connectDB();

    // 2️⃣ Start server ONCE
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();
