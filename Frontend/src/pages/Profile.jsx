import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../components/Loader/Loader";

const Profile = () => {
  // const host = 'http://localhost:1000';
  const host = "https://onlinebookstore-ba29.onrender.com";

  // const isLoggedIn = useSelector();
  const [Profile, setProfile] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${host}/api/auth/get-user-information`,
        { headers }
      );
      // console.log(response.data);
      setProfile(response.data);
    };
    fetch();
  }, []); //[] this symbol means dependency array which is empty now.

  return (
    <div className="bg-zinc-900 px-2 md:px-12 text-white flex flex-col md:flex-row h-auto py-8 gap-4">
      {!Profile && (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      )}
      {Profile && (
        <>
          <div className=" w-full md:w-2/6 lg:w-2/6 md:h-[85vh] ">
            <Sidebar data={Profile} />
          </div>
          <div className="md:w-4/6 lg:w-4/6 h-auto">
            {" "}
            <Outlet />{" "}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
