import React, { useEffect, useState } from 'react'

import HeroSection from '../../componants/user/HeroSection'
import ContentHead from '../../componants/user/ContentHead'
import axios from '../../utils/axiosInterceptor_user'



function Home() {

  const [carList,setCarList] = useState([]);
  const [error1,setError1] = useState('');
  const [filter, setFilter] =useState('ALL');
  const [pageNumber, setPageNumber] = useState(0);
  const [limit, setLimit] = useState(4);
  const [pageCount, setPageCount] = useState(0)
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());



  useEffect(()=>{
    getProductData(filter)
  },[pageNumber,limit,filter])

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());

    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  
useEffect(()=>{
  if(windowDimensions.width <= 640){
    setLimit(1)
    console.log("screen dimen is ", windowDimensions, limit );
  }else if(windowDimensions.width <= 768 ){
    setLimit(2)
    console.log("screen dimen is ", windowDimensions, limit );
  }else if(windowDimensions.width <= 1167 ){
    setLimit(3)
    console.log("screen dimen is ", windowDimensions, limit );
  }else{
    setLimit(4)
    console.log("screen dimen is ", windowDimensions, limit );
  }
},[])





  const getProductData = async(filter)=>{
    try {
      let serverRespose = await axios({
        method: "get",
        url: "/",
        params:{
          filter:filter,
          pageNumber: pageNumber,
          limit:limit
        },
      });
      if (serverRespose.data.message == "sucess") {
        setCarList((pre)=>{
          return [...serverRespose.data.result]
        });
        setPageCount(serverRespose.data.pageCount)
      } else {
        setError1("Please re-try after some time");
      }
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div >
      <HeroSection />
      <ContentHead carList={carList} setFilter={setFilter} getProductData={getProductData} setPageNumber={setPageNumber} pageNumber={pageNumber} pageCount={pageCount} />
      
    </div>
  )
}

export default Home
