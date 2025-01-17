import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async () => {
    try {
      if (
        Values.username === "" ||
        Values.email === "" ||
        Values.password === "" ||
        Values.address === ""
      ) {
        toast.error("All fields are required");
      } else {
        const response = await axios.post(
          "http://localhost:1000/api/auth/sign-up",
          Values
        );
        // console.log(response.data);
        toast.success(response.data.message);
        navigate('/login')
      }
    } catch (error) {
      // console.log(error.response);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-100 text-xl text-center font-bold">Sign Up</p>
        {/* <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div> */}
        <div className="mt-4">
          <div className="mt-4">
            <label className="text-zinc-300">Username</label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-700 p-2 outline-none text-white"
              placeholder="username"
              name="username"
              required
              value={Values.username}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label className="text-zinc-300">Email</label>
            <input
              type="email"
              className="w-full mt-2 bg-zinc-700 p-2 outline-none text-white"
              placeholder="xyz@gmail.com"
              name="email"
              required
              value={Values.email}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label className="text-zinc-300">Password</label>
            <input
              type="password"
              className="w-full mt-2 bg-zinc-700 p-2 outline-none text-white"
              placeholder="password"
              name="password"
              required
              value={Values.password}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label className="text-zinc-300">Address</label>
            <textarea
              rows="3"
              className="w-full mt-2 bg-zinc-700 p-2 outline-none text-white"
              placeholder="address..."
              name="address"
              required
              value={Values.address}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <button
              onClick={submit}
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-700"
            >
              Sign Up
            </button>
          </div>
          <p className=" mt-4 text-right text-zinc-300 font-semibold">
            Already have an account ? &nbsp;
            <Link
              to="/login"
              className="text-blue-300 hover:text-blue-500 underline font-bold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
