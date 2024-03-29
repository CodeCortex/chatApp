import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js"

import connectToMongoDB from "./db/connectToMongoDB.js";
import {app,server} from "./socket/socket.js"
dotenv.config();


const PORT = process.env.PORT || 8000;


app.use(express.json()); //to parse the incoming request with json payloads (from req.body);
app.use(cookieParser()); //to parse the incoming cookies from req.body

app.use("/api/auth", authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);


// app.get("/", (req, res) => {
//   res.send("Hello Roshan Jaiswal");
// });


server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
