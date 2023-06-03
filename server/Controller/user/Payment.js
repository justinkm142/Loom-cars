import {BookingModel} from "../../Model/bookingModel.js"
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

      return res.status(200).json({ message: "sucess", data: result,bookingId:bookingId });       
    } catch (error) {
      console.log(error)
      return res.status(500).json({message: "error", error: error });
    }
  }