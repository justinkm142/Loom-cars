import mongoose from "mongoose";
import * as dotenv from 'dotenv'
dotenv.config()

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      'Connected To Mongodb Database'
    );
  } catch (error) {
    console.log(`MongoDB Erorr ${error}`);
  }
};

export default connectDB;
