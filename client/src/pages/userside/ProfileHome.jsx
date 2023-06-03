import React, {useState,useEffect} from 'react'
import MyAccount from '../../componants/user/MyAccount'
import axios from '../../utils/axiosInterceptor_user';
import jwt_decode from "jwt-decode";
import toast, { Toaster } from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'





function ProfileHome() {
  const [userDetails,setUserDetails] = useState({});
  const [feature,setFeature] =useState([])

  const navigate = useNavigate();
 
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


  const updateUserDetails = async () => {
    try {
      let token = localStorage.getItem("token");
      let decoded = jwt_decode(token);
      let userId = decoded.userId;


      let serverRespose = await axios({
        method: "patch",
        url: "/userDetails",
        data: {
          userId,
          name:userDetails.name,
          email:userDetails.email,
          phone:userDetails.phone,
          gender:userDetails.gender,
          location:userDetails.location
        },
        // headers: {
        //   Authorization: "Bearer " + localStorage.getItem("token"),
        // },
      });
      if (serverRespose.data.message == "sucess") {
       
        setUserDetails((pre) => {
          return {...serverRespose.data.data};
        });

        toast.success('Updated Successfully')

      } else {
        setError1("Please re-try after some time");
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing Went Wrong!");
      if (error.response.status == 401) {
        localStorage.clear();
        navigate("/user/login");
      }
    }
  };
  

console.log("user Details ", userDetails)

  return (
    <div className='ps-10 bg-white pt-3 pb-3'>
     
     <MyAccount userData={userDetails} setUserData={setUserDetails} update={updateUserDetails} />

    </div>
  )
}

export default ProfileHome
