import React,{useEffect} from 'react'
import { useNavigate } from 'react-router'




function HostedCar(props) {



    const navigate=useNavigate()
  return (
    <div className='px-10 mt-5'>
        

    <div className=' w-full h-full border rounded-3xl border-neutral-700 bg-slate-100 p-6'>
      <div className='grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4    w-full h-full  rounded-3xl'>
        <div className='bg-slate-200 rounded-3xl my-auto w-full h-full '>
            <img className=' object-fill my-auto  w-[300px] h-[170px] rounded-3xl' src={props.data.images[0].image_url}></img>
        </div> 
        <div className='bg-slate-200 rounded-3xl ps-5 '>
            <h1 className='mt-5 font-bold'>{props.data?.carMake} {props.data?.carModel}</h1>
            <p className='mt-5'>{props.data?.carNumber}</p>
            <p className='mt-3'>Car Status:{props.data?.carStatus}</p>
            <p className='mt-5'>Rs.{props.data?.rentingPrice}/day</p> 
        </div>
        <div className='bg-slate-200 rounded-3xl flex flex-col gap-3  p-4'>
            <button className='boarder-2 p-2 border border-black rounded-3xl hover:bg-slate-400 active:bg-slate-600 w-3/4 mx-auto'>Edit Car Details</button>
            <button className='boarder-2 p-2 border border-black rounded-3xl hover:bg-slate-400 active:bg-slate-600 w-3/4 mx-auto'>Change Active Days</button>
            <button className='boarder-2 p-2 border border-black rounded-3xl hover:bg-slate-400 active:bg-slate-600 w-3/4 mx-auto'>Change Car Price</button>
        </div>
        <div className='bg-slate-200 rounded-3xl flex flex-col gap-3  p-4'>
            <button className='boarder-2 p-2 border border-black rounded-3xl hover:bg-slate-400 active:bg-slate-600 w-3/4 mx-auto'>Get Reports</button>
            <button className='boarder-2 p-2 border border-black rounded-3xl hover:bg-slate-400 active:bg-slate-600 w-3/4 mx-auto'>Show Bookings</button>
            
        </div>
      </div>
    </div>
    </div>
  )
}

export default HostedCar
