import { CarModel } from "../../Model/carModel.js";
import { UserModel } from "../../Model/userModel.js";
import { BookingModel } from "../../Model/bookingModel.js";
import Razorpay from "razorpay";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import otpGenerator from "otp-generator";

dotenv.config();

export const booking = async (req, res) => {
  try {
    console.log(req.body);

    let otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    const data = {
      carId: req.body.carId,
      userId: req.body.userId,
      datesBooked: [req.body.datesBooked],
      paymentMethod: req.body.paymentMethod.razorPayment
        ? "razerPay"
        : "wallet",
      paymentStatus:(req.body.paymentMethod.walletPayment && req.body.amount <= req.body.walletBalace ) ? "success" : req.body.paymentStatus,
      bookingStatus: req.body.bookingStatus,
      name: req.body.name,
      email: req.body.email,
      comments: req.body.comments,
      phone: req.body.phone,
      amount: req.body.amount,
      OTP: otp,
    };

    let amount = req.body.amount - req.body.walletBalace;
    const result = await BookingModel.create(data);

    const result2 = await CarModel.updateOne(
      { _id: req.body.carId },
      { $push: { bookedDates: req.body.datesBooked } }
    );

    if (req.body.paymentMethod.walletPayment) {
      let walletAmount = 0;
      if (data.amount >= req.body.walletBalace) {
        walletAmount = req.body.walletBalace;
      } else {
        walletAmount = data.amount;
      }
      const result = await UserModel.findByIdAndUpdate(req.body.userId, {
        $inc: { walletBalance: -walletAmount },
      });
    }

    if ("razerPay" == data.paymentMethod) {
      const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET,
      });

      const options = {
        amount: amount * 100,
        currency: "INR",
        receipt: "receipt",
      };

      const order = await instance.orders.create(options);

      if (!order) return res.status(500).send("Some error occured");
      return res.status(200).json({ message: "sucess", data: result, order });
    }

    return res.status(200).json({ message: "sucess", data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error", error: error });
  }
};

export const bookingList = async (req, res) => {
  try {
    let userId = req.query.userId;
    let page = req.query.page;
    let result = await BookingModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $skip:10*(page-1),
      },{
        $limit: 3,
      },
      {
        $lookup: {
          from: "carmodels",
          localField: "carId",
          foreignField: "_id",
          as: "carDetails",
        },
      },
      {
        $unwind: {
          path: "$carDetails",
        },
      },
      {
        $unwind: {
          path: "$datesBooked",
        },
      },
    ]);



    const pageCount = await BookingModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $lookup: {
          from: "carmodels",
          localField: "carId",
          foreignField: "_id",
          as: "carDetails",
        },
      },
      {
        $unwind: {
          path: "$carDetails",
        },
      },
      {
        $unwind: {
          path: "$datesBooked",
        },
      },{
        $count: "pageCount"
      }
    ]);

    const totalDocument = pageCount[0]?.pageCount%10==0 ? pageCount[0]?.pageCount/10: Math.floor(pageCount[0]?.pageCount/10)+1

    res.status(200).send({ message: "sucess", data: result, totalDocument });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error", error: error });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.body.bookingId;

    const result = await BookingModel.findByIdAndUpdate(
      bookingId,
      { $set: { bookingStatus: "Cancelled" } },
      { new: true }
    );

      console.log("cancel booking data=>", result )

    if(result.paymentStatus=="success"){

      const updateWallet = await UserModel.findByIdAndUpdate(result.userId, {
        $inc: { walletBalance: result.amount },
      });

    }



    res.status(200).send({ message: "sucess", data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error", error: error });
  }
};



export const bookingDetails = async (req, res) => {
  try {
    const bookingId = req.query.bookingId

    const result = await BookingModel.findById(bookingId).exec()

      console.log("booking data=>", result )

    res.status(200).send({ message: "sucess", result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error", error: error });
  }
};




export const bookingListForHost = async (req,res)=>{
try {
  let userId = req.query.userId
  let vehicleId = req.query.vehicleId
  let page = req.query.page

  if(vehicleId=="All"){
  const userdata = await UserModel.findOne({_id:userId})

  const bookingData = await BookingModel.aggregate(
  [
    {
      '$match': {
        'carId': {
          '$in': 
            userdata.carList
          
        }
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
        'path': '$carDetails'
      }
    },{
      $sort:{createdAt:-1}
    },{
      $skip:10*(page-1),
    },{
      $limit:10,
    }
  ])

  const pageCount = await BookingModel.aggregate(
    [
      {
        '$match': {
          'carId': {
            '$in': 
              userdata.carList
            
          }
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
          'path': '$carDetails'
        }
      },{
        $count: "pageCount"
      }
    ])

    const totalDocument = pageCount[0]?.pageCount%10==0 ? pageCount[0]?.pageCount/10: Math.floor(pageCount[0]?.pageCount/10)+1

  res.status(200).send({ message: "sucess", result: bookingData, totalDocument });
  }else{
    const userdata = await UserModel.findOne({_id:userId})

    const bookingData = await BookingModel.aggregate(
    [
      {
        '$match': { carId: new mongoose.Types.ObjectId(vehicleId) }
      }, {
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
      },{
        $limit:10,
      }
    ])


    const pageCount = await BookingModel.aggregate(
      [
        {
          '$match': { carId: new mongoose.Types.ObjectId(vehicleId) }
        }, {
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
          $count: "pageCount"
        }
      ])

      const totalDocument = pageCount[0]?.pageCount%10==0 ? pageCount[0]?.pageCount/10: Math.floor(pageCount[0]?.pageCount/10)+1

    console.log(bookingData,vehicleId)
    res.status(200).send({ message: "sucess", result: bookingData, totalDocument });

  }
  
  


} catch (error) {
  console.log(error);
  return res.status(500).json({ message: "error", error: error });
}
}



export const confirmBooking = async (req, res) => {
  try {
    const bookingId = req.body.bookingId;

    const result = await BookingModel.findByIdAndUpdate(
      bookingId,
      { $set: { bookingStatus: "Confirmed" } },
      { new: true }
    );


    res.status(200).send({ message: "sucess", data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error", error: error });
  }
};


export const handleVehicle = async (req, res) => {
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


export const bookingDetailsComplete = async (req, res) => {
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