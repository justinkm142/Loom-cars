import React from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function LoginWindow(props) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  //navigation
  const navigate = useNavigate();

  //set errors
  const [error1, setError1] = useState("");

  //set inputs
  const emailCheck = (e) => {
    setEmail(e.target.value);
    setError1("");
  };

  const passwordCheck = (e) => {
    setPassword(e.target.value);
    setError1("");
  };

  const loginCheck = async (e) => {
    try {
      e.preventDefault();
      if (email == "" || password == "") {
        return setError1("Enter Email and Password");
      }

      let serverRespose = await axios({
        method: "post",
        url: "http://localhost:3000/api/v1/user/signin",
        data: {
          email: email,
          password: password,
        },
      });
      if (serverRespose.data.message == "sucess") {
        localStorage.setItem("token", serverRespose.data.token);
        navigate("/user/home");
      } else {
        setError1("Please re-try after some time");
      }
    } catch (err) {
      console.log(err.response);
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
            <p className="font-bold text-[32px] text-[#828268] ">Login</p>
            <form
              action="#"
              className="mt-8 grid grid-cols-6 gap-4 "
              onSubmit={loginCheck}
            >
              <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="Email"
                  className="block font-bold text-[16px] text-[#828268]"
                >
                  Email
                </label>

                <input
                  type="text"
                  id="Email"
                  name="Email"
                  onChange={emailCheck}
                  className="mt-1 w-full h-10 rounded-md bg-[#323231]  text-white  shadow-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="Password"
                  className="block font-bold text-[16px] text-[#828268]"
                >
                  Password
                </label>

                <input
                  type="password"
                  id="Password"
                  name="Password"
                  onChange={passwordCheck}
                  className="mt-1 w-full h-10 rounded-md bg-[#323231]  text-white  shadow-sm"
                />
              </div>

              <div className="col-span-6 sm:flex sm:items-center mx-auto sm:gap-4">
                <button
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium 
              text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  Login
                </button>
              </div>

              <div className="col-span-6 sm:flex sm:items-center mx-auto sm:gap-4">
                <p className="text-center text-red-700 ">{error1}</p>
              </div>

              <hr className=" col-span-6  border-1 border-zinc-800"></hr>

              <div className="col-span-6 sm:flex sm:items-center mx-auto sm:gap-4">
                <button type="button"
                  className="ms-4 mt-5 inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium 
              text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  Gmail Login
                </button>
                <button type="button"
                  className=" ms-4 mt-5 inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium 
              text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                 onClick={()=>{props.setShowModal(true)}}>
                  OTP Login
                </button>
              </div>

              <Link to={"/user/signup"} className="col-span-6 text-[#828268]">
                {" "}
                Not registered ? click here to register{" "}
              </Link>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}

export default LoginWindow;
