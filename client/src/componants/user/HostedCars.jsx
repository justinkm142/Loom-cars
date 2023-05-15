import React,{useEffect} from 'react'
import { useNavigate } from 'react-router'




function HostedCars(props) {



    const navigate=useNavigate()
  return (
    <div className='px-10 mt-5'>
        

    <div className=' w-full h-full border-2 rounded-3xl border-neutral-100 shadow-2xl p-6 bg-slate-100'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4    w-full h-full  rounded-3xl'>
        <div className='bg-red-200 rounded-3xl my-auto w-[300px] h-[170px] shadow-xl  '>
            <img className=' object-fill  w-[300px] h-[170px] rounded-3xl' src={props.data.images[0].image_url}></img>
        </div>
        <div className='bg-slate-100 rounded-xl ps-5 shadow-xl '>
            <h1 className='mt-5 font-bold'>{props.data.carMake} {props.data.carModel}</h1>
            <p className='mt-2'>{props.data.carNumber}</p>
            <p className='mt-3'>Car Status:{props.data.carStatus}</p>
            <p className='mt-3'>Available Dates:</p>
            <p className='mt-1 text-right'> {props.data.availableDates[0]?.startDate}  to  {props.data.availableDates[0]?.endDate}</p>
            <p className='mt-2'>Rs.{props.data.rentingPrice}/day</p> 
        </div>
        {console.log("available  dates are " , props.data.availableDates)}
        <div className='bg-slate-100 rounded-xl flex flex-col gap-3  p-4 shadow-xl '>
            <button className='shadow-xl border-2 p-2  border-neutral-300 rounded-3xl hover:bg-slate-400 active:bg-slate-600 w-3/4 mx-auto'>Edit Car Details</button>
            <button 
            onClick={()=>{
              props.carId(props.data._id)
              props.modal(true)
            }}
            className=' shadow-xl border-2 p-2  border-neutral-300 rounded-3xl hover:bg-slate-400 active:bg-slate-600 w-3/4 mx-auto'>Change Active Days</button>
            <button className='shadow-xl border-2 p-2  border-neutral-300 rounded-3xl hover:bg-slate-400 active:bg-slate-600 w-3/4 mx-auto'>Change Car Price</button>
        </div>
        <div className='bg-slate-100 rounded-xl flex flex-col gap-3  p-4 shadow-xl '>
            <button className='shadow-xl border-2 p-2  border-neutral-300 rounded-3xl hover:bg-slate-400 active:bg-slate-600 w-3/4 mx-auto'>Get Reports</button>
            <button className='shadow-xl border-2 p-2  border-neutral-300 rounded-3xl hover:bg-slate-400 active:bg-slate-600 w-3/4 mx-auto'>Show Bookings</button>
            
        </div>
      </div>
    </div>
    </div>
  )
}

export default HostedCars
