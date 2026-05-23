// import path from "path";
// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import authRoutes from "./routes/auth.route.js";
// import messageRoutes from "./routes/message.route.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";

// dotenv.config();

// const app = express({ extended: true, limit: "15mb" }); // Increased limit for image uploads
// app.use(cookieParser());
// const __dirname = path.resolve();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(express.json()); // Increased limit for image uploads
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   }),
// );

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);

// // ✅ Connect to Local MongoDB
// mongoose
//   .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/realchatapp")
//   .then(() => {
//     console.log("MongoDB Connected Successfully");
//     app.listen(PORT, () => {
//       console.log("Server running on port " + PORT);
//     });
//   })
//   .catch((err) => {
//     console.log("Error connection to MONGODB:", err);
//   });

// // Production deployment setup
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("*", (_, res) => {
//     res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
//   });
// }

import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { app, server } from "./lib/socket.js";

const __dirname = path.resolve();

const PORT = ENV.PORT || 3000;

app.use(express.json({ limit: "5mb" })); // req.body
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// make ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
  connectDB();
});
