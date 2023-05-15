import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import HostedCars from '../../componants/user/HostedCars'
import jwt_decode from "jwt-decode";
import axios from 'axios';
import ActiveDays_modal from '../../componants/user/ActiveDays_modal'



function Host() {

  const [carList,setCarList] = useState([]);
  const [error1,setError1] = useState('');
  const [showModal,setShowModal] = useState(false);
  const [carId,setCarId] = useState('')
  

  const navigate=useNavigate()
  let userId

  useEffect(() => {
    let token = localStorage.getItem("token");
    if(!token){
      return navigate('/user/login')
    }

    let decoded = jwt_decode(token);
    userId = decoded.userId;

    getCarDetails(userId);
  }, [showModal]);

  const getCarDetails = async (userId) => {
    try {
      let serverRespose = await axios({
        method: "get",
        url: "http://localhost:3000/api/v1/user/hostVehicle",
        params: {
          userId: userId,
        },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (serverRespose.data.message == "sucess") {
        setCarList((pre) => {
          return [...serverRespose.data.result];
        });
      } else {
        setError1("Please re-try after some time");
      }
    } catch (error) {
      console.log(error);

      if (error.response.status == 401) {
        localStorage.clear();
        navigate("/user/login");
      }
    }
  };

  const modalClose= ()=>{
    setShowModal(false)
  }


  return (
    <div className='mb-10'>


        <div className='flex justify-between mb-4 px-10 pt-10'>
            <h1 className='text-4xl mb-4 font-medium'>My Cars</h1>
            <button
              onClick={()=>navigate("/user/addVehicle")}
              className='bg-green-600 p-2 text-white me-9 text-2xl shadow-2xl rounded-md w-48 active:bg-slate-800 hover:bg-green-800'> 
              Start Earning
            </button>
        </div>

        {carList.map((data,index)=>{
          console.log(data)
          return  <HostedCars key={index} data={data} modal={setShowModal} carId={setCarId} />
        })}
       
       
        <ActiveDays_modal visible={showModal} carId={carId} modalClose={modalClose} userId={userId} getCarDetails={getCarDetails} />
    </div>
  )
}

export default Host
