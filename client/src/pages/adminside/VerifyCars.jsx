import React,{useState,useEffect} from 'react'
import VerifyCar from '../../componants/admin/VerifyCar'   
import { useNavigate } from 'react-router';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';


function VerifyCars() {

  const [carList, setCarList] = useState([]);
  const [error1, setError1] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getCarDetails();
  }, []);

  const getCarDetails = async () => {
    try {
      let serverRespose = await axios({
        method: "get",
        url: "http://localhost:3000/api/v1/admin/verifyCars",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("admin_token"),
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
      if (error.response.status == 401) {

        localStorage.removeItem("admin_token");
        navigate("/admin/login");
      }
    }
  };


  let changeVehicleStatus = async (vehicleId, status) => {
    try {
      let serverRespose = await axios({
        method: "patch",
        url: "http://localhost:3000/api/v1/admin/verifyCars",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("admin_token"),
        },
        data: {
          vehicleId,
          status,
        },
      });
      if (serverRespose.data.message == "sucess") {
        toast.success("Vehicle Is Verified!");
        setTimeout(getCarDetails, 1000);
      } else {
        setError1("Please re-try after some time");
        toast.error("Something Went Wrong!");
      }
    } catch (err) {
      console.log(err);
      if (err.response.data.error == "Token Expired") {

        localStorage.removeItem("admin_token");
        navigate("/admin/login");
      }
    }
  };

  return (
    <div className=' w-full'>
      {carList.map((data,index)=>{
        return  <VerifyCar carData={data} changeVehicleStatus={changeVehicleStatus} />
      })
      }
     <Toaster />
    </div>
  )
}

export default VerifyCars
