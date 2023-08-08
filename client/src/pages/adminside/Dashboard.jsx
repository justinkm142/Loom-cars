import React, { useEffect, useState } from 'react'
import Dashboard_cards from '../../componants/admin/Dashboard_cards'
import Dashboard_graph from '../../componants/admin/Dashboard_graph'
import axios from '../../utils/axiosInterceptor_admin'
import { useNavigate } from 'react-router-dom'










function Dashboard() {

  const [totalEarning, setTotalEarning] = useState(0)
  const [totalUser, setTotalUser] = useState(0)
  const [totalCar, setTotalCar] = useState(0)
  const [profitGraph,setProfitGraph]=useState([0,0,0,0,0,0,0,0,0,0,0,0])
  const [bookingGraph,setBookingGraph]=useState([0,0,0,0,0,0,0,0,0,0,0,0])
  const navigate = useNavigate();

  useEffect(()=>{
    fetchDashboardData();
  },[])
  
  
  let fetchDashboardData = async () => {
    try {
      let serverRespose = await axios({
        method: "get",
        url: "/dashboard",
        // headers: {
        //   Authorization: "Bearer " + localStorage.getItem("admin_token"),
        // },
      });
      if (serverRespose.data.message == "sucess") {

        setTotalEarning(serverRespose.data.totalEarning)
        setTotalUser(serverRespose.data.totalUser)
        setTotalCar(serverRespose.data.totalCar)
        let graphData = serverRespose.data.graphData
        
        for (let key of graphData){
          setProfitGraph((prev)=>{
            prev[key._id.month-1] = key.totalAmount
            return prev
          })
          setBookingGraph((prev)=>{
            prev[key._id.month-1] = key.count
            return prev
          })
        }
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
    <div className='h-screen w-full bg-slate-900'>
      <h1>Dashboard</h1>
      <Dashboard_cards totalEarning={totalEarning} totalUser = {totalUser} totalCar={totalCar}   />
      <Dashboard_graph profitGraph={profitGraph} bookingGraph={bookingGraph} />
    </div>
  )
}

export default Dashboard
