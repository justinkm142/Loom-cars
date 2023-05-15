
import React, {useState} from 'react'
import AddVehicle1 from '../../componants/user/AddVehicle'


import BounceLoader from "react-spinners/BounceLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",

};

function AddVehicle() {

  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#36d7b7");


  return (
    <div>
      {loading ?
      <div className=" flex justify-center items-center fixed top-0 left-0 w-full h-full">

       <BounceLoader
      
      color="#36d7b7"
      loading={true}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
      />
      </div>
     :
      <div className=' sm:mx-20 md:mx-40 lg:mx-80 sm:mb-20 sm:mt-10 border rounded-2xl pb-10 bg-gray-100 shadow-2xl'>

      <AddVehicle1 setLoading={setLoading}/>

      </div>
    }
     
      
      
    </div>
  )
}

export default AddVehicle




// .loading-spinner {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   z-index: 9999;
//   background-color: rgba(255, 255, 255, 0.5);
// }