import cloudinary from "../../Config/cloudinary.js";
import { CarModel } from "../../Model/carModel.js";
import { UserModel } from "../../Model/userModel.js";
import {BookingModel} from "../../Model/bookingModel.js"
import Razorpay from 'razorpay'
import * as dotenv from 'dotenv'


dotenv.config()

export const hostVehicle = async (req, res) => {
  try {
    const arr = [];
    for (const file of req.body.images) {
      const result = await cloudinary.uploader.upload(file);
      const data = {
        image_url: result.secure_url,
        image_id: result.public_id,
      };
      arr.push(data);
    }
    console.log("user id is=> ", req.body.userId);
    const data = {
      carNumber: req.body.userInput.CarNumber,
      carMake: req.body.userInput.CarMake,
      carModel: req.body.userInput.CarModel,
      manufactureYear: req.body.userInput.ManufactureYear,
      kmDriven: req.body.userInput.KmsDriven,
      availableLocation: req.body.userInput.AvailableLocation,
      fuelType: req.body.userInput.FuelType,
      transmission: req.body.userInput.Transmission,
      seatCapacity: req.body.userInput.SeatCapacity,
      category: req.body.userInput.Category,
      actualPrice: req.body.userInput.ActualPrice,
      rentingPrice: req.body.userInput.RentingPrice,
      images: arr,
      feature: req.body.feature,
      userId: req.body.userId,
    };
    const result = await CarModel.create(data);
    const result2 = await UserModel.updateOne(
      { _id: req.body.userId },
      { $push: { carList: result._id } }
    );

    return res.status(200).json({ message: "sucess", data: result });
  } catch (err) {
    console.log(`error - >${err.message}`);
    return res.status(500).json({message: "error", error: error });
  }
};

export const viewVehicle = async (req, res) => {
  try {
    let userId = req.query.userId;
    let result = await CarModel.find({ userId: userId }).exec();
    res.status(201).send({ message: "sucess", result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "error", error: error });
  }
};

export const carList_home = async (req, res) => {
  try {
    let filter = req.query.filter;
    let pageNumber = req.query.pageNumber;
    let result;
    if (filter == "ALL") {
      result = await CarModel.find({isVerified:true})
        .limit(4 * pageNumber)
        .exec();
    } else if (filter == "AUTOMATIC") {
      result = await CarModel.find({ transmission: filter, isVerified:true })
        .limit(4 * pageNumber)
        .exec();
    } else if (filter == "MANUAL") {
      result = await CarModel.find({ transmission: filter, isVerified:true })
        .limit(4 * pageNumber)
        .exec();
    } else if (filter == "DIESEL") {
      result = await CarModel.find({ fuelType: filter, isVerified:true })
        .limit(4 * pageNumber)
        .exec();
    } else if (filter == "PETROL") {
      result = await CarModel.find({ fuelType: filter, isVerified:true })
        .limit(4 * pageNumber)
        .exec();
    } else {
      result = await CarModel.find({isVerified:true})
        .limit(4 * pageNumber)
        .exec();
    }
    res.status(201).send({ message: "sucess", result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "error", error: error });
  }
};


export const vehicleDetails = async (req, res) => {
  try {
    let vehicleId = req.query.vehicleId;
       
   let result = await CarModel.find({_id:vehicleId}).exec();
   res.status(201).send({ message: "sucess", result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "error", error: error });
  }
};


export const activeDayChange = async (req,res) =>{
  try {
    console.log("active days are " , req.body.newDate)

    console.log("active userID is " , req.body.vehicleId)

    const result = await CarModel.updateOne(
                  { _id: req.body.vehicleId },
                  { $set: { availableDates: [req.body.newDate] } }
                   );
console.log(result)
    return res.status(200).json({ message: "sucess", data: result });       
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "error", error: error });
  }
}




export const booking = async (req,res) =>{
  try {

    console.log(req.body)

    const data = {

      carId: req.body.carId,
      userId: req.body.userId,
      datesBooked: [req.body.datesBooked],
      paymentMethod: req.body.paymentMethod,
      paymentStatus: req.body.paymentStatus,
      bookingStatus: req.body.bookingStatus,
      name: req.body.name,
      email: req.body.email,
      comments: req.body.comments,
      phone: req.body.phone,
      amount: req.body.amount

    };
    const result = await BookingModel.create(data);

    const result2 = await CarModel.updateOne({_id:req.body.carId}, {$push:{bookedDates:req.body.datesBooked}})
    
    if("razerPay"==req.body.paymentMethod){
      const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET,
      });
  
  
      const options = {
        amount: req.body.amount*100, 
        currency: "INR",
        receipt: "receipt",
      };
  
      const order = await instance.orders.create(options);
  
      if (!order) return res.status(500).send("Some error occured");
      return res.status(200).json({ message: "sucess", data: result, order }); 
    }


    

    return res.status(200).json({ message: "sucess", data: result });       
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "error", error: error });
  }
}



export const carList_search = async (req, res) => {
  try {
    let filter = req.query.filter;
    let pageNumber = req.query.pageNumber;
    let location = req.query.location;
    let startDate = req.query.startDate
    let endDate =  req.query.endDate
    let result;

    // await CarModel.find({"availableDates.startDate":{$gt:"2023-05-12"}, "availableDates.endDate":{$lt:"2023-06-30"}})
    // {"availableDates.startDate":{$lte:"2023-05-14"}, "availableDates.endDate":{$gte:"2023-06-16"},"bookedDates.startDate":{$gt:"2023-05-10"},"bookedDates.endDate":{$lt:"2023-05-10"}}
    // {"bookedDates.startDate":{$lt:"2023-06-13"},"bookedDates.endDate":{$lt:"2023-06-14"},"bookedDates.startDate":{$gt:"2023-06-13"},"bookedDates.endDate":{$gt:"2023-06-14"}}

    if (filter == "ALL") {

      result = await CarModel.find({isVerified:true,availableLocation:location,
                                      "availableDates":{"$elemMatch":{"startDate":{"$lte":endDate },"endDate":{"$gte":startDate }}},
                                      "bookedDates":{"$not":{"$elemMatch":{"startDate":{"$lte":endDate},"endDate":{"$gte":startDate}}}}})
          .limit(4 * pageNumber)
           .exec(); 
      
      
      
      
      
      // {/* ({isVerified:true,availableLocation:location,"availableDates.startDate":{$lte:startDate}, "availableDates.endDate":{$gte:endDate}})
      
      
      
      // .limit(4 * pageNumber)
      // .exec(); */}


      // result = await CarModel.find({isVerified:true,availableLocation:location,"availableDates.startDate":{$lte:startDate}, "availableDates.endDate":{$gte:endDate}})
      //   .limit(4 * pageNumber)
      //   .exec();
    } else if (filter == "AUTOMATIC" || filter == "MANUAL") {
      result = await CarModel.find({ transmission: filter, isVerified:true,availableLocation:location,
                                "availableDates":{"$elemMatch":{"startDate":{"$lte":endDate },"endDate":{"$gte":startDate }}},
                                "bookedDates":{"$not":{"$elemMatch":{"startDate":{"$lte":endDate},"endDate":{"$gte":startDate}}}} })
        .limit(4 * pageNumber)
        .exec();
    } else if (filter == "DIESEL" || filter == "PETROL" ) {
      result = await CarModel.find({ fuelType: filter, isVerified:true, availableLocation:location,
                                "availableDates":{"$elemMatch":{"startDate":{"$lte":endDate },"endDate":{"$gte":startDate }}},
                                "bookedDates":{"$not":{"$elemMatch":{"startDate":{"$lte":endDate},"endDate":{"$gte":startDate}}}}})
        .limit(4 * pageNumber)
        .exec();
    } else {
      result = await CarModel.find({isVerified:true, availableLocation:location})
        .limit(4 * pageNumber)
        .exec();
    }
   
    res.status(201).send({ message: "sucess", result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "error", error: error });
  }
};
