import React, { useState,useEffect } from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import axios from '../../utils/axiosInterceptor_user';
import jwt_decode from 'jwt-decode'








function BookingDetails() {
    const { bookingId } = useParams();
    const [bookingDetails, setBookingDetails] =useState({})
    const navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem("token");
        if(!token){
          return navigate('/user/login')
        }
        let decoded = jwt_decode(token);
        let userId = decoded.userId;
      
        getBookingDetails();
      }, []);


      const getBookingDetails = async () => {
        try {
          let serverRespose = await axios({
            method: "get",
            url: "/booking/bookingDetails",
            params: {
                bookingId: bookingId,
            },
            // headers: {
            //   Authorization: "Bearer " + localStorage.getItem("token"),
            // },
          });
          if (serverRespose.data.message == "sucess") {
           
            setBookingDetails((pre) => {
              return serverRespose.data.result;
            });
          } else {
            toast.error("Somthing Went Wrong!");
          }
        } catch (error) {
          console.log(error);
          toast.error("Somthing Went Wrong!");
          if (error.response.status == 401) {
            localStorage.clear();
            navigate("/user/login");
          }
        }
      };




console.log(bookingDetails)




  return (
    <div>
      <div className="p-5 ps-20">
        <h1 className="text-center text-2xl font-semibold ">Booking Deatils </h1>
        <p className="">{bookingDetails?.carDetails?.availableLocation}</p>
        <p className="">Booking Id:{bookingDetails?._id} </p>
        <p className="">Booking Date:{bookingDetails?.createdAt} </p>

        <p className="py-2 bg-slate-300 my-2">Booking Information </p>
        
        <p className="">Booked Date: {bookingDetails?.datesBooked?.startDate} to {bookingDetails?.datesBooked?.endDate}</p>
        <p className="">No of Days:  {bookingDetails?.amount / bookingDetails?.carDetails?.rentingPrice } </p>
        <p className="">Total Amount: {bookingDetails?.amount}</p>
        <p className="">Payment Status:  {bookingDetails?.paymentStatus} </p>
        <p className="">Booking Status: {bookingDetails?.bookingStatus} </p>


        <p className="py-2 bg-slate-300 my-2">Car Information </p>
        
        <p className="">Car No: {bookingDetails?.carDetails?.carNumber} </p>
        <p className="">Car Make & Model: {bookingDetails?.carDetails?.carMake} {bookingDetails?.carDetails?.carModel} {bookingDetails?.carDetails?.manufactureYear} </p>
        <p className="">Seating Capacity: {bookingDetails?.carDetails?.seatCapacity} </p>

        <p className="py-2 bg-slate-300 my-2">Customer Information </p>
        
        <p className="">Name: {bookingDetails?.name} </p>
        <p className="">Email: {bookingDetails?.email} </p>
        <p className="">Phone: {bookingDetails?.phone} </p>

        <p className="py-2 bg-slate-300 my-2">Car Owner Information </p>
        
        <p className="">Name: {bookingDetails?.ownerDetails?.name} </p>
        <p className="">Email: {bookingDetails?.ownerDetails?.email}  </p>
        <p className="">Phone: {bookingDetails?.ownerDetails?.phone} </p>


      </div>
    </div>
  )
}

export default BookingDetails
