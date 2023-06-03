import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {MdDelete} from 'react-icons/md'
import toast, { Toaster } from 'react-hot-toast';
import axios from '../../utils/axiosInterceptor_user';
import jwt_decode from "jwt-decode";




function EditVehicle(props) {

    const [feature,setFeature] =useState([])
    const [image,setImage] = useState([])
    const [error1,setError1] = useState("")
    const navigate = useNavigate()

    const [userInputError, setUserInputError] = useState({
      CarNumberError: false,
      CarMakeError: false,
      ManufactureYearError: false,
      KmsDrivenError: false,
      AvailableLocationError: false,
      FuelTypeError: false,
      TransmissionError: false,
      SeatCapacityError: false,
      CategoryError: false,
      ActualPriceError: false,
      RentingPriceError: false,
    });

    const [userInput, setUserInput] = useState({
      CarNumber: "",
      CarMake: "",
      ManufactureYear: "",
      KmsDriven: "",
      AvailableLocation: "",
      FuelType: "",
      Transmission: "",
      SeatCapacity: "",
      Category: "",
      ActualPrice: "",
      RentingPrice: "",
    });

    useEffect(()=>{
      getVehicleData()
    },[])



    const getVehicleData = async () => {
      try {
        let serverRespose = await axios({
          method: "get",
          url: "/editVehicle",
          params: {
            vehicleId: props.vehicleId,  
          },
          // headers: {
          //   Authorization: "Bearer " + localStorage.getItem("token"),
          // },
        });
        if (serverRespose.data.message == "sucess") {
          let obj = {
            CarNumber: serverRespose.data.result[0].carNumber,
            CarMake: serverRespose.data.result[0].carMake,
            CarModel: serverRespose.data.result[0].carModel,
            ManufactureYear: serverRespose.data.result[0].manufactureYear,
            KmsDriven: serverRespose.data.result[0].kmDriven,
            AvailableLocation: serverRespose.data.result[0].availableLocation,
            FuelType: serverRespose.data.result[0].fuelType,
            Transmission: serverRespose.data.result[0].transmission,
            SeatCapacity: serverRespose.data.result[0].seatCapacity,
            Category: serverRespose.data.result[0].category,
            ActualPrice: serverRespose.data.result[0].actualPrice,
            RentingPrice: serverRespose.data.result[0].rentingPrice,
          }
         
          setUserInput((pre) => {
            return {...pre, ...obj};
          });
          // setFeature((prev)=>{
          //   return (serverRespose.data.result[0].feature)
          // })

          setFeature([...serverRespose.data.result[0].feature])

          console.log("vehicle data from server" , userInput)
          console.log("vehicle feacture data from server" , feature)
          console.log("vehicle feacture data from server" , serverRespose.data.result[0].feature)
        } else {
          toast.error("Somthing Went Wrong!");
        }
      } catch (error) {
        console.log(error);
        toast.error("Somthing Went Wrong!");
        if (error.response.status == 401) {
          localStorage.clear();
          navigate("/user/login");
        }
      }
    };


    // const convertBase64 = (file) => {
    //   return new Promise((resole, reject) => {
    //     const fileReader = new FileReader();
    //     fileReader.readAsDataURL(file);
    //     fileReader.onload = () => {
    //       resole(fileReader.result);
    //     };
    //     fileReader.onerror = (error) => {
    //       reject(error);
    //     };
    //   });
    // };

    const formSubmition = async (e) => {
      try {
        e.preventDefault();
        if((userInput.CarNumber=="") || (userInput.CarMake =="") || (userInput.ManufactureYear=="")
        || (userInput.KmsDriven=="") || (userInput.AvailableLocation=="") || (userInput.FuelType=="") || (userInput.Transmission=="")
        || (userInput.SeatCapacity=="") || (userInput.Category=="") || (userInput.ActualPrice=="") || (userInput.RentingPrice=="") ){
          toast.error("Enter all the Details!");
          return false ;
        }

        if((userInputError.CarNumberError==true) || (userInputError.CarMakeError ==true) || (userInputError.ManufactureYearError==true)
        || (userInputError.KmsDrivenError==true) || (userInputError.AvailableLocationError==true) || (userInputError.FuelTypeError==true) || (userInputError.TransmissionError==true)
        || (userInputError.SeatCapacityError==true) || (userInputError.CategoryError==true) || (userInputError.ActualPriceError==true) || (userInputError.RentingPriceError==true) ){
          toast.error("Enter Valid Details!");
          return false ;
        }

       
        // const base64s = [];
        // for (let i = 0; i < image.length; i++) {
        //   let base = await convertBase64(image[i]);
        //   base64s.push(base);
        // }
        let token = localStorage.getItem("token");
        let decoded = jwt_decode(token);
        console.log("user id is ", decoded.userId);
        props.setLoading(true)
        let serverRespose = await axios({
          method: "patch",
          url: "/editVehicle",
          // headers: {
          //   Authorization: "Bearer " + localStorage.getItem("token"),
          // },
          data: {
            userInput,
            feature,
            vehicleId: props.vehicleId,
          },
        });
        props.setLoading(false)
        if (serverRespose.data.message == "sucess") {
          navigate("/user/host");
        } else {
          setError1("Please re-try after some time");
        }
      } catch (error) {
        props.setLoading(false)
        console.log(error.response);
        if (error.response?.status == 401) {
          localStorage.clear();
          navigate("/user/login");
        }
      }
    };

    // const handleImage = (e) => {
    //   // setImage([...image,e.target.files[0]])
    //   let temp = [];
    //   for (let i = 0; i < e.target.files?.length; i++) {
    //     let type = e.target.files[i]?.type.split("/")[0];
    //     if (type == "image") {
    //       temp = [...temp, e.target.files[i]];
    //     } else {
    //       toast.error("Select Only Images!");
    //     }
    //   }
    //   setImage(() => {
    //     return [...temp];
    //   });
    // };

    // const deleteImage = (index) => {
    //   let temp = image.filter((array) => {
    //     return !(image[index] == array);
    //   });
    //   setImage(temp);
    // };

    const checkBox = (e) => {
      console.log(e.target.checked);
      if (e.target.checked === true) {
        setFeature([...feature, e.target.value]);
      } else {
        const newArray = feature.filter((data) => data !== e.target.value);
        setFeature(newArray);
      }
      console.log(feature);
    };

   

  return (
    <div className="w-full pt-5">
      <form method="post" action="#" onSubmit={formSubmition}>
        <h1 className="text-4xl text-black text-left w-full align-top ms-3 mb-2 font-bold ">
          Edit Vehicle
        </h1>

{/* car Number  */}
        <div className="grid grid-cols-3 gap-2 mx-6">
          <p className="col-span-1">Car Number </p>
          <input
            value={userInput.CarNumber}
            name="CarNumber"
            onChange={(e) => {
              let temp = {};
              temp["CarNumber"] = e.target.value;
              setUserInput((preValue) => {
                return { ...preValue, ...temp };
              });

              let regex = /^[0-9a-zA-Z-]{3,16}$/;
              let err= !regex.test(e.target.value)
              let temp1={};
              temp1['CarNumberError']=err;
              setUserInputError((preValue)=>{
                return {...preValue, ...temp1 }
              })

            }}
            className="border col-span-2 rounded-md"
          ></input>
           {userInputError.CarNumberError ?  
            <p className='text-red-500'> Enter Vehicle Number </p> : null
           }
        </div>

{/* car make */}

        <div className="grid grid-cols-3 gap-2 mx-6 mt-3">
              <p className="col-span-1">Car Make </p>
              <input
                value={userInput.CarMake}
                onChange={(e) => {
                  let temp = {};
                  temp['CarMake'] = e.target.value;
                  setUserInput((preValue) => {
                    return { ...preValue, ...temp };
                  });

                  let regex = /^[a-zA-Z ]{3,16}$/;
                  let err= !regex.test(e.target.value)
                  let temp1={};
                  temp1['CarMakeError']=err;
                  setUserInputError((preValue)=>{
                    return {...preValue, ...temp1 }
                  })
                }}
                className="border col-span-2 rounded-md"
              ></input>
              {userInputError.CarMakeError ?  
                <p className='text-red-500'> Enter Vehicle Make </p> : null
              }
              
        </div>

{/* car Model */}

        <div className="grid grid-cols-3 gap-2 mx-6 mt-3">
              <p className="col-span-1">Car Model </p>
              <input
                value={userInput.CarModel}
                onChange={(e) => {
                  let temp = {};
                  temp['CarModel'] = e.target.value;
                  setUserInput((preValue) => {
                    return { ...preValue, ...temp };
                  });

                  let regex = /^[a-zA-Z ]{3,16}$/;
                  let err= !regex.test(e.target.value)
                  let temp1={};
                  temp1['CarModelError']=err;
                  setUserInputError((preValue)=>{
                    return {...preValue, ...temp1 }
                  })                 
                }}
                className="border col-span-2 rounded-md"
              ></input>
              {userInputError.CarModelError ?  
               <p className='text-red-500'> Enter Vehicle Model </p> : null
              }
        </div>


{/* manufactue year  */}

        <div className="grid grid-cols-3 gap-2 mx-6 mt-3">
              <p className="col-span-1">Manufacture Year </p>
              <input
                value={userInput.ManufactureYear}
                onChange={(e) => {
                  let temp = {};
                  temp['ManufactureYear'] = e.target.value;
                  setUserInput((preValue) => {
                    return { ...preValue, ...temp };
                  });
                 
                  let regex = /^[0-9]{4}$/;
                  let err= !regex.test(e.target.value)
                  let temp1={};
                  temp1['ManufactureYearError']=err;
                  setUserInputError((preValue)=>{
                    return {...preValue, ...temp1 }
                  }) 
                }}
                type='Number'
                className="border col-span-2 rounded-md"
              ></input>
               {userInputError.ManufactureYearError ?  
               <p className='text-red-500'> Enter Manufacture Year </p> : null
              }
        </div>

{/* KMS Driven   */}

        <div className="grid grid-cols-3 gap-2 mx-6 mt-3">
              <p className="col-span-1">Kms Driven </p>
              <input
                value={userInput.KmsDriven}
                onChange={(e) => {
                  let temp = {};
                  temp['KmsDriven'] = e.target.value;
                  setUserInput((preValue) => {
                    return { ...preValue, ...temp };
                  });
                  
                  let regex = /^[0-9]{3,}$/;
                  let err= !regex.test(e.target.value)
                  let temp1={};
                  temp1['KmsDrivenError']=err;
                  setUserInputError((preValue)=>{
                    return {...preValue, ...temp1 }
                  }) 

                }}
                type='Number'
                className="border col-span-2 rounded-md"
              ></input>
               {userInputError.KmsDrivenError ?  
               <p className='text-red-500'> Enter KM Driven </p> : null
              }
        </div>

{/* Available location   */}

        <div className="grid grid-cols-3 gap-2 mx-6 mt-3">
              <p className="col-span-1">Available Location </p>
             <select 
              value={userInput.AvailableLocation}
              className=" col-span-2 rounded-md border "
              onChange={(e) => {
                let temp = {};
                temp['AvailableLocation'] = e.target.value;
                setUserInput((preValue) => {
                  return { ...preValue, ...temp };
                });
                console.log(userInput);
              }}
             >
                <option selected >Choose Location</option>
                <option value="KOCHI">Kochi</option>
                <option value="CHENNAI">Chennai</option>
                <option value="TRIVANDRUM">Trivandrum</option>
                <option value="THRISSUR">Thrissur</option>
                <option value="CALICUT">Calicut</option>
              </select>
        </div>

{/* Fuel types */}

        <div className="grid grid-cols-3 gap-2 mx-6 mt-3">
              <p className="col-span-1">Fuel Types </p>
             <select  
              value={userInput.FuelType}
              className=" col-span-2 rounded-md border "
              onChange={(e) => {
                let temp = {};
                temp['FuelType'] = e.target.value;
                setUserInput((preValue) => {
                  return { ...preValue, ...temp };
                });
                console.log(userInput);
              }}
             >
                <option selected>Choose Fuel types</option>
                <option value="PETROL">Petrol</option>
                <option value="DIESEL">Diesel</option>
              </select>
        </div>

{/* Transmission  */}
   
        <div className="grid grid-cols-3 gap-2 mx-6 mt-3">
              <p className="col-span-1">Transmission </p>
             <select 
              value={userInput.Transmission}
              className=" col-span-2 rounded-md border "
              onChange={(e) => {
                let temp = {};
                temp['Transmission'] = e.target.value;
                setUserInput((preValue) => {
                  return { ...preValue, ...temp };
                });
                console.log(userInput);
              }}
             >
                <option selected>Choose Transmission</option>
                <option value="AUTOMATIC">Automatic</option>
                <option value="MANUAL">Manual</option>
              </select>
        </div>

{/* Seat Capacity  */}
        <div className="grid grid-cols-3 gap-2 mx-6 mt-3">
              <p className="col-span-1">Seat Capacity </p>
              <input
                value={userInput.SeatCapacity}
                onChange={(e) => {
                  let temp = {};
                  temp['SeatCapacity'] = e.target.value;
                  setUserInput((preValue) => {
                    return { ...preValue, ...temp };
                  });
                  
                  let regex = /^[0-9]{1}$/;
                  let err= !regex.test(e.target.value)
                  let temp1={};
                  temp1['SeatCapacityError']=err;
                  setUserInputError((preValue)=>{
                    return {...preValue, ...temp1 }
                  }) 

                }}
                type='Number'
                className="border col-span-2 rounded-md"
              ></input>
                {userInputError.SeatCapacityError ?  
               <p className='text-red-500'> Enter Seating Capacity </p> : null
              }             
        </div>

{/* Category  */}
        <div className="grid grid-cols-3 gap-2 mx-6 mt-3">
              <p className="col-span-1">Car Type </p>
             
             <select 
              value={userInput.Category}
              className=" col-span-2 rounded-md border "
              onChange={(e) => {
                let temp = {};
                temp['Category'] = e.target.value;
                setUserInput((preValue) => {
                  return { ...preValue, ...temp };
                });
                console.log(userInput);
              }}
             >
                <option selected>Choose Car Type</option>
                <option value="HATCHBACK">Hatchback</option>
                <option value="SEDAN">Sedan</option>
                <option value="SUV">SUV</option>
              </select>
        </div>

{/* Actual Price  */}

        <div className="grid grid-cols-3 gap-2 mx-6 mt-3">
              <p className="col-span-1">Actual Price </p>
              <input
                value={userInput.ActualPrice}
                onChange={(e) => {
                  let temp = {};
                  temp['ActualPrice'] = e.target.value;
                  setUserInput((preValue) => {
                    return { ...preValue, ...temp };
                  });
 
                  let regex = /^[0-9]{2,}$/;
                  let err= !regex.test(e.target.value)
                  let temp1={};
                  temp1['ActualPriceError']=err;
                  setUserInputError((preValue)=>{
                    return {...preValue, ...temp1 }
                  }) 


                }}
                type='Number'
                className="border col-span-2 rounded-md"
              ></input>

                {userInputError.ActualPriceError ?  
               <p className='text-red-500'> Enter Amont </p> : null
                } 
        </div>


{/* Renting Price  */}

        <div className="grid grid-cols-3 gap-2 mx-6 mt-3">
              <p className="col-span-1">Renting Price </p>
              <input
                value={userInput.RentingPrice}
                onChange={(e) => {
                  let temp = {};
                  temp['RentingPrice'] = e.target.value;
                  setUserInput((preValue) => {
                    return { ...preValue, ...temp };
                  });
                
                  let regex = /^[0-9]{2,}$/;
                  let err= !regex.test(e.target.value)
                  let temp1={};
                  temp1['RentingPriceError']=err;
                  setUserInputError((preValue)=>{
                    return {...preValue, ...temp1 }
                  })
                }}
                type='Number'
                className="border col-span-2 rounded-md"
              ></input>
                {userInputError.RentingPriceError ?  
               <p className='text-red-500'> Enter Amont </p> : null
                } 
        </div>

{/* Feactures  */}

        <div className="grid grid-cols-3 gap-2 mx-6 mt-3">
          <p className="col-span-1">Feactures </p>
          <div className='col-span-2 border p-3 rounded-lg'>

            <div className='grid grid-cols-2 gap-0 '>
                <div className='flex gap-0'>
                    <input 
                    checked={feature.includes("AirBag")}
                    onChange={checkBox}
                    id='ac' 
                    value={"AirBag"}
                    className=" my-auto w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 " type='checkbox'></input>
                     <label htmlFor='ac' className=' text-sm ms-1'> Air Bag</label>
                </div>
                <div className='flex gap-0'>
                    <input 
                    checked={feature.includes("Power Steering")}
                    onChange={checkBox}
                    value={"Power Steering"}
                    id='ac1' className=" my-auto w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 " type='checkbox'></input>
                     <label htmlFor='ac1' className=' text-sm ms-1'> Power Steering</label>
                </div>
                <div className='flex gap-0'>
                    <input 
                    checked={feature.includes("ABS")}
                    onChange={checkBox}
                    value={"ABS"}
                    id='ac2' className=" my-auto w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 " type='checkbox'></input>
                     <label htmlFor='ac2' className=' text-sm ms-1'> ABS</label>
                </div>
                <div className='flex gap-0'>
                    <input id='ac3' 
                    checked={feature.includes("Power Window")}
                    onChange={checkBox}
                    value={"Power Window"}
                    className=" my-auto w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 " type='checkbox'></input>
                     <label htmlFor='ac3' className=' text-sm ms-1'> Power Window</label>
                </div>
               
                <div className='flex gap-0'>
                    <input 
                    checked={feature.includes("Music System")}
                    onChange={checkBox}
                    value={"Music System"}
                    id='ac4' className=" my-auto w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 " type='checkbox'></input>
                     <label htmlFor='ac4' className=' text-sm ms-1'> Music System</label>
                </div>
                <div className='flex gap-0'>
                    <input 
                    checked={feature.includes("Air Condition")}
                    onChange={checkBox}
                    value={"Air Condition"}
                    id='ac5' className=" my-auto w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 " type='checkbox'></input>
                     <label htmlFor='ac5' className=' text-sm ms-1'> Air Condition</label>
                </div>

            </div>

          </div>
          
        </div>

{/* Upload photos */}

        {/* <div className="grid grid-cols-3 gap-2 mx-6 mt-3">
          <p className="col-span-1">Upload Photos </p>
          <input 
          onChange={handleImage}
          className="border col-span-2 rounded-md" type="file" accept='image/*'
          multiple></input>
        </div> */}

{/* image file show  */}

        {/* <div className="grid grid-cols-2 gap-2 mx-6 mt-3">
          {image.map((data,index)=>{
            return(<div className='relative' key={index}>
                    <img className="flex flex-row " key={index} src={URL.createObjectURL(data)}></img>
                    <div 
                    onClick={()=>{
                      deleteImage(index)
                    }}
                    className='absolute top-0 right-0 cursor-pointer bg-white '>
                    <MdDelete size={30} />
                    </div >
                    
            </div>)
          })}
          
        </div> */}

{/* submitt buttons  */}

        <div className="grid grid-cols-2">
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-700 w-1/2 p-3 mt-4 mx-auto rounded-xl hover:bg-blue-500 active:bg-blue-900">
            Cancel
          </button>
          <button className="bg-blue-700 w-1/2 p-3 mt-4 mx-auto rounded-xl hover:bg-blue-500 active:bg-blue-900">
            Submit
          </button>
        </div>


      </form>
      <Toaster />
    </div>
  );
}

export default EditVehicle
