import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const LogIn = () => {
  // const host = 'http://localhost:1000';
  const host = "https://onlinebookstore-ba29.onrender.com";

  const [Values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch(); // it help to change the current state.

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async () => {
    try {
      if (Values.email === "" || Values.password === "") {
        toast.error("All fields are required");
      } else {
        const response = await axios.post(
          `${host}/api/auth/sign-in`,
          Values
        );
        // console.log(response.data.id)
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        // console.log(response.data);
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      // console.log(error.response.data);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-100 text-xl text-center font-bold">Login</p>
        <div className="mt-4">
          <div className="mt-4">
            <label className="text-zinc-300">Email</label>
            <input
              type="text"
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
            <button
              onClick={submit}
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-700"
            >
              LogIn
            </button>
          </div>
          <p className=" mt-4 text-right text-zinc-300 font-semibold">
            Don't have an account ? &nbsp;
            <Link
              to="/signUp"
              className="text-blue-300 hover:text-blue-500 underline font-bold"
            >
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
