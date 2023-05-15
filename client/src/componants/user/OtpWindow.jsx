import React, { useState } from 'react'
import {BsTelephoneFill} from 'react-icons/bs'
import OtpInput from 'otp-input-react'
import {CgSpinner} from 'react-icons/cg'
import {auth} from "../../config/firebase"
import { RecaptchaVerifier,signInWithPhoneNumber } from 'firebase/auth'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";



function OtpWindow() {
  const [otp,setOtp] =useState()
  const [loading,setLoading] =useState(false)
  const [loading1,setLoading1] =useState(false)
  const [phone, setPhone] =useState()
  const [disableInput,setDisableInput] = useState(false)

  const navigate = useNavigate()

  function onCaptchVerify(){
    if(!window.recaptchaVerifier)
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        onSignup()
      },
      'expired-callback': () => {
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
      }
    }, auth);
  }

  function onSignup(){
    setLoading(true)
    onCaptchVerify()
    const appVerifier =window.recaptchaVerifier
    const phoneNumber = '+91' + phone
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
   
      setLoading(false)
      toast.success('OTP Sended successfully')
      window.confirmationResult = confirmationResult;
      setDisableInput(true)
      // ...
    }).catch((error) => {
      setLoading(false)
      console.log(error)
    });
  }
  async function getTokenFromServer(){
    let serverRespose = await axios({
      method: "post",
      url: "http://localhost:3000/api/v1/user/otplogin",
      data: {
        phone:phone
      },
    });
    if (serverRespose.data.message == "sucess") {
      setLoading1(false)
      toast.success('OTP Verified')
      localStorage.setItem("token", serverRespose.data.token);
      navigate("/user/home")
    } else {
      setError1("Please re-try after some time");
    }
  }

  function onOTPVerify(){
    setLoading1(true);
    window.confirmationResult
    .confirm(otp)
    .then(async (res)=>{
      console.log(res)
      getTokenFromServer()
      
    }).catch((err)=>{
      console.log(err);
      setLoading1(false);
      toast.error("OTP Verification Failed");
    });
    
  }


  return (

    <div>
      <div className='w-80 flex flex-col gap-4 rounded-lg p-4'>
      <div id="recaptcha-container"></div>
      <Toaster />
      <h1 className='text-center leading-normal text-[#828268] font-medium text-3xl mb-6'>
        OTP Login <br/> Signin with phone
      </h1>
      <>
      <div className='bg-white text-black w-fit mx-auto p-4 rounded-full'>
        <BsTelephoneFill size={30}/>

      </div>
      <label htmlFor='phone' className='font-bold text-2xl text-[#828268] text-center '>
        Enter Phone Number 
      </label>
      
      {disableInput ? 
        <input 
        disabled
        className=' rounded h-8'type='number'
        value={phone}
        onChange={(e)=>setPhone(e.target.value)}
      ></input>
        :
        <input 
        
        className=' rounded h-8'type='number'
        value={phone}
        onChange={(e)=>setPhone(e.target.value)}
      ></input>

      }
      
      <button 
      onClick={onSignup}
      className='bg-blue-600 w-full flex gap-1 items-center
      justify-center py-2.5 text-white  rounded-sm'>
        {loading && 
        <CgSpinner size={20} className='mt-1 animate-spin'/>
        }
        <span> Send OTP  </span>
        </button>
      <label htmlFor='' className='font-bold text-2xl text-[#828268] text-center '>
        Enter  OTP
      </label>
      <OtpInput OTPLength={6} 
        otpType="number"
        disabled={false}
        autoFocus
        value={otp}
        onChange={setOtp}
        className='flex justify-between gap-[1px]'></OtpInput>
      </>
      <button
      onClick={onOTPVerify}
       className='bg-blue-600 w-full flex gap-1 items-center
      justify-center py-2.5 text-white rounded-sm'>
        {loading1 && 
        <CgSpinner size={20} className='mt-1 animate-spin'/>
        }
        <span> Verify OTP  </span>
        </button>
      </div>

    </div>
    
  )
}

export default OtpWindow
