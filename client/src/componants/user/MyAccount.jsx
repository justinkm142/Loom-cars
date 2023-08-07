import React from 'react'

function MyAccount(props) {
  return (
    <div>
       <h1 className='text-center font-bold text-3xl '> MY ACCOUNT</h1>
      <h1 className='text-2xl mt-5 underline'>Account Deatils </h1>
      <div className="flex pt-5">
        <p className='w-40' >Email</p>
        <input onChange={(e)=>{
            props.setUserData({...props.userData, email:e.target.value})
        }}
        value={props?.userData?.email}
        className='w-60 border-2 ps-1' type='email'></input>
      </div>
      <div className="flex pt-5">
        <p className='w-40'>Mobile</p>
        <input onChange={(e)=>{
            props.setUserData({...props.userData, phone:e.target.value})
        }}
        value={props?.userData?.phone}
        className='w-60 border-2 ps-1' type='number'></input>
      </div>


      <h1 className='text-2xl mt-5 underline'>Personal Deatils </h1>
      <div className="flex pt-5">
        <p className='w-40'>Name</p>
        <input onChange={(e)=>{
            props.setUserData({...props.userData, name:e.target.value})
        }}
        value={props?.userData?.name}
        className='w-60 border-2 ps-1'></input>
      </div>
      <div className="flex pt-5">
        <p className='w-40'>Gender</p>
        <select onChange={(e)=>{
            props.setUserData({...props.userData, gender:e.target.value})
        }}
        name="" id="" className="w-40 border-2 ps-1">
          <option value="">{props?.userData?.gender} </option>
          <option value="MALE">Male </option>
          <option value="FEMALE">Female </option>
        </select>
      </div>




      <h1 className='text-2xl mt-5 underline'>Location Deatils </h1>

      <div className="flex pt-5">
        <p className='w-40'>City</p>
        <select onChange={(e)=>{
            props.setUserData({...props.userData, location:e.target.value})
        }}
        name="" id="" className="w-40 border-2">
          <option value="">{props?.userData?.location} </option>
          <option value="THRISSUR">Thrissur </option>
          <option value="KOCHI">Kochi </option>
          <option value="CHENNAI">Chennai </option>
          <option value="TRIVANDRUM">Trivandrum </option>
          <option value="CALICUT">Calicut </option>
        </select>
      </div>

      <div className="flex justify-center">
          
          <button 
          onClick={()=>{props.update()}}
          className=" px-10 py-2 rounded-lg text-white bg-green-500"> UPDATE </button>

      </div>
    </div>
  )
}

export default MyAccount
