import React, { useState } from 'react'
import {BsArrowLeft , BsArrowRight} from 'react-icons/bs'

function VehiclePhotos(props) {
  const [index,setIndex] = useState(0)
  let imageArrayLength = props.photo[0]?.images.length;

  return (
    <div className='w-full h-full flex justify-center '>
      {
      index>0 ? 
      <div 
        onClick={()=>setIndex(index-1)}
        className=" mx-auto my-auto  border-2 hover:bg-slate-600 active:bg-slate-800 bg-slate-400 rounded-full cursor-pointer">
        <p className='p-4 align-middle text-4xl '><BsArrowLeft /></p>
      </div>
      :
      <div 
        className=" mx-auto my-auto rounded-full cursor-pointer">
        <p className='p-4 align-middle text-4xl '></p>
      </div>

      }
     
      <img src={props.photo[0]?.images[index]?.image_url} alt="car" className="h-full " />
      
      
      
      {
      index<imageArrayLength-1 ? 
          <div onClick={()=>setIndex(index+1)}
            className="mx-auto my-auto  border-2 hover:bg-slate-600 active:bg-slate-800 bg-slate-400 rounded-full cursor-pointer">
          <p className='p-4 align-middle text-4xl '><BsArrowRight /></p>
          </div>
        :
        <div 
        className="mx-auto my-auto   rounded-full cursor-pointer">
        <p className='p-4 align-middle text-4xl '></p>
      </div>
      }
    
    </div>
  )
}

export default VehiclePhotos
