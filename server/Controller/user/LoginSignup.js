import jwt from "jsonwebtoken";

import {UserModel} from "../../Model/userModel.js"

export const signup = async (req, res) => {
  try {

    const { name, email,phone, password  } = req.body;
    if(!name || !email || !phone || !password){
        return res.status(401).json({message: "error", error: "enter all the details " });
    }

    let emailCheck = await UserModel.findOne({email})
    let phoneCheck = await UserModel.findOne({phone})

    if(emailCheck || phoneCheck){
        return res.status(409).json({message: "error", error: "User exists please login" });
    }
    
    const result = await UserModel.create({name, email, phone, password})
    let id=result._id.toString()
    
    let token = jwt.sign({ email:email, user:name, id:id, role:"user" }, "jkm", { expiresIn: "1h" });

    res.status(201).send({message: "sucess",token, ...result, })
    

  } catch (err) {
    console.log(err);
    return res.status(500).json({message: "error", error: "Server Error! Please try after some time" });

  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let result = await UserModel.find({ email: email }).exec();
    if (result.length == 0) {
      return res.status(401).json({ message: "error", error: "Email and password invalid" });
    }
    if (email === result[0].email && password === result[0].password) {
      if(result[0].isBlocked==true){
        return res.status(401).json({ message: "error", error: "Admin blocked you" });
      }
      let token = jwt.sign({ email: email, user:result[0].name, userId:result[0]._id, role:"user" }, "jkm", { expiresIn: "1h" });
      console.log("login sucessfull");
      return res.status(200).json({ message: "sucess", token: token, data:result[0]});
    } else {
      return res.status(401).json({ message: "error", error: "Email and password invalid" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({message: "error", error: "Server Error! Please try after some time" });
  }
};


export const otpLogin = async (req, res) => {
  try {
    const { phone } = req.body;
    let result = await UserModel.find({ phone: phone }).exec();
    if (result.length == 0) {
      return res.status(401).json({ message: "error", error: "user Not found" });
    }
    if(result[0].isBlocked==true){
      return res.status(401).json({ message: "error", error: "Admin blocked you" });
    }
    //    email: email, user:result[0].name, userId:result[0]._id, role:"user"
    let token = jwt.sign({ email: result[0].email, user:result[0].name,userId:result[0]._id, role:"user" }, "jkm", { expiresIn: "12h" });
    console.log("login sucessfull");
    return res.status(200).json({ message: "sucess", token: token, data:result[0]});
   
  } catch (err) {
    console.log(err);
    return res.status(500).json({message: "error", error: "Server Error! Please try after some time" });
  }
};

export const userDetails = async (req, res) => {
  try {
    const { userId } = req.query
    console.log("the body for user is ", req.query)

    let result = await UserModel.find({ _id: userId }).exec();
    if (result.length == 0) {
      return res.status(401).json({ message: "error", error: "user Not found" });
   
    } else {
      return res.status(200).json({ message: "sucess", data:result[0]});
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({message: "error", error: "Server Error! Please try after some time" });
  }
};
