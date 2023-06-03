import React, {useState,useEffect} from 'react'
import Tables_wallet from '../../componants/user/Tables_wallet'
import axios from '../../utils/axiosInterceptor_user';
import jwt_decode from "jwt-decode";
import toast, { Toaster } from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'

// let data = [{
//   "_id": {
//     "$oid": "645c934c45f584b0c10013c4"
//   },
//   "carId": {
//     "$oid": "645202b93aa5435e00bdaa2a"
//   },
//   "userId": {
//     "$oid": "644014f64d16e8d634eec3f4"
//   },
//   "datesBooked": [
//     {
//       "startDate": "2023-05-21",
//       "endDate": "2023-05-24"
//     }
//   ],
//   "paymentMethod": "razerPay",
//   "paymentStatus": "pending",
//   "bookingStatus": "Booked",
//   "name": "Justin",
//   "email": "justin@gmail.com",
//   "comments": "xzczxc",
//   "phone": 9895781007,
//   "amount": 4000,
//   "createdAt": {
//     "$date": {
//       "$numberLong": "1683788620336"
//     }
//   },
//   "updatedAt": {
//     "$date": {
//       "$numberLong": "1683788620336"
//     }
//   },
//   "__v": 0
// }]




function ProfileWallet() {


  const [userDetails,setUserDetails] = useState({});
  const [feature,setFeature] =useState([])

  const navigate =useNavigate()
 
  useEffect(() => {
    let token = localStorage.getItem("token");
    if(!token){
      return navigate('/user/login')
    }
    let decoded = jwt_decode(token);
    let userId = decoded.userId;
  
    getUserDetails(userId);
  }, []);


  const getUserDetails = async (userId) => {
    try {
      let serverRespose = await axios({
        method: "get",
        url: "/userDetails",
        params: {
          userId: userId,
        },
        // headers: {
        //   Authorization: "Bearer " + localStorage.getItem("token"),
        // },
      });
      if (serverRespose.data.message == "sucess") {
       
        setUserDetails((pre) => {
          return {...serverRespose.data.data};
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






  return (
    <div className='bg-white pt-3 pb-3 '>
      <div className=" border-b-2 pb-5">
            <h1 className='text-center font-bold text-3xl '> MY WALLET</h1>
      </div>
      
      <h1 className=" ms-16 mt-10 font-bold text-2xl"> Wallet Balance : Rs. {userDetails?.walletBalance} /- </h1>

      {/* <Tables_wallet bookings={data} /> */}
    </div>
  )
}

export default ProfileWallet
