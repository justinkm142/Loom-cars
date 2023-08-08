import React, {useEffect,useState} from "react";
import { useNavigate } from 'react-router'
import axios from '../../utils/axiosInterceptor_admin';
import jwt_decode from 'jwt-decode'
import toast, { Toaster } from 'react-hot-toast';






function Tables_booking(props) {

  const navigate =useNavigate()

  const[otp,setOtp] =useState(0)


const handleCancel =(bookingId)=>{
  toast((t) => (
    <span>
      Are You Realy Want to Cancel Booking ? <br></br>
      <div className="flex justify-center gap-5 align-middle">
      <button className='bg-green-500 w-20 h-10 rounded-lg text-white' 
      onClick={() => toast.dismiss(t.id)}>
        Dismiss
      </button>

      <button className='bg-red-500 w-20 h-10 rounded-lg text-white '
      onClick={() => {
        cancelBooking(bookingId)
        toast.dismiss(t.id)}}>
        Proceed
      </button>
      </div>
    </span>
  ));
}

const cancelBooking = async (bookingId) => {
  try {
    let token = localStorage.getItem("token");
    let decoded = jwt_decode(token);
    let userId = decoded.userId;


    let serverRespose = await axios({
      method: "patch",
      url: "/booking",
      data: {
        bookingId:bookingId,
        bookingStatus:"Cancelled"
      },
      // headers: {
      //   Authorization: "Bearer " + localStorage.getItem("token"),
      // },
    });
    if (serverRespose.data.message == "sucess") {
     
      toast.success('Updated Successfully')
      props.getBookingData()

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

const handleConfirm = async (bookingId) => {
  try {
    let token = localStorage.getItem("token");
    let decoded = jwt_decode(token);
    let userId = decoded.userId;

    let serverRespose = await axios({
      method: "patch",
      url: "/booking",
      data: {
        bookingId:bookingId,
        bookingStatus:"Confirmed"
      },
      // headers: {
      //   Authorization: "Bearer " + localStorage.getItem("token"),
      // },
    });
    if (serverRespose.data.message == "sucess") {
     
      toast.success('Updated Successfully')
      props.getBookingData()

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


const handleHandingOver =(bookingId,OTP,action) => {



toast((t) => (
  
  <span>
    Please Enter OTP <br></br>
    <input onChange={(e)=>setOtp(()=>e.target.value)}
    type="Number" className=" my-5 border-2"></input>
    <br></br>
    <div className="flex justify-center gap-5 align-middle">
    <button className='bg-green-500 w-20 h-10 rounded-lg' 
    onClick={() => toast.dismiss(t.id)}>
      Dismiss
    </button>

    <button className='bg-red-500 w-20 h-10 rounded-lg '
    onClick={() => {
    
      if(otp==OTP){
        handingOver(bookingId,OTP,action)
        toast.dismiss(t.id)
      }else{
        toast.dismiss(t.id)
        toast.error("OTP Not Matching");
      }
      
      }}>
      Submitt
    </button>
    </div>
  </span>
));
};



const handingOver = async (bookingId,OTP,action) => {
  try {
    let token = localStorage.getItem("token");
    let decoded = jwt_decode(token);
    let userId = decoded.userId;

    let serverRespose = await axios({
      method: "patch",
      url: "/booking",
      data: {
        bookingId:bookingId,
        bookingStatus:action,
        OTP:OTP
      },
      // headers: {
      //   Authorization: "Bearer " + localStorage.getItem("token"),
      // },
    });
    if (serverRespose.data.message == "sucess") {
     
      toast.success('Updated Successfully')
      props.getBookingData()

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


const handleReturn = async (bookingId,action) => {
  try {
    let token = localStorage.getItem("token");
    let decoded = jwt_decode(token);
    let userId = decoded.userId;

    let serverRespose = await axios({
      method: "patch",
      url: "/booking",
      data: {
        bookingId:bookingId,
        bookingStatus:action,
      },
      // headers: {
      //   Authorization: "Bearer " + localStorage.getItem("token"),
      // },
    });
    if (serverRespose.data.message == "sucess") {
     
      toast.success('Updated Successfully')
      props.getBookingData()

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



  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 text-sm bg-white rounded-2xl">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-0 py-2 font-medium text-gray-900">
              Sl No.
            </th>
            <th className="whitespace-nowrap px-0 py-2 font-medium text-gray-900">
              Name
            </th>
            <th className="whitespace-nowrap px-0 py-2 font-medium text-gray-900">
              Car No.
            </th>
            <th className="whitespace-nowrap px-0 py-2 font-medium text-gray-900">
              Phone
            </th>
            <th className="whitespace-nowrap px-0 py-2 font-medium text-gray-900">
              Amount
            </th>
            <th className="whitespace-nowrap px-0 py-2 font-medium text-gray-900">
              Booked Date
            </th>
            <th className="whitespace-nowrap px-0 py-2 font-medium text-gray-900">
              Payment Status
            </th>
            <th className="whitespace-nowrap px-0 py-2 font-medium text-gray-900">
              Booking Status
            </th>
            <th className="whitespace-nowrap px-0 py-2 font-medium text-gray-900">
              Action
            </th>
            <th className="px-0 py-2"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
            {props.bookings.map((data,index)=>{
                return(
                    <tr key={data._id}> 
                    <td className="whitespace-nowrap px-4 py-1 font-medium text-gray-900 text-center">
                    {10*(props.page-1)+index+1}
                    </td>
                    <td className="whitespace-nowrap px-4 py-1 text-gray-700 text-center">
                     { data.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-1 text-gray-700 text-center">
                    { data.carDetails?.carNumber}
                    </td>
                    <td className="whitespace-nowrap px-4 py-1 text-gray-700 text-center">
                    { data.phone}
                    </td>
                    <td className="whitespace-nowrap px-4 py-1 text-gray-700 text-center">
                    { data.amount}
                    </td>
                    <td className={`whitespace-nowrap px-4 py-1 text-gray-700 text-center `}>
                    { data.datesBooked[0].startDate} to { data.datesBooked[0].endDate}
                    </td>
                    <td className={`whitespace-nowrap px-4 py-1 text-gray-700 text-center `}>
                    { data.paymentStatus} 
                    </td>
                    <td className={`whitespace-nowrap px-4 py-1 text-gray-700 text-center `}>
                    { data.bookingStatus} 
                    </td>
                    <td className={`whitespace-nowrap px-4 py-1 flex justify-end text-gray-700 text-center `}>
                    {data.bookingStatus=="Booked" &&  data.paymentStatus=="success" ?
                    <div className="">

                    <button onClick={()=>{
                      handleConfirm(data._id)
                    }} 
                    className="border p-1 rounded-lg hover:bg-slate-300 active:bg-slate-500 ">
                    Confirm
                    </button>

                    <button onClick={()=>{
                      handleCancel(data._id);
                    }} 
                    className="border p-1 rounded-lg hover:bg-slate-300 active:bg-slate-500 ms-1">
                    Cancel
                    </button>
                    </div>
                    :
                    null
                    }


                    {data.bookingStatus=="Booked" && data.paymentStatus=="pending"  ?
                    <button onClick={()=>{
                      handleCancel(data._id);
                    }}
                    className="border p-1 rounded-lg hover:bg-slate-300 active:bg-slate-500">
                    Cancel
                    </button>
                    :
                    null
                    }

                    {data.bookingStatus=="Confirmed" ?
                    <button onClick={()=>{
                      handleHandingOver(data._id,data.OTP,"Handed Over")
                    }}
                    className="border p-1 rounded-lg hover:bg-slate-300 active:bg-slate-500">
                    HandOver <br></br>Vehicle
                    </button>
                    :
                    null
                    }

                    {data.bookingStatus=="Returned" ?
                    <button onClick={()=>{
                      handleReturn(data._id,"Completed")
                    }}
                    className="border p-1 px-3 rounded-lg hover:bg-slate-300 active:bg-slate-500">
                    Accept <br></br>Vehicle
                    </button>
                    :
                    null
                    }
                    
                    <button onClick={()=>{
                      navigate("/admin/bookingsDetails/"+data._id)
                    }}
                    className="border ms-2 p-1 rounded-lg hover:bg-slate-300 active:bg-slate-500">Details</button>
                    </td>

                  </tr>

            )})}

         

        </tbody>
      </table>
    </div>
  );
}

export default Tables_booking;
