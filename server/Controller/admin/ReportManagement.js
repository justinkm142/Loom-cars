
import { BookingModel } from "../../Model/bookingModel.js";

import mongoose from "mongoose";


export const getReport = async (req, res) => {
  try {
    // let result = await BookingModel.find().exec();

    const {page,filter} = req.query;
    console.log(req.query)

    if(filter =="ThisWeek" || filter =="LastWeek" ){

      let  currentDate = new Date();
      let startDate = new Date(currentDate.getFullYear(), 0, 1);
      let days = Math.floor((currentDate - startDate) /
          (24 * 60 * 60 * 1000));
       
      let weekNumber = Math.ceil(days / 7);
      weekNumber = (filter=="ThisWeek" ? weekNumber : weekNumber-1);

      console.log("week number is" , weekNumber ) 
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
          },
          {
            $addFields:{
               week: { $week: { $toDate: '$createdAt' }}
            }
          },{
            $match:{week:weekNumber}
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
              '$lookup': {
                'from': 'carmodels', 
                'localField': 'carId', 
                'foreignField': '_id', 
                'as': 'carDetails'
              }
            }, {
              '$unwind': {
                'path': '$carDetails'}
            },{
                '$project':{
                   'week': { $week: '$createdAt' }
                }
            },{
                $match:{week:weekNumber}
            },{
              $sort:{createdAt:-1}
            },{
              $count: "pageCount"
            }
   
        ])

        console.log("aggregate result is " , bookingData ) 
        console.log("count of dcumet is " , pageCount ) 

    const totalDocument = pageCount[0]?.pageCount%10==0 ? pageCount[0]?.pageCount/10: Math.floor(pageCount[0]?.pageCount/10)+1

    return res.status(200).json({ message: "sucess", result:bookingData, totalDocument });
    }

    if(filter =="ThisMonth" || filter =="LastMonth" ){

      let  currentDate = new Date();
      let monthNumber = currentDate.getMonth() + 1;        
      monthNumber = (filter=="ThisMonth" ? monthNumber : monthNumber-1);

      console.log("month number is" , monthNumber ) 
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
          },
          {
            $addFields:{
               month: { $month: { $toDate: '$createdAt' }}
            }
          },{
            $match:{month:monthNumber}
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
              '$lookup': {
                'from': 'carmodels', 
                'localField': 'carId', 
                'foreignField': '_id', 
                'as': 'carDetails'
              }
            }, {
              '$unwind': {
                'path': '$carDetails'}
            },{
                '$project':{
                   'month': { $month: '$createdAt' }
                }
            },{
                $match:{month:monthNumber}
            },{
              $sort:{createdAt:-1}
            },{
              $count: "pageCount"
            }
   
        ])

        console.log("aggregate result is " , bookingData ) 
        console.log("count of dcumet is " , pageCount ) 

    const totalDocument = pageCount[0]?.pageCount%10==0 ? pageCount[0]?.pageCount/10: Math.floor(pageCount[0]?.pageCount/10)+1

    return res.status(200).json({ message: "sucess", result:bookingData, totalDocument });
    }

    if(filter =="ThisYear" || filter =="LastYear" ){

      let  currentDate = new Date();
      let yearNumber = currentDate.getFullYear();        
      yearNumber = (filter=="ThisYear" ? yearNumber : yearNumber-1);

      console.log("month number is" , yearNumber ) 
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
          },
          {
            $addFields:{
               year: { $year: { $toDate: '$createdAt' }}
            }
          },{
            $match:{year:yearNumber}
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
              '$lookup': {
                'from': 'carmodels', 
                'localField': 'carId', 
                'foreignField': '_id', 
                'as': 'carDetails'
              }
            }, {
              '$unwind': {
                'path': '$carDetails'}
            },{
                '$project':{
                   'year': { $year: '$createdAt' }
                }
            },{
                $match:{year:yearNumber}
            },{
              $sort:{createdAt:-1}
            },{
              $count: "pageCount"
            }
        ])

        console.log("aggregate result is " , bookingData ) 
 

    const totalDocument = pageCount[0]?.pageCount%10==0 ? pageCount[0]?.pageCount/10: Math.floor(pageCount[0]?.pageCount/10)+1 || 1
    console.log("count of dcumet is " , totalDocument ) 
    return res.status(200).json({ message: "sucess", result:bookingData, totalDocument });
    }







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
        },{
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

       

    const totalDocument = pageCount[0].pageCount%10==0 ? pageCount[0].pageCount/10: Math.floor(pageCount[0].pageCount/10)+1


    return res.status(200).json({ message: "sucess", result:bookingData, totalDocument });

  } catch (err) {
    console.log(err);
    return res.status(500).json({message: "error", error: "Server Error! Please try after some time" });
  }
};

