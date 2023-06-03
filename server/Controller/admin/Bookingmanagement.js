
import { BookingModel } from "../../Model/bookingModel.js";

import mongoose from "mongoose";


export const getBookingList = async (req, res) => {
  try {
    // let result = await BookingModel.find().exec();
    const {page} = req.query;

    const bookingData = await BookingModel.aggregate(
      [
        {
          '$lookup': {
            'from': 'carmodels', 
            'localField': 'carId', 
            'foreignField': '_id', 
            'as': 'carDetails'
          }
        }, {
          '$unwind': {
            'path': '$carDetails'
          }
        },{
          $sort:{createdAt:-1}
        },{
          $skip:10*(page-1),
        },
        {
          $limit:10,
        }
      ])


      const pageCount = await BookingModel.aggregate(
        [
          {
            '$lookup': {
              'from': 'carmodels', 
              'localField': 'carId', 
              'foreignField': '_id', 
              'as': 'carDetails'
            }
          }, {
            '$unwind': {
              'path': '$carDetails'
            }
          },{
            $sort:{createdAt:-1}
          },{
            $count: "pageCount"
          }
        ])

    const totalDocument = pageCount[0]?.pageCount%10==0 ? pageCount[0]?.pageCount/10: Math.floor(pageCount[0]?.pageCount/10)+1
    
    return res.status(200).json({ message: "sucess", result:bookingData, totalDocument });

  } catch (err) {
    console.log(err);
    return res.status(500).json({message: "error", error: "Server Error! Please try after some time" });
  }
};


// export const userBlock = async(req,res) =>{
//     try{
//         const {userId, status}=req.body

//         let result =await UserModel.findByIdAndUpdate(userId,{$set:{isBlocked:status}}).exec();

//         return res.status(200).json({ message: "sucess", result });

//     }catch(err){
//         console.log(err)
//         return res.status(500).json({message: "error", error: "Database update failed server error!" });
//     }
// }



export const handleBooking = async (req, res) => {
  try {
    const bookingId = req.body.bookingId;
    const bookingStatus = req.body.bookingStatus

    const result = await BookingModel.findByIdAndUpdate(
      bookingId,
      { $set: { bookingStatus: bookingStatus } },
      { new: true }
    );


    res.status(200).send({ message: "sucess", data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error", error: error });
  }
};



export const bookingDetails = async (req, res) => {
  try {
    const bookingId = req.query.bookingId

    const result = await BookingModel.aggregate([
      {
        '$match': {
          '_id': new mongoose.Types.ObjectId(bookingId) 
        }
      }, {
        '$lookup': {
          'from': 'carmodels', 
          'localField': 'carId', 
          'foreignField': '_id', 
          'as': 'carDetails'
        }
      }, {
        '$unwind': {
          'path': '$datesBooked'
        }
      }, {
        '$unwind': {
          'path': '$carDetails'
        }
      }, {
        '$lookup': {
          'from': 'usermodels', 
          'localField': 'carDetails.userId', 
          'foreignField': '_id', 
          'as': 'ownerDetails'
        }
      }, {
        '$unwind': {
          'path': '$ownerDetails'
        }
      }
    ])

      console.log("booking data=>", result )

    res.status(200).send({ message: "sucess", result:result[0] });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error", error: error });
  }
};