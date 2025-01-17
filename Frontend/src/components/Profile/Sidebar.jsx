import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { authActions } from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";
const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);

  return (
    <div className="bg-zinc-800 p-4 rounded flex flex-row md:flex-col items-center justify-between h-[100%]">
      <div className="w-3/6 md:w-full ">
      <div className="flex flex-col items-center justify-center">
        <img src={data.avatar} alt="profile_image" className="h-[12vh]" />
        <p className="mt-3 text-xl text-zinc-100 font-semibold ">
          {data.username}
        </p>
        <p className="mt-1 text-zinc-300">{data.email}</p>
        <div className="w-5/6 mt-4 h-[1px] bg-zinc-500"></div>
      </div>
      <div className="w-full block md:hidden">
        <button
          onClick={() => {
            dispatch(authActions.logout());
            dispatch(authActions.changeRole("user"));
            localStorage.clear("id");
            localStorage.clear("token");
            localStorage.clear("role");
            navigate("/");
          }}
          className="bg-zinc-900 w-full p-1 mt-4 lg:mt-0 text-white rounded font-semibold flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
        >
          LogOut <MdLogout className="ms-4" />
        </button>
      </div>
      </div>

      {role === "user" && (
        <div className="w-3/6 md:w-full mt-2 md:mt-0 items-center justify-center flex flex-col">
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
      )}
      {role === "admin" && (
        <div className="w-3/6 md:w-full mt-2 md:mt-0 items-center justify-center flex flex-col">
          <Link
            to="/profile"
            className="text-zinc-100 font-semibold px-4 w-full my-2 py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            All Orders
          </Link>
          <Link
            to="/profile/add-book"
            className="text-zinc-100 font-semibold p-2 w-full my-2 py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Add Books
          </Link>
          <Link
            to="/profile/settings"
            className="text-zinc-100 font-semibold px-4 w-full my-2 py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Settings
          </Link>
        </div>
      )}
      <div className="w-full hidden md:block">
        <button
          onClick={() => {
            dispatch(authActions.logout());
            dispatch(authActions.changeRole("user"));
            localStorage.clear("id");
            localStorage.clear("token");
            localStorage.clear("role");
            navigate("/");
          }}
          className="bg-zinc-900 w-full p-1 mt-4 lg:mt-0 text-white rounded font-semibold flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
        >
          LogOut <MdLogout className="ms-4" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
