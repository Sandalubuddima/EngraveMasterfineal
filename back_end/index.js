// index.js (or app.js)
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Routers
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import orderRouter from './routes/orderRouter.js';
import photopeaRouter from './routes/photopeaRouter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const mongoUrl = process.env.MONGO_DB_URI;

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(bodyParser.json());

// JWT middleware (optional global token checker)
app.use((req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (!err) {
        req.user = decoded;
        console.log("✅ Authenticated user:", decoded);
      }
    });
  }
  next();
});

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/svgs", express.static(path.join(__dirname, "svgs"))); // ✅ Serve converted SVGs

// ✅ Connect to MongoDB
mongoose.connect(mongoUrl)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Mount routers
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/photopea", photopeaRouter);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("🔥 EngraveMaster API is running!");
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at: http://localhost:${PORT}`);
});
