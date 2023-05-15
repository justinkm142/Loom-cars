import mongoose from "mongoose";
import * as dotenv from 'dotenv'
dotenv.config()

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://admin-evara:"+process.env.MONGODB_PASSWORD+"@evara-ecom.il0m4vi.mongodb.net/LoomCarDB");
    console.log(
      'Connected To Mongodb Database'
    );
  } catch (error) {
    console.log(`MongoDB Erorr ${error}`);
  }
};

export default connectDB;
