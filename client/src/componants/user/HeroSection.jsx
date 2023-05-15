import React, {useState} from 'react'
import Datepicker from "react-tailwindcss-datepicker"; 
import {useNavigate} from 'react-router-dom'




function HeroSection() {
  const [location,setLocation] = useState("");
  const [startDate,setStartDate] = useState("");
  const [endDate,setEndDate] = useState("");



  const [value, setValue] = useState({startDate: new Date(), endDate: new Date().setMonth(11) }); 
  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue); 
    setStartDate(newValue.startDate);
    setEndDate(newValue.endDate);
    setValue(newValue); 
    } 
let navigate=useNavigate();

  return (
    <section className='max-w-full min-h-[380px] bg-[url("https://res.cloudinary.com/diefdj29l/image/upload/v1682577938/web_banner_lyzycd.jpg")] bg-center bg-cover' >
      <div className="pt-10">
        <div className=" w-2/3 mx-auto bg-[rgba(0,0,0,0.4)] pt-5 px-10">
            <p className="text-center text-[15px] sm:text-[20px] lg:text-[42px] font-bold text-white"> The perfect car for your next trip is just around the corner</p>
            <p className="text-center text-[10px] sm:text-[14px] lg:text-[28px] font-bold text-white">Book your drive now!</p>

        </div>
        <div className="w-2/4 bg-white  mx-auto mt-10 rounded-lg lg:rounded-full grid grid-cols-1 lg:h-14 lg:grid-cols-3">
          <select 
          onChange={(e)=>setLocation(e.target.value)}
          name="" id="" className=" rounded-full h-10 lg:h-full lg:rounded-s-full lg:rounded-e-md text-center" >
          <option selected >Choose Location</option>
                <option value="KOCHI">Kochi</option>
                <option value="CHENNAI">Chennai</option>
                <option value="TRIVANDRUM">Trivandrum</option>
                <option value="THRISSUR">Thrissur</option>
                <option value="CALICUT">Calicut</option>
          </select>

          <Datepicker 
            value={value} 
            inputClassName=" rounded-md  font-normal bg-white text-black h-10 w-full lg:h-full lg:w-full " 
            displayFormat={"DD/MM/YYYY"}
            minDate={new Date(new Date().getTime()-24*60*60*1000)} 
            separator={"to"} 
            readOnly={true} 
            popoverDirection="down" 
            onChange={handleValueChange} /> 

          <button className="bg-[rgb(16,163,16)] h-10 rounded-b-lg mt-3 lg:h-full lg:mt-0 lg:rounded-e-full text-white" onClick={()=>navigate(`/user/search?location=${location}&startDate=${startDate}&endDate=${endDate}`)} > GET CAR
            </button>


        </div>
  
      </div>
    </section>
  )
}

export default HeroSection
