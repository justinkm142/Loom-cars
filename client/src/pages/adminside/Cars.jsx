import React, {useState,useEffect} from 'react'
import HostedCar  from '../../componants/admin/HostedCar'
import { useNavigate } from 'react-router';
import axios from '../../utils/axiosInterceptor_admin';
import ActiveDays_modal from '../../componants/user/Modal_ActiveDays'
import Pagination from "../../componants/admin/Pagination.jsx";

function Cars() {

  const [carList,setCarList] = useState([]);
  const [error1,setError1] = useState('');
  const [showModal,setShowModal] = useState(false);
  const [carId,setCarId] = useState('');
  const [reload, setReload] = useState(false); 
  const [page , setPage] = useState(1);
  const [totalDocument , setTotalDocument] = useState(0)

  const navigate=useNavigate()

  useEffect(() => {
    getCarDetails();
  }, [showModal, reload, page]);

  const getCarDetails = async () => {
    try {
      let serverRespose = await axios({
        method: "get",
        url: "/cars",
        params:{
          page,
        },
        // headers: {
        //   Authorization: "Bearer " + localStorage.getItem("admin_token"),
        // },
      });
      if (serverRespose.data.message == "sucess") {
        setCarList((pre) => {
          return [...serverRespose.data.result];
        });
        setTotalDocument(serverRespose.data.totalDocument)
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


  const modalClose= ()=>{
    setShowModal(false)
  }

  return (
    <div className='bg-slate-900'>

    {carList.map((data,index)=>{
           return (<HostedCar key={index} data={data} modal={setShowModal} carId={setCarId} setReload={setReload} reload={reload} />)
    })}

        <div className="mt-5">
          <Pagination setPage = {setPage} totalDocument = {totalDocument} page={page} />
        </div>

      <ActiveDays_modal visible={showModal} carId={carId} modalClose={modalClose}  getCarDetails={getCarDetails} />    
    </div>)
}
export default Cars
