import Question from "../model/question.js";
import axios from "axios";
import *  as dotenv from "dotenv";

dotenv.config();
export const fetchQuestion = async (req, res) => {
    const {TRIVIA_URL} = process.env;
    try{
    
  const urlAPI= TRIVIA_URL;
    const response = await axios.get(urlAPI);
    const questions = response.data;
    
    const result= await Question.insertMany(questions);

}
catch(error){
    console.log(error);
}
}


export const getQuestion = async (req, res) => {
    try{
        const questions = await Question.find();


        res.status(200).json(questions);
       
    }
    catch(error){
        res.status(404).json({message: error.message});
    }
}
