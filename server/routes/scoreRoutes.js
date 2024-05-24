import express from "express";
import { getScore, recordScore, deleteScore, checkUserName } from "../controllers/scoreController.js";

const scoreRouter = express.Router();

scoreRouter.get("/getScore", getScore);
scoreRouter.post("/record", recordScore);
scoreRouter.delete("/deleteScore", deleteScore);
scoreRouter.post("/checkUserName", checkUserName);

export default scoreRouter;