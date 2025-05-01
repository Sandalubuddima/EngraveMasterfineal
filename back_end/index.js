// index.js
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

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

// Connect to MongoDB
mongoose.connect(mongoUrl, {});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("✅ Database connected");
});

// Middleware
app.use(bodyParser.json());

// JWT Middleware (optional)
app.use((req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (token != null) {
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
      if (!error) {
        req.user = decoded;
        console.log("Authenticated user:", decoded);
      }
    });
  }
  next();
});

// ES module dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/photopea", photopeaRouter);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
