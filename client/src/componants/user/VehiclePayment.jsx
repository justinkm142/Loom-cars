import React,{useEffect, useState} from 'react'
import { useSelector } from "react-redux";
import axios from '../../utils/axiosInterceptor_user';
import Datepicker from "react-tailwindcss-datepicker"; 
import toast, { Toaster } from 'react-hot-toast';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import {userBaseUrl} from '../../utils/API'





function VehiclePayment(params) {

  const navigate = useNavigate()

  const userId = useSelector((state)=>state.user.userId)
  const vehicleId=params.carDetails[0]?._id
  const vehicleRate = params.carDetails[0]?.rentingPrice
  let startDateInString= params.carDetails[0]?.availableDates[0].startDate
  let endDateInString= params.carDetails[0]?.availableDates[0].endDate
  let bookedDays = params.carDetails[0]?.bookedDates


  const [name,setName] =useState("");
  const [email,setEmail] =useState("");
  const [phone,setPhone] =useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [comments,setComments] =useState();
  const [error1,setError1] = useState('');
  const [finalRate,setFinalRate] = useState(0)
  const [paymentMethod,setPaymentMethod] = useState("")
  const [value, setValue] = useState({ startDate: null, endDate: null}); 
  const [wallet, setWallet]=useState(0);
  const [walletPayment, setWalletPayment] = useState(false)
  const [razorPayment, setRazorPayment] = useState(false)
 
    
  const handleValueChange = (newValue) => {
      setValue(newValue); 
      let total = ((new Date(newValue.endDate)-new Date(newValue.startDate))/(24*60*60*1000)+1)*vehicleRate
      setFinalRate(total)

  } 
 
  function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
  }


  async function displayRazorpay(order, bookingId) {
    const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }

    // creating a new order
    const result = order;

    if (!result) {
        alert("Server error. Are you online?");
        return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result;

    const options = {
        key: "rzp_test_wqr30ojoxgZVJw", // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: currency,
        name: "Loom Cars",
        description: "Test Transaction",
        order_id: order_id,
        handler: async function (response) {
            const data = {
                orderCreationId: order_id,
                bookingId: bookingId,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
            };

            const result = await axios.post(`${userBaseUrl}/paymentConfirm`, data);

            console.log("razror pay output =>",result.data.bookingId )

            toast.success('Vehicle Booked')

            setTimeout(()=>{navigate("/user/bookingSuccessfull/"+result.data.bookingId)}, 2000);
        },
        prefill: {
            name: name,
            email: email,
            contact: ""+phone,
        },
        notes: {
            address: name + email,
        },
        theme: {
            color: "#61dafb",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}






  const bookVehicle = async ()=>{
      try {
        
        let token = localStorage.getItem("token");
        let decoded = jwt_decode(token);

        // props.setLoading(true)
        let serverRespose = await axios({
          method: "post",
          url: "/booking",
          // headers: {
          //   Authorization: "Bearer " + localStorage.getItem("token"),
          // },
          data: {
            carId: vehicleId,
            userId:decoded.userId,
            datesBooked:value,
            paymentMethod:{walletPayment:walletPayment, razorPayment:razorPayment },
            paymentStatus:"pending" ,
            bookingStatus:"Booked" ,
            name:name ,
            email: email,
            comments:comments ,
            phone: phone,
            amount: finalRate,
            walletBalace:wallet
          },
        });
        // props.setLoading(false)
        if (serverRespose.data.message == "sucess") {
          let bookingId=serverRespose.data.data._id 
          if(razorPayment){

            
           
            displayRazorpay(serverRespose.data.order,bookingId)


          }else{

            toast.success('Vehicle Booked')

            setTimeout(()=>{navigate("/user/bookingSuccessfull/"+bookingId)}, 2000);

          }
          

          
        } else {
          setError1("Please re-try after some time");
          
        }





      } catch (error) {
        console.log(error)
        if (error.response.status == 401) {
          localStorage.clear();
          navigate("/user/login");
        }
      }
  }








 

  useEffect(()=>{
    
    getDataFromServer(userId);

  },[])
  
  const getDataFromServer = async (userId) => {
    try {
      let serverRespose = await axios({
        method: "get",
        url: "/userDetails",
        params: {
          userId:userId
        },
      });
     
      if (serverRespose.data.message == "sucess") {
        setName(serverRespose.data.data.name);
        setEmail(serverRespose.data.data.email);
        setPhone(serverRespose.data.data.phone);
        setWallet(serverRespose.data.data.walletBalance)

      } else {
        setError1("Please re-try after some time");
      }
    } catch (error) {
      console.log(error);
    }
  };




  return (
    <div className='w-full h-full rounded-2xl '>
      <div className='grid grid-rows-5 m-5' >
        <h1 className="font-medium"> Booking Details </h1>
        <input 
            onChange={(e)=>{setName(e.target.value)}}
            type="text" className="mt-5 border-2 rounded-md" placeholder='Full Name' value={name} />
        <input 
            onChange={(e)=>{setEmail(e.target.value)}}
            type="email" className="mt-5 border-2 rounded-md" placeholder='Email' value={email}/>
        <input 
            onChange={(e)=>{setPhone(e.target.value)}}
            type="number" className="mt-5 border-2 rounded-md" placeholder='Phone Number' value={phone}/>
       
       
       
        <Datepicker 
            useRange={false} 
            value={value} 
            onChange={handleValueChange} 
            placeholder={"Select Date"} 
            minDate={new Date(startDateInString)} 
            maxDate={new Date(endDateInString)} 
          
            inputClassName=" rounded-md  font-normal bg-white text-black w-full mt-5 h-8 border-2 " 
            disabledDates={bookedDays} 
          /> 


       
       
        <textarea  
          value={comments}
          onChange={(e)=>setComments(e.target.value)}
        cols="40" rows="5" className='mt-5 border-2 rounded-md' placeholder='Comments'></textarea>
        <p className=" mt-2 text-slate-600">please review the final fare </p>
        <h1 className="text-right"> Rs.{finalRate} </h1>
        <h2 className=" font-semibold mb-3">Payment Mathods </h2>
        <div className=" ms-5">
            <input 
              disabled={wallet>=finalRate && walletPayment}  
              type="checkbox" id="razerPay" name="pay_method" 
              value="razerPay" className='' 
              checked={!(wallet>=finalRate && walletPayment) && razorPayment}
              onChange={(e)=>setRazorPayment(e.target.checked)}
              />
            <label for="razerPay" className=''>Razer Pay</label>
            <br className=''></br>
            <input 
              disabled={wallet==0}
              type="checkbox" id="wallet" name="pay_method" 
              value="wallet" 
              onChange={(e)=>{
                if(wallet>=finalRate){
                  setRazorPayment(false)
                }
                setWalletPayment(e.target.checked)}} 
              />
            <label for="wallet">Wallet Payment (Rs.{wallet})</label>
        </div>
        
        <button className=" bg-[rgb(16,163,16)] w-3/5 py-3  rounded-xl mx-auto mt-4 font-semibold text-white" onClick={bookVehicle}>PROCEED TO PAY </button>

      </div>
      <Toaster />
    </div>
  )
}

export default VehiclePayment
