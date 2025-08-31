import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { MdKeyboardArrowLeft } from "react-icons/md";

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleSignUp() {
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/users/", formData)
      .then((res) => {
        toast.success(
          "Registration Successful! Please Login." + res.data.message
        );
        navigate("/login");
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
      <div className="flex flex-col w-[450px] bg-white items-center drop-shadow-sm rounded px-6 pb-8 gap-2">
        <button
          className="flex items-center left-0 text-blue-400 pt-5 hover:text-blue-200"
          onClick={() => navigate("/")}
        >
          <MdKeyboardArrowLeft />
          Go Back Homepage
        </button>
        <h1 className="text-[28px] pt-3 font-semibold">Welcome!</h1>
        <p className="text-slate-500">Please Enter Your details to Create an account</p>
        <div className="w-full pt-6">
          <label>Your First Name</label>
          <input
            type="text"
            name="firstName"
            required
            placeholder="Enter Your First Name"
            className="border w-full h-10 border-slate-300 rounded-md placeholder:text-slate-500 px-2"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="w-full pt-2">
          <label>Your Last Name</label>
          <input
            type="text"
            name="lastName"
            required
            placeholder="Your Last Name"
            className="border w-full h-10 border-slate-300 rounded-md placeholder:text-slate-500 px-2"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="w-full pt-2">
          <label>Your Contact Number</label>
          <input
            type="text"
            name="phone"
            required
            placeholder="Your Contact Number"
            className="border w-full h-10 border-slate-300 rounded-md placeholder:text-slate-500 px-2"
            value={formData.contactNumber}
            onChange={handleChange}
          />
        </div>
        <div className="w-full pt-2">
          <label>Your Email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="Your Email"
            className="border w-full h-10 border-slate-300 rounded-md placeholder:text-slate-500 px-2"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="w-full pt-2">
          <label>Password</label>
          <input
            type="password"
            name="password"
            required
            placeholder="Your Password"
            className="border w-full h-10 border-slate-300 rounded-md placeholder:text-slate-500 px-2"
            defaultValue={formData.password}
            onChange={handleChange}
          />
        </div>
        <button
          onClick={handleSignUp}
          className="bg-black w-full h-10 rounded-md text-white items-center justify-center flex mt-5"
        >
          Create Account
        </button>
        <div>
          <label>Already have an account?</label>
          <Link className="pl-1 text-blue-600" to={"/login"}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
