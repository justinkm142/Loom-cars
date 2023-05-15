import  jwt  from "jsonwebtoken";



export const verifyAdmin = (req, res)=> {
  try {
  const authHeader = req.headers.authorization?.split(' ')[1];

  if (!authHeader) {

    return res.status(401).json({ message: "error", error: "Authorization header missing" });

  }
  let decoded
  try{
      decoded = jwt.verify(authHeader, 'jkm');
  }catch(err){
    console.error(err);
    return res.status(401).json({message: "error", error: "Token Expired"});
  }
    
    if (decoded){
      if(decoded.user=='admin'){
        return res.status(200).json({message: "sucess", data: decoded});
      }else{
        return res.status(401).json({ message: "error", error: "Verification failed" });
      }
      
    }else{
        return res.status(401).json({ message: "error", error: "Verification failed" });
    }
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: "error", error: "Server Error! Please try after some time" });

  }
}

