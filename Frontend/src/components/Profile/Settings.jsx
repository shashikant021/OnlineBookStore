import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";

const Settings = () => {
  const [ProfileData, setProfileData] = useState();
  const [Value, setValue] = useState({ address: "" });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...Value, [name]: value });
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API__URL}/api/auth/get-user-information`,
        { headers }
      );
      setProfileData(response.data);
      setValue({ address: response.data.address });
    };
    fetch();
  }, []);

  const submitAddress = async () => {
    const response = await axios.put(
      `${import.meta.env.VITE_API__URL}/api/auth/update-address`,
      Value,
      { headers }
    );
    toast.success(response.data.message)
  };

  return (
    <>
      {!ProfileData && (
        <div className="flex items-center justify-center h-[100%]">
          <Loader />
        </div>
      )}
      {ProfileData && (
        <div className="h-[55vh] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl text-center md:text-5xl font-semibold text-zinc-500 mb-8">
            Settings
          </h1>
          <div className="flex-gap-12">
            <div>
              <label htmlFor="">Username</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {ProfileData.username}
              </p>
            </div>
            <div>
              <label htmlFor="">Email</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {ProfileData.email}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col">
            <label htmlFor="">Address</label>
            <textarea
              rows={3}
              placeholder="Address"
              className="p-2 rounded bg-zinc-800 mt-2 font-semibold"
              name="address"
              value={Value.address}
              onChange={change}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={submitAddress}
              className="bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400 transition-all duration-300"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
