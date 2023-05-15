import { CarModel } from "../../Model/carModel.js";



export const verifyCars=async(req,res)=>{
    try {

    
        let result = await CarModel.aggregate([
            {
              '$match': {
                'isVerified': false
              }
            }, {
              '$lookup': {
                'from': 'usermodels', 
                'localField': 'userId', 
                'foreignField': '_id', 
                'as': 'userDetails'
              }
            }, {
              '$unwind': {
                'path': '$userDetails'
              }
            }
          ]).exec();

        res.status(201).send({message: "sucess", result })
    
      } catch (error) {
        console.log(error)
      }
}

export const verifyCarStatausUpdate = async (req,res)=>{
    try{
        const {vehicleId, status}=req.body

        let result =await CarModel.findByIdAndUpdate(vehicleId,{$set:{isVerified:true, carStatus:"Verified"}}).exec();

        return res.status(200).json({ message: "sucess", result });

    }catch(err){
        console.log(err)
        return res.status(500).json({message: "error", error: "Database update failed server error!" });
    }
}


export const getCarList =async (req,res)=>{
  try {
    
    let result = await CarModel.find({isVerified:true}).exec();
  
    res.status(201).send({message: "sucess", result })

  } catch (error) {
    console.log(error)
  }
}

