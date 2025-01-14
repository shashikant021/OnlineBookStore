import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ViewBookDetails = () => {
  const { id } = useParams();
  const [Data, setData] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const handleFavourite = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/favourite/add-book-to-favourite",
      {},
      { headers }
    );
    // console.log(response)
    toast.success(response.data.message);
  };

  const handleCart = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/cart/add-to-cart",
      {},
      { headers }
    );
    // console.log(response);
    toast.success(response.data.message);
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:1000/api/book/get-book-by-id/${id}`
      );
      //   console.log(response)
      setData(response.data.data);
    };
    fetch();
  }, []);

  //   console.log(id);
  return (
    <>
      {Data && (
        <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8">
          <div className="bg-zinc-800 rounded p-12 h-[50vh] md:h-[76vh] w-full lg:w-3/6 flex items-center justify-center md:justify-around">
            <img
              className="h-[40vh] lg:h-[60vh] rounded"
              src={Data.url}
              alt="/"
            />
            {isLoggedIn === true && role === "user" && (
              <div className="flex flex-col pl-8 md:pl-0">
                <button
                  onClick={handleFavourite}
                  className="bg-white rounded-2xl text-3xl p-2 mb-8 text-red-500 hover:text-red-900 hover:scale-105 duration-200"
                >
                  <FaHeart />
                </button>
                <button
                  onClick={handleCart}
                  className="bg-blue-500 rounded-2xl text-3xl p-2 mt-8 text-white hover:bg-blue-900 hover:scale-105 duration-200"
                >
                  <FaShoppingCart />
                </button>
              </div>
            )}
            {isLoggedIn === true && role === "admin" && (
              <div className="flex flex-col pl-8 md:pl-0">
                <button className="bg-blue-500 rounded-2xl text-3xl p-2 mb-8 text-white hover:bg-blue-900  hover:scale-105 duration-200">
                  <FaEdit />
                </button>
                <button className="bg-red-500 rounded-2xl text-3xl p-2 mt-8 text-white hover:bg-red-900 hover:scale-105 duration-200">
                  <MdDeleteForever />
                </button>
              </div>
            )}
          </div>
          <div className="p-8 w-full lg:w-3/6">
            <h2 className="text-3xl md:text-4xl text-zinc-200 font-semibold">
              {Data.title}
            </h2>{" "}
            <p className=" text-zinc-400 mt-4 ">By: {Data.author}</p>
            <p className=" text-zinc-400 mt-4 md:text-xl">{Data.desc}</p>
            <p className="flex text-zinc-400 mt-6 text-center justify-start font-semibold">
              <GrLanguage className="me-2" />
              {Data.language}
            </p>
            <p className="mt-8 text-zinc-100 text-xl md:text-3xl font-semibold ">
              Price: ₹{Data.price}
            </p>
          </div>
        </div>
      )}
      {!Data && (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          {" "}
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
