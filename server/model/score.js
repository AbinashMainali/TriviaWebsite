import mongoose from "mongoose";

const scoreSchema = mongoose.Schema({
        
        name: {
            type: String,
            required: true,
            unique: true,
        
        },
        score: {
            type: Number,
            required: true,
        },
        time: {
            type: Number,
            required: true,
        }
    },{timestamps: true}
);
    
const Score = mongoose.model("Score", scoreSchema);

export default Score;