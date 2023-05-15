import React, {useState,useEffect} from 'react'
import HostedCar  from '../../componants/admin/HostedCar'
import { useNavigate } from 'react-router';
import axios from 'axios';

function Cars() {

  const [carList,setCarList] = useState([]);
  const [error1,setError1] = useState('');

  const navigate=useNavigate()

  useEffect(() => {
    getCarDetails();
  }, []);

  const getCarDetails = async () => {
    try {
      let serverRespose = await axios({
        method: "get",
        url: "http://localhost:3000/api/v1/admin/cars",
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


  return (
    <div className='bg-slate-900'>

    {carList.map((data,index)=>{
           return (<HostedCar key={index} data={data} />)
    })}

    </div>)
}
export default Cars
