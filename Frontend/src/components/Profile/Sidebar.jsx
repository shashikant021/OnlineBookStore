import React from "react";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";

const Sidebar = ({ data }) => {
  return (
    <div className="bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-[100%]">
      <div className="flex flex-col items-center justify-center">
        <img src={data.avatar} alt="profile_image" className="h-[12vh]" />
        <p className="mt-3 text-xl text-zinc-100 font-semibold ">
          {data.username}
        </p>
        <p className="mt-1 text-zinc-300">{data.email}</p>
        <div className="w-full mt-4 h-[1px] bg-zinc-500 lg:block"></div>
      </div>

      <div className="w-full mt-2 md:mt-0 md:flex-col items-center justify-center flex-row md:flex">
        <Link
          to="/profile"
          className="text-zinc-100 font-semibold px-4 w-full my-2 py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
        >
          Favourites
        </Link>
        <Link
          to="/profile/orderHistory"
          className="text-zinc-100 font-semibold p-2 w-full my-2 py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
        >
          Order History
        </Link>
        <Link
          to="/profile/settings"
          className="text-zinc-100 font-semibold px-4 w-full my-2 py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
        >
          Settings
        </Link>
      </div>
      <button className="bg-zinc-900 w-3/6 md:w-4/6 lg:w-full p-1 mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">
        LogOut <MdLogout className="ms-4" />
      </button>
    </div>
  );
};

export default Sidebar;
