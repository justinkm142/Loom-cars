import React, {useState, useEffect} from 'react'
import {useNavigate,useParams} from 'react-router-dom'

import Tables_booking from '../../componants/user/Tables_booking'
import jwt_decode from "jwt-decode";
import axios from '../../utils/axiosInterceptor_user';
import ActiveDays_modal from '../../componants/user/Modal_ActiveDays'
import Pagination from "../../componants/admin/Pagination.jsx";




function ShowBookings() {

  const [bookingList,setBookingList] = useState([]);
  const [error1,setError1] = useState('');
  const [showModal,setShowModal] = useState(false);
  const [carId,setCarId] = useState('')
  const [page , setPage] = useState(1);
  const [totalDocument , setTotalDocument] = useState(0)
  
  
  let { vehicleId } = useParams();
  const navigate=useNavigate()
  let userId

  useEffect(() => {
    let token = localStorage.getItem("token");
    if(!token){
      return navigate('/user/login')
    }

    let decoded = jwt_decode(token);
    userId = decoded.userId;

    getBookingList(userId);
  }, [showModal,page]);

  const getBookingList = async (userId) => {
    try {
      let serverRespose = await axios({
        method: "get",
        url: "/hostBookingList",
        params: {
          userId: userId,
          vehicleId:vehicleId,
          page:page
        },
        // headers: {
        //   Authorization: "Bearer " + localStorage.getItem("token"),
        // },
      });
      if (serverRespose.data.message == "sucess") {
        setBookingList((pre) => {
          return [...serverRespose.data.result];
        });
        setTotalDocument(serverRespose.data.totalDocument)
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

  const changeUserStatus=() =>{

  }

  return (
    <div className='mb-10'>


        <div className='flex justify-between mb-4 px-10 pt-10'>
            <h1 className='text-4xl mb-4 font-medium'>Car Bookings</h1>
            <div className="">
            <button
              onClick={()=>navigate("/user/host")}
              className='bg-green-500 p-2 text-white me-9 text-2xl shadow-2xl rounded-md w-48 active:bg-slate-800 hover:bg-green-800'> 
              My Cars
            </button>

            <button
              onClick={()=>navigate("/user/addVehicle")}
              className='bg-green-600 p-2 text-white me-9 text-2xl shadow-2xl rounded-md w-48 active:bg-slate-800 hover:bg-green-800'> 
              Start Earning
            </button>

            </div>
        </div>

        <Tables_booking bookings={bookingList} changeUserStatus={changeUserStatus} getBookingList={getBookingList} page={page} />

        {bookingList.length===0 ? 

          null

        :
        <div className="mt-5">
          <Pagination setPage = {setPage} totalDocument = {totalDocument} page={page} />
        </div>

        }







       
        <ActiveDays_modal visible={showModal} carId={carId} modalClose={modalClose} userId={userId} getCarDetails={getBookingList} />
    </div>
  )
}

export default ShowBookings
