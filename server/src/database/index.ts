import mongoose from "mongoose";
import dotenv from "dotenv";

console.log(process.env.MONGO_URI);
dotenv.config();

const connection_url = process.env.MONGO_URI;
export const connectToDb = mongoose.connect(connection_url);
