import React, {useState,useEffect} from 'react'
import Datepicker from "react-tailwindcss-datepicker"; 
import toast, { Toaster } from 'react-hot-toast';
import axios from '../../utils/axiosInterceptor_user'
import {CgSpinner} from 'react-icons/cg'


function Modal_ActiveDays({visible,carId,modalClose,userId,getCarDetails}) {

  const [loading,setLoading] =useState(false)
  const [newDate, setNewDate] = useState({startDate: new Date(), endDate: new Date().setMonth(11) });
 
  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue); 
    setNewDate(newValue); 
    } 

  const handleClose = (e)=>{
    if(e.target.id=='container'){
      setLoading(false)
      modalClose()
    }
  }

  const updateDate = async()=>{
    setLoading(true)
    try {
      let serverRespose = await axios({
        method: "post",
        url: "/activeDays",
        // headers: {
        //   Authorization: "Bearer " + localStorage.getItem("token"),
        // },
        data: {
          newDate,
        vehicleId: carId
        },
      });
      setLoading(false)
      if (serverRespose.data.message == "sucess") {
        setLoading(false)
        toast.success('Date Updated')
        
        setTimeout(modalClose, 1000);
        setTimeout(()=>getCarDetails(userId), 1000);

       
      } else {
        setError1("Please re-try after some time");
      }
    } catch (error) {
      console.log(error)
      if (error.response.status == 401) {
        localStorage.clear();
        navigate("/user/login");
      }
    }





    console.log("data is", newDate )


  }




  if(!visible){
       return null; 
  }

  return (
    <div 
    id='container'
    onClick={handleClose}
    className='bg-black bg-opacity-50 h-full w-full fixed inset-0 flex justify-center items-center text-white'>
      <div className="h-1/2 w-1/2 bg-white rounded-xl  opacity-100 ">
    <div className="mx-auto my-auto">
      <h1 className='text-black font-medium text-lg ms-10 mt-10'>Change Active Days</h1>
        <div className="mx-auto w-1/2 mt-10 mb-10 ">
        <Datepicker 
            value={newDate} 
            inputClassName=" rounded-md font-normal text-2xl bg-white text-black h-20 w-full lg:h-full  " 
            displayFormat={"DD/MM/YYYY"}
            minDate={new Date(new Date().getTime()-24*60*60*1000)} 
            separator={"to"} 
            readOnly={true} 
            popoverDirection="down" 
            onChange={handleValueChange} /> 
      </div>

      <div className="flex justify-center items-center  gap-5">
          <button className="bg-red-700 p-3 rounded-md w-1/3 " 
          onClick={()=>{
            setLoading(false)
            modalClose()        
          }}>Cancel </button>

          <button 
          onClick={updateDate}
          className="bg-green-700 p-3 rounded-md w-1/3 flex justify-center " >
              {loading && 
              <CgSpinner size={20} className=' animate-spin'/>
              }
            <span className='ms-2'>  Update  </span> </button>

      </div>



    </div>



   


      </div>
      
      <Toaster />
    </div>
  )
}

export default Modal_ActiveDays
