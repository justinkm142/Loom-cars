
import { UserModel } from "../../Model/userModel.js";


export const userList = async (req, res) => {
  try {
    let result = await UserModel.find().exec();

    return res.status(200).json({ message: "sucess", result });

  } catch (err) {
    console.log(err);
    return res.status(500).json({message: "error", error: "Server Error! Please try after some time" });
  }
};


export const userBlock = async(req,res) =>{
    try{
        const {userId, status}=req.body

        let result =await UserModel.findByIdAndUpdate(userId,{$set:{isBlocked:status}}).exec();

        return res.status(200).json({ message: "sucess", result });

    }catch(err){
        console.log(err)
        return res.status(500).json({message: "error", error: "Database update failed server error!" });
    }
}