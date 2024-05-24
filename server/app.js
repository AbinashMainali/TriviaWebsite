import express from "express";
import questionRouter from "./routes/questionRoutes.js";
import scoreRouter from "./routes/scoreRoutes.js";
import connectDB from "./db.js";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(bodyParser());
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.static(path.join(__dirname, "dist")));



app.use("/api/question", questionRouter);
app.use("/api/score", scoreRouter);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist","index.html"));
});
// Connect to MongoDB

await connectDB();

const port = process.env.PORT !== undefined ? process.env.PORT : 5000;
app.listen(port, (e) => {
  if (e) {
    console.log("Error in starting server");
  } else {
    console.log("Server started on port ", { port });
  }
});

console.log("Server running");