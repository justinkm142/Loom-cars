import React from 'react'
import {AiFillStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {MdOutlineCarCrash} from 'react-icons/md'

function VehicleDiscription(props) {
  return (
    <div className='w-full h-full grid grid-rows-2 '>
      <div className=" p-5 pb-0">
              <h1 className="title-font text-lg font-medium text-gray-900"> <span> {props.carDetails[0]?.carMake} </span>   <span>{props.carDetails[0]?.carModel}</span> <span> {props.carDetails[0]?.manufactureYear} </span> </h1>
              <p className="leading-relaxed mb-3 text-sm"><span> {props.carDetails[0]?.transmission} - </span> <span> {props.carDetails[0]?.fuelType} - </span> <span>  {props.carDetails[0]?.seatCapacity}  seats </span> </p>
              <h2 className="tracking-widest text-xs title-font font-medium text-black mb-1 flex gap-1"> <span className='text-orange-400'> <AiFillStar /> </span>4.88 (67 Trips)</h2>
              <div className="flex items-center flex-wrap mt-5 ">
                <h1 className="font-bold text-lg"> ₹ <span> {props.carDetails[0]?.rentingPrice} /Day</span></h1>
                <span className="text-gray-600 p-4 mr-2 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-2 border-gray-200">
                <ImLocation />  {props.carDetails[0]?.availableLocation} 
                </span>
              </div>
      </div>
      <div className="p-5 pt-0 pb-3 border-2 shadow-xl rounded-xl mx-6 mb-3 mt-1">
        <h1 className="title-font text-lg font-medium text-gray-900 underline"> Car Feactures </h1>
          <div className='bg-white grid grid-cols-3 mt-3 ps-20 border-2 py-3 shadow-xl rounded-xl '> 
          {props.carDetails[0]?.feature.map((data)=>{
            return <p className='flex items-center'><MdOutlineCarCrash /> <span className='ms-2'> {data}  </span> </p>
          })}

        </div>
      </div>
  
    </div>
  )
}

export default VehicleDiscription
