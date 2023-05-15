import React, { useEffect, useState } from 'react'

import HeroSection from '../../componants/user/HeroSection'
import ContentHead from '../../componants/user/ContentHead'
import axios from 'axios'



function Home() {

  const [carList,setCarList] = useState([]);
  const [error1,setError1] = useState('');
  const [filter, setFilter] =useState('ALL');
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(()=>{
    getProductData(filter)
  },[])

  const getProductData = async(filter)=>{
    try {
      let serverRespose = await axios({
        method: "get",
        url: "http://localhost:3000/api/v1/user/",
        params:{
          filter:filter,
          pageNumber: pageNumber
        },
      });
      if (serverRespose.data.message == "sucess") {
        setCarList((pre)=>{
          return [...serverRespose.data.result]
        });
      } else {
        setError1("Please re-try after some time");
      }
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div>
      <HeroSection />
      <ContentHead carList={carList} setFilter={setFilter} getProductData={getProductData} />
      
    </div>
  )
}

export default Home
