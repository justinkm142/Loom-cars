import { BookingModel } from "../../Model/bookingModel.js";
import {UserModel} from "../../Model/userModel.js"
import { CarModel } from "../../Model/carModel.js";

import mongoose from "mongoose";


export const dashboardData = async (req, res) => {
    try {
        const totalEarning = await BookingModel.aggregate([
            {
              '$match': {
                'paymentStatus': 'success'
              }
            }, {
              '$match': {
                'bookingStatus': {
                  '$ne': 'Cancelled'
                }
              }
            }, {
              '$group': {
                '_id': null, 
                'totalRevenue': {
                  '$sum': '$amount'
                }
              }
            }
          ])


          const bookingsByMonth = await BookingModel.aggregate([
            {
              $match: {bookingStatus:{$ne:"Cancelled"} }},
              {$match:{paymentStatus:"success"}},
              {$group: {
                _id: {
                  month: { $month: '$createdAt' },
                  year: { $year: '$createdAt' },
                },
                count: { $sum: 1 },
                totalAmount: { $sum: '$amount' },
              },
            },
            {
              $sort: { '_id.year': 1, '_id.month': 1 },
            },
          ]);



          const totalUser = await UserModel.count()

          const totalCar = await CarModel.count()

          console.log("total eraning is ",bookingsByMonth)



    return res.status(200).json({ message: "sucess", totalEarning:totalEarning[0].totalRevenue, totalUser, totalCar, graphData:bookingsByMonth});

    } catch (err) {
      console.log(err);
      
      return res.status(500).json({message: "error", error: "Server Error! Please try after some time" });
    }
  };

