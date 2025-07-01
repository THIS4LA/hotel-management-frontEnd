import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin() {
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/users/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        if (res.data.type == "admin") {
          const token = localStorage.getItem("token");
          console.log(token);
          navigate("/admin");
        } else if (res.data.type == "user") {
          const token = localStorage.getItem("token");
          console.log(token);
          navigate("/user");
        }
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error(err.message);
        }
      });
  }
  return (
    <div className="flex w-full h-[100vh] bg-[#f9f9f9] items-center justify-center">
      <div className="flex flex-col w-[450px] h-[500px] bg-white items-center drop-shadow-sm rounded px-6 gap-2">
        <h1 className="text-[28px] pt-8 font-semibold">Welcome Back</h1>
        <p className="text-slate-500">Please Enter Your details to sign in</p>
        <div className="w-full pt-6">
          <label>Your Email Address</label>
          <input
            type="email"
            placeholder="Enter Your Email"
            className="border w-full h-10 border-slate-300 rounded-md placeholder:text-slate-500 px-2"
            defaultValue={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="w-full pt-2">
          <label>Password</label>
          <input
            type="password"
            placeholder="*****************"
            className="border w-full h-10 border-slate-300 rounded-md placeholder:text-slate-500 px-2"
            defaultValue={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="w-full pt-2 flex flex-row justify-between">
          <div>
            <input type="checkbox" />
            <label className="pl-2">Remember Me</label>
          </div>
          <Link className="text-blue-600">Forgot Password?</Link>
        </div>
        <button
          onClick={handleLogin}
          className="bg-black w-full h-10 rounded-md text-white items-center justify-center flex mt-5"
        >
          Login
        </button>
        <div>
          <label>Don't have an account?</label>
          <Link className="pl-1 text-blue-600">Signup</Link>
        </div>
      </div>
    </div>
  );
}
