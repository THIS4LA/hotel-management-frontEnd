import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useAuth } from "../../auth/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleLogin() {
    try {
      const res = await login(email, password);
      toast.success("Login Successful! " + res.message);

      if (res.user.type === "admin") {
        navigate("/admin");
      } else if (res.user.type === "customer") {
        navigate("/");
      }
    } catch (err) {
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error(err.message);
      }
    }
  }
  return (
    <div className="flex w-full h-[100vh] bg-[#f9f9f9] items-center justify-center">
      <div className="flex flex-col w-[450px] h-[500px] bg-white items-center drop-shadow-sm rounded px-6 gap-2">
        <button
          className="flex items-center left-0 text-blue-400 pt-5 hover:text-blue-200"
          onClick={() => navigate("/")}
        >
          <MdKeyboardArrowLeft />
          Go Back Homepage
        </button>
        <h1 className="text-[28px] pt-3 font-semibold">Welcome Back</h1>
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
        <button
          onClick={handleLogin}
          className="bg-black w-full h-10 rounded-md text-white items-center justify-center flex mt-5"
        >
          Login
        </button>
        <div>
          <label>Don't have an account?</label>
          <Link className="pl-1 text-blue-600" to={"/register"}>
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}
