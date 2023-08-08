import React, { useEffect,useState } from 'react'
import {useParams } from "react-router-dom";


import VehiclePhotos from '../../componants/user/VehiclePhotos';
import VehicleDiscription from '../../componants/user/VehicleDiscription';
import VehiclePayment from '../../componants/user/VehiclePayment';
import axios from '../../utils/axiosInterceptor_user';


function VehicleDetails(params) {
  
  const [carDeatils,setCarDeatils] = useState([]);
  const [error1,setError1] = useState('');

    let { vehicleId } = useParams();

    useEffect(()=>{

    getCarDetails(vehicleId);

    },[])

  const getCarDetails = async (vehicleId) => {
    try {
      let serverRespose = await axios({
        method: "get",
        url: "/vehicleDetails",
        params: {
          vehicleId: vehicleId,
        },
      });
     
      if (serverRespose.data.message == "sucess") {
        setCarDeatils((pre) => {
          return [...serverRespose.data.result];
        });
      } else {
        setError1("Please re-try after some time");
      }
    } catch (error) {
      console.log(error);
    }
  };

  
    

  return (
    <div>

       <div className="flex flex-col md:grid md:grid-flow-col md:grid-rows-2  gap-4 bg-[#f5f5f5]">
            <div className="md:col-span-2 h-72 mx-6 md:ms-10 p-16 md:p-0 mt-10 bg-white border-2 shadow-md rounded-xl ">
                    <VehiclePhotos  photo={carDeatils} />
            </div>
           <div className="md:col-span-2 mx-6 md:ms-10 mb-10  bg-white border-2 shadow-md rounded-xl">

                    <VehicleDiscription carDetails={carDeatils} />

           </div>
           <div className="md:row-span-2 mx-6 md:m-10 md:ms-5 border-2 bg-white rounded-xl">

                    <VehiclePayment carDetails={carDeatils}/>

           </div>
       </div>
    </div>
  )
}

export default VehicleDetails


{/* <div class="grid grid-rows-3 grid-flow-col gap-4">
  <div class="row-span-3 ...">01</div>
  <div class="col-span-2 ...">02</div>
  <div class="row-span-2 col-span-2 ...">03</div>
</div> */}




{/* <div className="grid grid-flow-col grid-rows-2 gap-4 bg-[#f5f5f5]">
  <div className="col-span-2 ms-10 mt-10 h-72 rounded-xl border-2 bg-white shadow-md ">
    <VehiclePhotos photo={carDeatils} />
  </div>
  <div className="col-span-2  mb-10 ms-10  rounded-xl border-2 bg-white shadow-md">
    <VehicleDiscription carDetails={carDeatils} />
  </div>
  <div className="row-span-2 m-10 ms-5 rounded-xl border-2 bg-white">
    <VehiclePayment carDetails={carDeatils} />
  </div>
</div>; */}