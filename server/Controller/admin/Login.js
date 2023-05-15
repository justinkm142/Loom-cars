import jwt from "jsonwebtoken";
import { Admin } from "../../Model/adminModel.js";

export const adminlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let result = await Admin.find({ email: email }).exec();
    if (result.length == 0) {
      return res.status(401).json({ error: "Email and password invalid" });
    }
    if (email === result[0].email && password === result[0].password) {
      let token = jwt.sign({ email: email, user:"admin", role:"admin" }, "jkm", { expiresIn: "1h" });
      console.log("login sucessfull");
      return res.status(200).json({ message: "sucess", token: token });
    } else {
      return res.status(401).json({ error: "Email and password invalid" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({message: "error", error: "Server Error! Please try after some time" });
  }
};

