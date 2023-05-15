import React from 'react'
import {TiThMenuOutline} from 'react-icons/ti'
import {GiGearStickPattern} from 'react-icons/gi'
import {BsFuelPumpDieselFill} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import { useNavigate } from 'react-router-dom'

function ContentHead(props) {

  const navigate = useNavigate()

  const handleFilter = (selection)=>{
    let temp = selection
    props.setFilter(()=>{
      return temp
    })
   props.getProductData(temp,1)
   

  }
  return (
   <div className=' bg-[#f5f5f5]'>
    <div className="mx-auto pt-7">
     <section className='bg-[#f5f5f5] flex justify-center'>
            <div className=' w-28 '>
              <div className='cursor-pointer' onClick={()=>handleFilter("ALL")} > 
                <div className="flex justify-center " > 
                <TiThMenuOutline size={40} /> </div>
                <p className='text-center'>All</p>
              </div>

            </div>

            <div className='w-28'>
              <div className="cursor-pointer" onClick={()=>handleFilter("AUTOMATIC")}>
                <div className="flex justify-center " > 
                <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/automatic-gearbox-automatic-2072600-3766385.png?f=avif&w=128" alt="logo" className="w-[40px]" />
                {/* <GiGearStickPattern size={40} />  */}
                </div>
                <p className='text-center'>Automatic</p>  

              </div>
 
            </div>

            <div className='w-28'>
                <div className="cursor-pointer" onClick={()=>handleFilter("MANUAL")}>

                  <div className="flex justify-center" >
                  <GiGearStickPattern size={40} /></div>
                  <p className='text-center'>Manual</p> 

                </div>
  
            </div>

            <div className='w-28'>
                <div className="cursor-pointer" onClick={()=>handleFilter("DIESEL")} >
                  <div className="flex justify-center"> <BsFuelPumpDieselFill size={40} /></div>
                  <p className='text-center'>Diesel</p> 
                </div>
  
            </div>

            <div className='w-28'>
                <div className="cursor-pointer" onClick={()=>handleFilter("PETROL")}>
                  <div className="flex justify-center" > 
                  {/* <BsFuelPumpDieselFill size={40} />  */}
                  <img src="https://cdn.iconscout.com/icon/free/png-256/free-petrol-pump-fuel-gas-gasoline-station-service-3-2291.png?f=avif&w=128" alt="logo" className="w-[44px]" />
                  </div>
                  <p className='text-center' >Petrol</p>

                </div>
   
            </div>


     </section>
    </div>

     <section className="text-gray-600 body-font">
    <div className="container px-5 py-10 mx-auto">
      <div className="flex flex-wrap -m-4">

{/* Card One */}
    { props.carList[0] ?  
        <div className="p-4 sm:w-1/2 md:w-1/3 lg:w-1/4 mx-auto sm:mx-0 cursor-pointer" onClick={()=>navigate(`/user/vehicleDetails/${props.carList[0]?._id }`)}>
          <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-2xl overflow-hidden">
            <img className="lg:h-48 md:h-36 sm:h-36 h-36 w-full object-cover object-center" src={props.carList[0]?.images[0].image_url} alt="blog"></img>
            <div className="p-6">
              <h2 className="tracking-widest text-xs title-font font-medium text-black mb-1 flex gap-1"> <span className='text-orange-400'> <AiFillStar /> </span>4.88 (67 Trips)</h2>
              <h1 className="title-font text-lg font-medium text-gray-900 mb-3"> <span> {props.carList[0]?.carMake} </span>   <span>{props.carList[0]?.carModel}</span> <span> {props.carList[0]?.manufactureYear} </span> </h1>
              <p className="leading-relaxed mb-3"><span> {props.carList[0]?.transmission} - </span> <span> {props.carList[0]?.fuelType} - </span> <span>  {props.carList[0]?.seatCapacity}  seats </span> </p>
              <div className="flex items-center flex-wrap mt-5 ">
                <h1 className="font-bold text-lg"> ₹ <span> {props.carList[0]?.rentingPrice} /Day</span></h1>
                <span className="text-gray-400 p-4 mr-2 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-2 border-gray-200">
                <ImLocation />  {props.carList[0]?.availableLocation} 
                </span>
              </div>
            </div>
          </div>
        </div>
      : null }

{/* Card two */}
    { props.carList[1] ?  
        <div className="p-4 sm:w-1/2 md:w-1/3 lg:w-1/4 hidden sm:block cursor-pointer" onClick={()=>navigate(`/user/vehicleDetails/${props.carList[1]?._id }`)}>
          <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-2xl overflow-hidden">
            <img className="lg:h-48 md:h-36 sm:h-36 w-full object-cover object-center" src={props.carList[1]?.images[0].image_url} alt="blog"></img>
            <div className="p-6">
              <h2 className="tracking-widest text-xs title-font font-medium text-black mb-1 flex gap-1"> <span className='text-orange-400'> <AiFillStar /> </span>4.88 (67 Trips)</h2>
              <h1 className="title-font text-lg font-medium text-gray-900 mb-3"> <span> {props.carList[1]?.carMake} </span>   <span>{props.carList[1]?.carModel}</span> <span> {props.carList[1]?.manufactureYear} </span> </h1>
              <p className="leading-relaxed mb-3"><span> {props.carList[1]?.transmission} - </span> <span> {props.carList[1]?.fuelType} - </span> <span>  {props.carList[1]?.seatCapacity}  seats </span> </p>
              <div className="flex items-center flex-wrap mt-5 ">
                <h1 className="font-bold text-lg"> ₹ <span> {props.carList[1]?.rentingPrice} /Day</span></h1>
                <span className="text-gray-400 p-4 mr-2 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-2 border-gray-200">
                <ImLocation />  {props.carList[1]?.availableLocation} 
                </span>
              </div>
            </div>
          </div>
        </div>
     : null }

{/* Card three */}

  { props.carList[2] ?  

        <div className="p-4 md:w-1/3 lg:w-1/4 hidden md:block cursor-pointer" onClick={()=>navigate(`/user/vehicleDetails/${props.carList[2]?._id }`)}>
          <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-2xl overflow-hidden">
            <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={props.carList[2]?.images[0].image_url} alt="blog"></img>
            <div className="p-6">
              <h2 className="tracking-widest text-xs title-font font-medium text-black mb-1 flex gap-1"> <span className='text-orange-400'> <AiFillStar /> </span>4.88 (67 Trips)</h2>
              <h1 className="title-font text-lg font-medium text-gray-900 mb-3"> <span> {props.carList[2]?.carMake} </span>   <span>{props.carList[2]?.carModel}</span> <span> {props.carList[2]?.manufactureYear} </span> </h1>
              <p className="leading-relaxed mb-3"><span> {props.carList[2]?.transmission} - </span> <span> {props.carList[2]?.fuelType} - </span> <span>  {props.carList[2]?.seatCapacity}  seats </span> </p>
              <div className="flex items-center flex-wrap mt-5 ">
                <h1 className="font-bold text-lg"> ₹ <span> {props.carList[2]?.rentingPrice} /Day</span></h1>
                <span className="text-gray-400 p-4 mr-2 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-2 border-gray-200">
                <ImLocation />  {props.carList[2]?.availableLocation} 
                </span>
              </div>
            </div>
          </div>
        </div>
       : null }

{/* Card Four */}

        { props.carList[3] ? 
            <div className="p-4 hidden lg:block md:w-1/3 lg:w-1/4 cursor-pointer" onClick={()=>navigate(`/user/vehicleDetails/${props.carList[3]?._id }`)}>
             <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-2xl overflow-hidden">
               <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={props.carList[3]?.images[0].image_url} alt="blog"></img>
               <div className="p-6">
                 <h2 className="tracking-widest text-xs title-font font-medium text-black mb-1 flex gap-1"> <span className='text-orange-400'> <AiFillStar /> </span>4.88 (67 Trips)</h2>
                 <h1 className="title-font text-lg font-medium text-gray-900 mb-3"> <span> {props.carList[3]?.carMake} </span>   <span>{props.carList[3]?.carModel}</span> <span> {props.carList[3]?.manufactureYear} </span> </h1>
                 <p className="leading-relaxed mb-3"><span> {props.carList[3]?.transmission} - </span> <span> {props.carList[3]?.fuelType} - </span> <span>  {props.carList[3]?.seatCapacity}  seats </span> </p>
                 <div className="flex items-center flex-wrap mt-5 ">
                   <h1 className="font-bold text-lg"> ₹ <span> {props.carList[3]?.rentingPrice} /Day</span></h1>
                   <span className="text-gray-400 p-4 mr-2 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-2 border-gray-200">
                   <ImLocation />  {props.carList[3]?.availableLocation} 
                   </span>
                 </div>
               </div>
             </div>
            </div>   
        : null }




      </div>
    </div>
     </section>
 


   </div>
   

  )
}

export default ContentHead
