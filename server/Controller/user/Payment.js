import {BookingModel} from "../../Model/bookingModel.js"
import { UserModel } from "../../Model/userModel.js"
import Razorpay from 'razorpay'
import * as dotenv from 'dotenv'


export const paymentConfirm = async (req,res) =>{
    try {
    
        const {
            orderCreationId,
            bookingId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;
  
      
  
      const result = await BookingModel.updateOne(
                    { _id: bookingId },
                    { $set: { paymentStatus: "success" } }
                     );
      const bookingDetails = await BookingModel.findOne({_id:bookingId}).exec()

      const result1 = await UserModel.findOneAndUpdate({carList:bookingDetails.carId}, 
                     {$inc: { walletBalance: bookingDetails.amount } } )
                     console.log("booking get data after wallet updation of user",result1 )

      console.log("give money to host", result)

      return res.status(200).json({ message: "sucess", data: result,bookingId:bookingId });       
    } catch (error) {
      console.log(error)
      return res.status(500).json({message: "error", error: error });
    }
  }