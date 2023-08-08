import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router'
import axios from '../../utils/axiosInterceptor_user';
import jwt_decode from 'jwt-decode'
import toast, { Toaster } from 'react-hot-toast';




function MyBookings(props) {



    const navigate=useNavigate();

  const handleCancel =()=>{
    toast((t) => (
      <span>
        Are You Realy Want to Cancel Booking ? <br></br>
        <div className="flex justify-center gap-5 align-middle">
        <button className='bg-green-500 w-20 h-10 rounded-lg' 
        onClick={() => toast.dismiss(t.id)}>
          Dismiss
        </button>

        <button className='bg-red-500 w-20 h-10 rounded-lg '
        onClick={() => {
          cancelBooking()
          toast.dismiss(t.id)}}>
          Proceed
        </button>
        </div>
      </span>
    ));
  }

    const cancelBooking = async () => {
      try {
        let token = localStorage.getItem("token");
        let decoded = jwt_decode(token);
        let userId = decoded.userId;
  
  
        let serverRespose = await axios({
          method: "patch",
          url: "/booking",
          data: {
            bookingId:props.bookingList._id
          },
          // headers: {
          //   Authorization: "Bearer " + localStorage.getItem("token"),
          // },
        });
        if (serverRespose.data.message == "sucess") {
         
          toast.success('Updated Successfully')
          props.getBookingList(userId)
  
        } else {
          setError1("Please re-try after some time");
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


    const handleReturn =()=>{
      toast((t) => (
        <span>
          Are You Realy Want to Return Vehicle ? <br></br>
          <div className="flex justify-center gap-5 align-middle">
          <button className='bg-green-500 w-20 h-10 rounded-lg' 
          onClick={() => toast.dismiss(t.id)}>
            Dismiss
          </button>
  
          <button className='bg-red-500 w-20 h-10 rounded-lg '
          onClick={() => {
            returnVehicle()
            toast.dismiss(t.id)}}>
            Proceed
          </button>
          </div>
        </span>
      ));
    }

    const returnVehicle = async () => {
      try {
        let token = localStorage.getItem("token");
        let decoded = jwt_decode(token);
        let userId = decoded.userId;
    
        let serverRespose = await axios({
          method: "patch",
          url: "http://localhost:3000/api/v1/user/hostBookingList",
          data: {
            bookingId:props.bookingList._id,
            bookingStatus:"Returned"
          },
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (serverRespose.data.message == "sucess") {
         
          toast.success('Updated Successfully')
          props.getBookingList(userId)
    
        } else {
          setError1("Please re-try after some time");
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
    <div className='px-3 mt-5'>
        

    <div className=' w-full h-36 border-2 rounded-3xl border-neutral-100 shadow-2xl p-2 bg-slate-100'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 xl:grid-cols-12    w-full h-24 rounded-3xl'>
        
        
        <div className='bg-red-200 my-auto rounded-3xl w-full h-[100px] shadow-xl col-span-3  '>
            <img className=' object-fill  w-[250px] h-[100px] rounded-3xl' src={props.bookingList?.carDetails?.images[0].image_url} alt='Photo'></img>
        </div>



        <div className='bg-slate-100 ps-5   col-span-4 h-full border-e-2'>
            <h1 className='mt-0 font-bold'>{props.bookingList?.carDetails?.carMake} {props.bookingList?.carDetails?.carModel}</h1>
            <p className='mt-0'>{props.bookingList?.carDetails?.carNumber}</p>
            <p className='mt-0'>Rs. {props.bookingList?.carDetails?.rentingPrice}/Day</p>
            <p className='mt-0'>Total Rs: {props.bookingList?.amount}</p>
            <p className='mt-0'>Payment Status: {props.bookingList?.paymentStatus}</p>

        </div>



        



        <div className='bg-slate-100 rounded-xl  ps-5   col-span-5 '>
           <p className='mt-0'>Booking Days: {props.bookingList?.datesBooked?.startDate}  to  {props.bookingList?.datesBooked?.endDate}</p>
           <p className='mt-0'>Booking Status: {props.bookingList?.bookingStatus}</p>
           {props.bookingList?.bookingStatus=="Handed Over" || props.bookingList?.bookingStatus=="Cancelled" || props.bookingList?.bookingStatus=="Returned" ||props.bookingList?.bookingStatus=="Booked" || props.bookingList?.bookingStatus=="Completed" ?  
            null
            :
            <p className='mt-0'>OTP for vehicle Accept: <span className='bg-red-500 px-2 text-white'> {props.bookingList?.OTP} </span></p>
           }
          


          <div className="flex flex-row mt-1">
            
            {props.bookingList?.bookingStatus=="Handed Over" ?   
            <button onClick={()=>{
              handleReturn();
            }}
            className='shadow-xl border-2 px-2   rounded-xl text-white bg-red-500 hover:bg-red-600 active:bg-slate-600 w-40 mx-auto'>
            Return Vehicle</button>
            
            :    
            null
            }
            {props.bookingList?.bookingStatus=="Confirmed" || props.bookingList?.bookingStatus=="Booked" ? 

            <button onClick={()=>{
              handleCancel();
            }}
            className='shadow-xl border-2 px-2 h-12 mt-3  rounded-xl text-white bg-red-500 hover:bg-red-600 active:bg-slate-600 w-40 mx-auto'>
            Cancel Booking</button>
            :
              null
            }

           
            {/* <button className=' shadow-xl border-2 px-2   rounded-xl text-white bg-green-500 hover:bg-green-600 active:bg-slate-600 w-40 mx-auto'>Give <br></br> Rating</button> */}
            <button 
            onClick={()=> navigate(`/user/bookingDetails/${props.bookingList?._id}`)}
            className='shadow-xl border-2 px-2 h-12 mt-3   rounded-xl text-white bg-green-500 hover:bg-green-600 active:bg-slate-600 w-40 mx-auto'>Details</button>



          </div>
          
        </div>









      </div>
    </div>
    </div>
  )
}

export default MyBookings
