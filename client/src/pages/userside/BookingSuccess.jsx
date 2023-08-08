import React, { useEffect, useState } from 'react'
import {BsCheckCircle} from 'react-icons/bs'
import { useNavigate,useParams } from 'react-router-dom'
import axios from '../../utils/axiosInterceptor_user'

function BookingSuccess() {
    const [bookingDetails, setBookingDeatils] =useState({})
    const navigate = useNavigate();
    const { bookingId } = useParams();

    useEffect(()=>{
        getBookingData()
    },[])

const getBookingData= async ()=>{
    try {
        let serverRespose = await axios({
            method: "get",
            url: "/booking",
            params: {
                bookingId: bookingId,
            },
          });
         
          if (serverRespose.data.message == "sucess") {
            setBookingDeatils((pre) => {
              return {...serverRespose.data.result};
            });
          } else {
            setError1("Please re-try after some time");
          }





    } catch (error) {
        console.log(error)
    }
}


const getCarDetails = async (vehicleId) => {
    try {
      
    } catch (error) {
      console.log(error);
    }
  };

 
// const startDate=;

// console.log(startDate)







  return (
    <div>
      <div className=" w-1/2 h-3/4 flex flex-col gap-5 justify-center items-center mx-auto mt-10">
        <h1 className='text-5xl text-green-500'> Booking Successfull </h1>
        <div className="text-green-500 mt-10">
        <BsCheckCircle size={60}/>
        </div>
        <div className=" flex justify-between w-full">
            <p className="">Booking Id : </p>
            <p className="">{bookingId}</p>
        </div>
        <div className=" flex justify-between w-full">
            <p className="">Name : </p>
            <p className="">{bookingDetails.name}</p>
        </div>
        <div className=" flex justify-between w-full">
            <p className="">Email: </p>
            <p className="">{bookingDetails.email}</p>
        </div>
        <div className=" flex justify-between w-full">
            <p className="">Total Amount paid: </p>
            <p className="">Rs. {bookingDetails.amount}/-</p>
        </div>
        <div className=" flex justify-between w-full">
            <p className="">Booked Dated: </p>
            <p className="">{bookingDetails.datesBooked ?  bookingDetails.datesBooked[0].startDate : null} to  
                            {bookingDetails.datesBooked ?  bookingDetails.datesBooked[0].endDate : null}
            </p>
        </div>
        <div className=" flex justify-center w-full mt-10">
           <button onClick={()=>{
                navigate("/user/home")
           }}
           className=" px-5 bg-green-500 text-white py-2 rounded-md text-xl">Go to Home</button>
           <button onClick={()=>{
                navigate("/user/profile/booking")
           }}
           className=" px-5 bg-green-500 text-white py-2 rounded-md text-xl ms-5">Go to Bookings</button>
        </div>


      </div>
    </div>
  )
}

export default BookingSuccess
