import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
const PORT = process.env.PORT || 8000;

dotenv.config();

app.use(express.json()); //to parse the incoming request with json payloads (from req.body);

app.use("/api/auth", authRoutes);

// app.get("/", (req, res) => {
//   res.send("Hello Roshan Jaiswal");
// });


app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Sever is running on port ${PORT}`);
});
