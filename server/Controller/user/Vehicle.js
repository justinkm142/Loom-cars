import cloudinary from "../../Config/cloudinary.js";
import { CarModel } from "../../Model/carModel.js";
import { UserModel } from "../../Model/userModel.js";
import { BookingModel } from "../../Model/bookingModel.js";
import Razorpay from "razorpay";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import otpGenerator from 'otp-generator';

dotenv.config();

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
      { $push: { carList: result._id },$set: { isHosted: true } }
    );

    return res.status(200).json({ message: "sucess", data: result });
  } catch (err) {
    console.log(`error - >${err.message}`);
    return res.status(500).json({ message: "error", error: err.message });
  }
};

export const editVehicle = async (req, res) => {
  try {
    
    if(req.body.action=="Disable"){
      const result = await CarModel.updateOne(
        { _id: req.body.vehicleId },
        { $set: {carStatus:"Disabled"} }
      );
      return res.status(200).json({ message: "sucess", data: result });
    }

    const data = {
      carNumber: req.body.userInput?.CarNumber,
      carMake: req.body.userInput?.CarMake,
      carModel: req.body.userInput?.CarModel,
      manufactureYear: req.body.userInput?.ManufactureYear,
      kmDriven: req.body.userInput?.KmsDriven,
      availableLocation: req.body.userInput?.AvailableLocation,
      fuelType: req.body.userInput?.FuelType,
      transmission: req.body.userInput?.Transmission,
      seatCapacity: req.body.userInput?.SeatCapacity,
      category: req.body.userInput?.Category,
      actualPrice: req.body.userInput?.ActualPrice,
      rentingPrice: req.body.userInput?.RentingPrice,
      feature: req.body.feature,
    };
    const result = await CarModel.updateOne(
      { _id: req.body.vehicleId },
      { $set: data }
    );


    return res.status(200).json({ message: "sucess", data: result });
  } catch (err) {
    console.log(`error - >${err.message}`);
    return res.status(500).json({ message: "error", error: err.message });
  }
};

export const deleteVehicle = async (req, res) => {
  try {

    const {vehicleId, userId} = req.body


    const result = await CarModel.deleteOne(
      { _id: vehicleId }
    );


    return res.status(200).json({ message: "sucess", data: result });
  } catch (err) {
    console.log(`error - >${err.message}`);
    return res.status(500).json({ message: "error", error: err.message });
  }
};

export const viewVehicle = async (req, res) => {
  try {
    let userId = req.query.userId;
    let result = await CarModel.find({ userId: userId }).exec();
    res.status(201).send({ message: "sucess", result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error", error: error });
  }
};

export const carList_home = async (req, res) => {
  try {
    let filter = req.query.filter;
    let pageNumber = req.query.pageNumber;
    let limit = req.query.limit;
    let pageCount = 0 
    let result;
    if (filter == "ALL") {
      result = await CarModel.find({ isVerified: true })
        .skip(4*pageNumber)
        .limit(limit)
        .exec();
      pageCount = await CarModel.find({ isVerified: true }).count()
      pageCount = pageCount/limit
    } else if (filter == "AUTOMATIC") {
      result = await CarModel.find({ transmission: filter, isVerified: true })
        .limit(4 * pageNumber)
        .exec();
    } else if (filter == "MANUAL") {
      result = await CarModel.find({ transmission: filter, isVerified: true })
        .limit(4 * pageNumber)
        .exec();
    } else if (filter == "DIESEL") {
      result = await CarModel.find({ fuelType: filter, isVerified: true })
        .limit(4 * pageNumber)
        .exec();
    } else if (filter == "PETROL") {
      result = await CarModel.find({ fuelType: filter, isVerified: true })
        .limit(4 * pageNumber)
        .exec();
    } else {
      result = await CarModel.find({ isVerified: true })
        .limit(4 * pageNumber)
        .exec();
    }
    res.status(201).send({ message: "sucess", result, pageCount });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error", error: error });
  }
};

export const vehicleDetails = async (req, res) => {
  try {
    let vehicleId = req.query.vehicleId;

    let result = await CarModel.find({ _id: vehicleId }).exec();
    res.status(201).send({ message: "sucess", result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error", error: error });
  }
};

export const activeDayChange = async (req, res) => {
  try {
    console.log("active days are ", req.body.newDate);

    console.log("active userID is ", req.body.vehicleId);

    const result = await CarModel.updateOne(
      { _id: req.body.vehicleId },
      { $set: { availableDates: [req.body.newDate] } }
    );
    console.log(result);
    return res.status(200).json({ message: "sucess", data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error", error: error });
  }
};



export const carList_search = async (req, res) => {
  try {
    let filter = req.query.filter;
    let pageNumber = req.query.pageNumber;
    let location = req.query.location;
    let startDate = req.query.startDate;
    let endDate = req.query.endDate;
    let result;

    if (filter == "ALL") {
      result = await CarModel.find({
        isVerified: true,
        availableLocation: location,
        availableDates: {
          $elemMatch: {
            startDate: { $lte: endDate },
            endDate: { $gte: startDate },
          },
        },
        bookedDates: {
          $not: {
            $elemMatch: {
              startDate: { $lte: endDate },
              endDate: { $gte: startDate },
            },
          },
        },
      })
        // .limit(4 * pageNumber)
        .exec();
    } else if (filter == "AUTOMATIC" || filter == "MANUAL") {
      result = await CarModel.find({
        transmission: filter,
        isVerified: true,
        availableLocation: location,
        availableDates: {
          $elemMatch: {
            startDate: { $lte: endDate },
            endDate: { $gte: startDate },
          },
        },
        bookedDates: {
          $not: {
            $elemMatch: {
              startDate: { $lte: endDate },
              endDate: { $gte: startDate },
            },
          },
        },
      })
        // .limit(4 * pageNumber)
        .exec();
    } else if (filter == "DIESEL" || filter == "PETROL") {
      result = await CarModel.find({
        fuelType: filter,
        isVerified: true,
        availableLocation: location,
        availableDates: {
          $elemMatch: {
            startDate: { $lte: endDate },
            endDate: { $gte: startDate },
          },
        },
        bookedDates: {
          $not: {
            $elemMatch: {
              startDate: { $lte: endDate },
              endDate: { $gte: startDate },
            },
          },
        },
      })
        // .limit(4 * pageNumber)
        .exec();
    } else {
      result = await CarModel.find({
        isVerified: true,
        availableLocation: location,
      })
        // .limit(4 * pageNumber)
        .exec();
    }

    res.status(200).send({ message: "sucess", result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error", error: error });
  }
};






 
