import express from "express";
import {fetchQuestion, getQuestion} from "../controllers/questionControllers.js";

const questionRouter = express.Router();

questionRouter.post("/fetchQuestion", fetchQuestion);

questionRouter.get("/getQuestion", getQuestion);

export default questionRouter;