import React,{useState} from 'react'
import { useNavigate } from 'react-router'
import toast, { Toaster } from 'react-hot-toast';




function VerifyCar(props) {

    const navigate=useNavigate()

    const handleVerify = ()=>{

      toast((t) => (
        <span>
          Are You Realy Want to Verify Car ? <br></br>
          <div className="flex justify-center gap-5 align-middle mt-3">
          <button className='bg-green-500 w-20 h-10 rounded-lg text-white' 
          onClick={() => toast.dismiss(t.id)}>
            Dismiss
          </button>
  
          <button className='bg-red-500 w-20 h-10 rounded-lg text-white'
          onClick={() => {
            props.changeVehicleStatus(props.carData._id)
            toast.dismiss(t.id)}}>
            Verify
          </button>
          </div>
        </span>
      ));
    }






  return (
    <div className='px-10 mt-5'>
    <div className=' w-full h-full border rounded-3xl border-neutral-700 p-6'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3  rounded-3xl'>
        <div className='bg-red-200 rounded-3xl my-auto align- '>
            <img className=' object-fill h-52 mx-auto  rounded-3xl' src={props.carData?.images[0]?.image_url} alt='abcd'></img>
        </div>
        <div className='bg-slate-100 rounded-3xl ps-5 ms-1 '>
            <h1 className='mt-5 font-bold'> {props.carData?.carMake} {props.carData?.carModel}</h1>
            <p className='mt-5'>{props.carData?.carNumber}</p>
            <p className='mt-3'>Car Status :{props.carData?.carStatus}</p>
            <p className='mt-3'>Location : {props.carData?.availableLocation}</p> 
            <p className='mt-3'>Rs.{props.carData?.rentingPrice}/day</p> 
        </div>
        <div className='bg-slate-100 rounded-3xl flex flex-col gap-3  p-4'>
            <p className='mt-3'>Owners Name : {props.carData?.userDetails.name} </p> 
            <p className='mt-3'>Email :{props.carData?.userDetails.email} </p> 
            <p className='mt-3'>Phone :{props.carData?.userDetails.phone} </p> 

            <div className='grid grid-cols-5'>
           
              <button 
                onClick={()=>{
                  handleVerify()
                }}
                className=' col-span-5 boarder-2 p-1 border bg-red-600 text-white font-bold border-black rounded-xl hover:bg-red-800 active:bg-slate-600 w-3/4 mx-auto'>
                Verify Vehicle
              </button>
            </div>
        </div>

      </div>
    </div>
    </div>
  )
}

export default VerifyCar
