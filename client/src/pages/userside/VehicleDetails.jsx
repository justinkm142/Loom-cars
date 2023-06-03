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
      console.log("server respnse  is ", serverRespose);
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

  console.log("car details is " , carDeatils)
    

  return (
    <div>

       <div className="grid grid-rows-2 grid-flow-col gap-4 bg-[#f5f5f5]">
            <div className="col-span-2 h-72 ms-10 mt-10 bg-white border-2 shadow-md rounded-xl ">
                    <VehiclePhotos  photo={carDeatils} />
            </div>
           <div className="col-span-2  ms-10 mb-10  bg-white border-2 shadow-md rounded-xl">

                    <VehicleDiscription carDetails={carDeatils} />

           </div>
           <div className="row-span-2 m-10 ms-5 border-2 bg-white rounded-xl">

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