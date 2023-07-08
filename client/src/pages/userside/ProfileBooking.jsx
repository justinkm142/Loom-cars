import React,{useState, useEffect} from 'react'
import MyBookings from '../../componants/user/MyBookings'
import axios from '../../utils/axiosInterceptor_user';
import jwt_decode from 'jwt-decode';
import {useNavigate} from 'react-router-dom'
import Pagination from "../../componants/admin/Pagination.jsx";

function ProfileBooking() {

  const [bookingList,setBookingList] = useState([]);
  const [page , setPage] = useState(1);
  const [totalDocument , setTotalDocument] = useState(0)

const navigate =useNavigate();







useEffect(() => {
  let token = localStorage.getItem("token");
  if(!token){
    return navigate('/user/login')
  }
  let decoded = jwt_decode(token);
  let userId = decoded.userId;

  getBookingList(userId);
}, [page]);



const getBookingList = async (userId) => {
  try {
    let serverRespose = await axios({
      method: "get",
      url: "/booking/list",
      params: {
        userId: userId,
        page,
      },
      // headers: {
      //   Authorization: "Bearer " + localStorage.getItem("token"),
      // },
    });
    if (serverRespose.data.message == "sucess") {
     
      setBookingList((pre) => {
        return [...serverRespose.data.data];
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





  return (
    <div className='ps-10 bg-white pt-3 pb-3 '>
       <h1 className='text-center font-bold text-3xl '> MY BOOKINGS</h1>

       {bookingList.map((data,index)=>{
        return <MyBookings key={index} data={data} bookingList={data} getBookingList={getBookingList}  />
       })}

        
       {bookingList?.length==0 ? 
       
       
       <h1 className='font-bold text-4xl mt-56'>Empty</h1>
       
       :
       <div className="mt-5">
       <Pagination setPage = {setPage} totalDocument = {totalDocument} page={page} />
      </div>
       
       
       }



    </div>
  )
}

export default ProfileBooking
