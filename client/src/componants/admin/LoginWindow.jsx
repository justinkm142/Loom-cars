import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axiosInterceptor_admin";
import { useState } from "react";

function LoginWindow() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error1, setError1] = useState("");

  const loginCheck = async () => {
    try {
      if (email == "" || password == "") {
        return setError1("Enter Email and Password");
      }

      let serverRespose = await axios({
        method: "post",
        url: "/login",
        data: {
          email: email,
          password: password,
        },
      });
      if (serverRespose.data.message == "sucess") {
        localStorage.setItem("admin_token", serverRespose.data.token);
        navigate("/admin/dashboard");
      } else {
        setError1("Please re-try after some time");
      }
    } catch (err) {
      console.log(err);
      setError1(err.response.data.error);
    }
  };

  return (
    <div
      className="mt-10 mx-auto w-64 rounded-xl shadow-inner shadow-slate-200"
      style={{ backgroundColor: "#1f1f1f" }}
    >
      <div className="p-10">
        <p className="text-zinc-400 text-3xl">Login</p>
        <p className="text-zinc-400 mt-10 pb-1">Email ID</p>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
            setError1("");
          }}
          value={email}
          className="block rounded-sm bg-zinc-600 text-white ps-1 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
        ></input>
        <p className="text-zinc-400 mt-5 pb-1">Password</p>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
            setError1("");
          }}
          value={password}
          className="block ps-1 rounded-sm bg-zinc-600 text-white focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
          type="password"
        ></input>
        <button
          className="text-white m-5 p-2 ms-10 bg-stone-600 w-20 rounded-lg hover:bg-stone-400 active:bg-stone-900 border-collapse"
          onClick={() => {
            loginCheck();
          }}
        >
          Login{" "}
        </button>
        <p className="text-center text-red-700">{error1}</p>
      </div>
    </div>
  );
}

export default LoginWindow;
