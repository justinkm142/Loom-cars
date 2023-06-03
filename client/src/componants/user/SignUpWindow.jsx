import React from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../utils/axiosInterceptor_user";
import { useState, useEffect } from "react";

function LoginWindow() {
  const navigate = useNavigate();

  // set inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error1, setError1] = useState("");

  // set errors
  const [nameErr, setNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [numberErr, setNumberErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [confirmPasswordErr, setConfirmPasswordErr] = useState(false);

  //check errors
  const nameCheck = (e) => {
    setName(e.target.value);
    let regex = /^[a-zA-Z ]{3,16}$/;
    setNameErr(!regex.test(e.target.value));
  };
  const emailCheck = (e) => {
    setEmail(e.target.value);
    let regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    setEmailErr(!regex.test(e.target.value));
  };
  const phoneCheck = (e) => {
    setNumber(e.target.value);
    let regex = /^[0-9]{10}$/;
    setNumberErr(!regex.test(e.target.value));
  };
  const passwordCheck = (e) => {
    setPassword(e.target.value);
    let regex =
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    setPasswordErr(!regex.test(e.target.value));
  };

  const passwordConfirmCheck = (data) => {
    let data1 = data;
    setConfirmPassword(data1);
    if (data1 === password) {
      setConfirmPasswordErr(false);
    } else {
      setConfirmPasswordErr(true);
    }
  };

  //error massage css
  let cssName = nameErr ? "block" : "hidden";
  let cssEmail = emailErr ? "block" : "hidden";
  let cssPhone = numberErr ? "block" : "hidden";
  let cssPassword = passwordErr ? "block" : "hidden";
  let cssPasswordConfirm = confirmPasswordErr ? "block" : "hidden";

  const registerUser = async (e) => {
    e.preventDefault();
    if (name == "") setNameErr(true);
    if (email == "") setEmailErr(true);
    if (number == "") setNumberErr(true);
    if (password == "") setPasswordErr(true);
    if (confirmPassword == "") setConfirmPasswordErr(() => true);
    if (nameErr || emailErr || numberErr || passwordErr || confirmPasswordErr) {
      return false;
    }
    try {
      let serverRespose = await axios({
        method: "post",
        url: "/signup",
        data: {
          name,
          email,
          phone: number,
          password,
        },
      });

      if (serverRespose.data.message == "sucess") {
        localStorage.setItem("token", serverRespose.data.token);
        navigate("/user/home");
      } else {
        setError1("Please re-try after some time");
      }
    } catch (err) {
      console.log(err.response.data.error);
      setError1(err.response.data.error);
    }
  };



  return (
    <section className="bg-black p-3">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-black lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Night"
            src="../../../photos/blackCar.png"
            className="absolute inset-0 my-auto max-w-full max-h-full  object-cover opacity-80"
          />
        </section>

        <main
          aria-label="Main"
          className="m-5 rounded-2xl flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 border-zinc-800 border-2 bg-[#1F1F1E] w-5/6"
        >
          <div className="max-w-xl lg:max-w-3xl">
            <p className="font-bold text-[32px] text-[#828268] ">Register</p>
            <form
              action="#"
              className="mt-8 grid grid-cols-6 gap-4"
              onSubmit={registerUser}
            >
              <div className="col-span-6 ">
                <label
                  htmlFor="Name"
                  className="block font-bold text-[16px] text-[#828268]"
                >
                  Name
                </label>

                <input
                  type="string"
                  id="Name"
                  name="Name"
                  className="mt-1 w-full h-10 col-span-6 rounded-md bg-[#323231]  text-white  shadow-sm "
                  onChange={nameCheck}
                />
                <span className={`text-red-500 ${cssName} `}>
                  Name should be 3-16 characters and shouldn't include any
                  special character!
                </span>
              </div>
              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block font-bold text-[16px] text-[#828268]"
                >
                  Email
                </label>

                <input
                  type="email"
                  id="Email"
                  name="Email"
                  className="mt-1 w-full h-10 rounded-md bg-[#323231]  text-white  shadow-sm"
                  onChange={emailCheck}
                />
                <span className={`text-red-500 ${cssEmail} `}>
                  It should be a valid email address!
                </span>
              </div>
              <div className="col-span-6">
                <label
                  htmlFor="Phone"
                  className="block font-bold text-[16px] text-[#828268]"
                >
                  Phone Number
                </label>

                <input
                  type="number"
                  id="Phone"
                  name="Phone"
                  className="mt-1 w-full h-10 rounded-md bg-[#323231]  text-white  shadow-sm"
                  onChange={phoneCheck}
                />
                <span className={`text-red-500 ${cssPhone} `}>
                  Phone should be contails numbers only and ten digit is
                  required!
                </span>
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Password"
                  className="block font-bold text-[16px] text-[#828268]"
                >
                  Password
                </label>
                <input
                  id="Password"
                  name="Password"
                  type="password"
                  onChange={passwordCheck}
                  className="mt-1 w-full h-10 rounded-md bg-[#323231]  text-white  shadow-sm"
                />
                <span className={`text-red-500 ${cssPassword} `}>
                  Password should be 8-20 characters and include at least 1
                  letter, 1 number and 1 special character!
                </span>
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="PasswordConfirmation"
                  className="block font-bold text-[16px] text-[#828268]"
                >
                  Confirm Password
                </label>

                <input
                  value={confirmPassword}
                  id="PasswordConfirmation122323"
                  name="PasswordConfirmation12"
                  type="password"
                  onChange={(e) => passwordConfirmCheck(e.target.value)}
                  className="mt-1 w-full h-10 rounded-md bg-[#323231]  text-white  shadow-sm"
                />
                <span className={`text-red-500 ${cssPasswordConfirm} `}>
                  Passwords don't match!
                </span>
              </div>

              <div className="col-span-6 flex items-center justify-center sm:gap-4">
                <button className=" disabled:opacity-25 inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                  Create an account
                </button>
              </div>
              <div className="col-span-6 ">
                <span className="text-red-500">{error1}</span>
              </div>

              <div className=" invisible col-span-3 sm:flex sm:items-center sm:gap-4">
                <button  className=" inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 " >
                  Create an account
                </button>
              </div>
            </form>
            <p className="mt-4  text-[#828268] sm:mt-4 ">
              Already have an account ?
              <Link to={"/user/login"} className="text-[#828268] underline">
                {" "}
                Log in
              </Link>
            </p>
          </div>
        </main>
      </div>
    </section>
  );
}
export default LoginWindow;
