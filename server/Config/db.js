import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://admin-evara:"+"JUSKM1111a"+"@evara-ecom.il0m4vi.mongodb.net/LoomCarDB");
    console.log(
      'Connected To Mongodb Database'
    );
  } catch (error) {
    console.log(`MongoDB Erorr ${error}`);
  }
};

export default connectDB;
