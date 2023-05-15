import React, {useState,useEffect} from 'react'
import ContentHead from '../../componants/user/ContentHead'
import axios from 'axios'
import Datepicker from "react-tailwindcss-datepicker"; 
import { useSearchParams } from 'react-router-dom';


function Search() {

    const [carList,setCarList] = useState([]);
    const [error1,setError1] = useState('');
    const [filter, setFilter] =useState('ALL');
    const [pageNumber, setPageNumber] = useState(1)
    const [searchParams,setSearchParams]=useSearchParams();
    const [place,setPlace]=useState(searchParams.get('location'));



    


    const [value, setValue] = useState({startDate: searchParams.get('startDate'), endDate: searchParams.get('endDate') }); 
    const handleValueChange = (newValue) => {
      console.log("newValue:", newValue); 
      setSearchParams({location:place, startDate:newValue.startDate,endDate:newValue.endDate})
      setValue(newValue); 
      } 




    useEffect(()=>{
        getProductData(filter)
        
        console.log("serch param value",searchParams.get("location") )

      },[])


      const getProductData = async(filter)=>{
        try {
          let serverRespose = await axios({
            method: "get",
            url: "http://localhost:3000/api/v1/user/search",
            params:{
              filter:filter,
              pageNumber: pageNumber,
              location:searchParams.get('location'),
              startDate:searchParams.get('startDate'),
              endDate:searchParams.get('endDate')
            },
          });
          if (serverRespose.data.message == "sucess") {
            setCarList((pre)=>{
              return [...serverRespose.data.result]
            });
          } else {
            setError1("Please re-try after some time");
          }
        } catch (error) {
          console.log(error)
        }
      }

  return (
    <div>
      <div className='h-full w-full bg-[#f5f5f5] pt-5'> 
        <div className="w-2/4 bg-[#f5f5f5]  mx-auto  rounded-lg lg:rounded-full grid grid-cols-1 lg:h-14 lg:grid-cols-3 lg:gap-5 ">
          <select
          onChange={(e)=>{
            setSearchParams({location:e.target.value, startDate:value.startDate,endDate:value.endDate})
            setPlace(e.target.value)
          }} 
          value={place}
          name="" id="" className=" h-10 lg:h-full   text-center border border-green-700">
          <option selected >Choose Location</option>
                <option value="KOCHI">Kochi</option>
                <option value="CHENNAI">Chennai</option>
                <option value="TRIVANDRUM">Trivandrum</option>
                <option value="THRISSUR">Thrissur</option>
                <option value="CALICUT">Calicut</option>
          </select>

          <div className='border border-green-700'>
          <Datepicker 
            value={value} 
            inputClassName=" rounded-md  font-normal bg-white text-black h-14 w-full  " 
            displayFormat={"DD/MM/YYYY"}
            minDate={new Date(new Date().getTime()-24*60*60*1000)} 
            separator={"to"} 
            readOnly={true} 
            popoverDirection="down" 
            onChange={handleValueChange} /> 
          </div>

          <button className="bg-[rgb(16,163,16)] h-10  mt-3 lg:h-full lg:mt-0  text-white rounded-lg"
           onClick={()=>{
            setSearchParams({location:place,startDate:value.startDate,endDate:value.endDate})
            getProductData(filter)}}> GET CAR
            </button>


        </div>
      
      </div>

      <div className=' w-full bg-[#f5f5f5]'> 
      
      <ContentHead carList={carList} setFilter={setFilter} getProductData={getProductData} />
      
      
      </div>

    </div>
  )
}

export default Search
