import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import jwt_decode from "jwt-decode";




function HostedCar(props) {
const navigate=useNavigate()

const disableCar = async (vehicleId)=>{
  try{
    let token = localStorage.getItem("admin_token");
    let decoded = jwt_decode(token);
    // props.setLoading(true)
    let serverRespose = await axios({
      method: "patch",
      url: "http://localhost:3000/api/v1/user/editVehicle",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("admin_token"),
      },
      data: {
        action:"Disable",
        vehicleId: vehicleId,
      },
    });
    // props.setLoading(false)
    if (serverRespose.data.message == "sucess") {
      props.setReload(!props.reload)
    } else {
      setError1("Please re-try after some time");
    }
  } catch (error) {
    props.setLoading(false)
    console.log(error.response);
    if (error.response?.status == 401) {
      localStorage.clear();
      navigate("/user/login");
    }
  }
  }
  
  
  const deleteCar = async (vehicleId,userId)=>{
    try{
      let token = localStorage.getItem("admin_token");
      let decoded = jwt_decode(token);
      // props.setLoading(true)
      let serverRespose = await axios({
        method: "delete",
        url: "http://localhost:3000/api/v1/user/editVehicle",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("admin_token"),
        },
        data: {
          vehicleId: vehicleId,
          userId:userId
        },
      });
      // props.setLoading(false)
      if (serverRespose.data.message == "sucess") {
        props.setReload(!props.reload)
      } else {
        setError1("Please re-try after some time");
      }
    } catch (error) {
      props.setLoading(false)
      console.log(error.response);
      if (error.response?.status == 401) {
        localStorage.clear();
        navigate("/user/login");
      }
    }
    }
  
  
  
    const handleDelete = (vehicleId,userId)=>{
  
      toast((t) => (
        <span>
          Are You Realy Want to Delete Car ? <br></br>
          <div className="flex justify-center gap-5 align-middle mt-3">
          <button className='bg-green-500 w-20 h-10 rounded-lg text-white' 
          onClick={() => toast.dismiss(t.id)}>
            Dismiss
          </button>
  
          <button className='bg-red-500 w-20 h-10 rounded-lg text-white'
          onClick={() => {
            deleteCar(vehicleId,userId)
            toast.dismiss(t.id)}}>
            Delete
          </button>
          </div>
        </span>
      ));
    }
  
  
    const handleDisable = (vehicleId)=>{
      toast.success("dvsdvdv")
      toast((t) => (
        <span>
          Are You Realy Want to Disable Car ? <br></br>
          <div className="flex justify-center gap-5 align-middle mt-3">
          <button className='bg-green-500 w-20 h-10 rounded-lg text-white' 
          onClick={() => toast.dismiss(t.id)}>
            Dismiss
          </button>
  
          <button className='bg-red-500 w-20 h-10 rounded-lg text-white'
          onClick={() => {
  
            disableCar(vehicleId)
            toast.dismiss(t.id)}}>
            Disable
          </button>
          </div>
        </span>
      ));
    }





  return (
    <div className='px-10 mt-5'>
        

    <div className=' w-full h-full border-2 rounded-3xl border-neutral-100 shadow-2xl p-6 bg-slate-100'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4    w-full h-full  rounded-3xl'>
        <div className='bg-red-200 rounded-3xl my-auto w-[300px] h-[170px] shadow-xl  '>
            <img className=' object-fill  w-[300px] h-[170px] rounded-3xl' src={props.data?.images[0]?.image_url}></img>
        </div>
        <div className='bg-slate-100 rounded-xl ps-5 shadow-xl '>
            <h1 className='mt-5 font-bold'>{props.data.carMake} {props.data.carModel}</h1>
            <p className='mt-2'>{props.data.carNumber}</p>
            <p className='mt-3'>Car Status:{props.data.carStatus}</p>
            <p className='mt-3'>Available Dates:</p>
            <p className='mt-1 text-right'> {props.data.availableDates[0]?.startDate}  to  {props.data.availableDates[0]?.endDate}</p>
            <p className='mt-2'>Rs.{props.data.rentingPrice}/day</p> 
        </div>

        <div className='bg-slate-100 rounded-xl flex flex-col gap-3  p-4 shadow-xl '>
            <button 
            onClick={()=>{
              navigate(`/user/editVehicle/${props.data._id}`)
            }}
            className='shadow-xl border-2 p-2  border-neutral-300 rounded-3xl hover:bg-slate-400 active:bg-slate-600 w-3/4 mx-auto'>Edit Car Details</button>
           

           {props.data.carStatus=="Disabled" ? null :
           <button 
            onClick={()=>{
              props.carId(props.data._id)
              props.modal(true)
            }}
            className=' shadow-xl border-2 p-2  border-neutral-300 rounded-3xl hover:bg-slate-400 active:bg-slate-600 w-3/4 mx-auto'
            >Change Active Days
            </button>}





           
            {/* <button 
            onClick={()=>{
              props.carId(props.data._id)
              props.modal(true)
            }}
            className=' shadow-xl border-2 p-2  border-neutral-300 rounded-3xl hover:bg-slate-400 active:bg-slate-600 w-3/4 mx-auto'
            >Change Active Days
            </button> */}


            {props.data.bookedDates.length==0 ?
            <button 
            onClick={()=>{handleDelete(props.data._id ,props.data.userId)}}
            className='shadow-xl border-2 p-2  border-neutral-300 rounded-3xl hover:bg-slate-400 active:bg-slate-600 w-3/4 mx-auto'
            >Delete Car 
            </button>
            :(
              props.data.carStatus=="Disabled" ? null :
              <button 
              onClick={()=>{handleDisable(props.data._id)}}
              className='shadow-xl border-2 p-2  border-neutral-300 rounded-3xl hover:bg-slate-400 active:bg-slate-600 w-3/4 mx-auto'
              >Disable Car
              </button>
            )

            }

        </div>
        <div className='bg-slate-100 rounded-xl flex flex-col gap-3  p-4 shadow-xl '>
            {/* <button className='shadow-xl border-2 p-2  border-neutral-300 rounded-3xl hover:bg-slate-400 active:bg-slate-600 w-3/4 mx-auto'>Get Reports</button> */}
            <button 
            onClick={()=>{navigate(`/user/showBookings/${props.data._id}`)}}
            className='shadow-xl border-2 p-2  border-neutral-300 rounded-3xl hover:bg-slate-400 active:bg-slate-600 w-3/4 mx-auto'>Show Bookings</button>
            
        </div>
      </div>
    </div>
    </div>
  )
}

export default HostedCar
