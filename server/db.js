import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const dbUri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DB}.l7jq3r3.mongodb.net/?retryWrites=true&w=majority`


const connectDB = async () => {
    try {
        await mongoose.connect(dbUri, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("MongoDB connected");
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

export default connectDB;