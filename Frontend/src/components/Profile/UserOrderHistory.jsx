import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { ImFileEmpty } from "react-icons/im";
import { Link } from "react-router-dom";

const UserOrderHistory = () => {
  // const host = 'http://localhost:1000';
  const host = "https://onlinebookstore-ba29.onrender.com";

  const [OrderHistory, setOrderHistory] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${host}/api/order/get-order-history`, {
        headers,
      });
      // console.log(response.data.data);
      setOrderHistory(response.data.data);
    };
    fetch();
  }, []);

  return (
    <>
      {!OrderHistory && (
        <div className="flex items-center justify-center h-[60vh]">
          <Loader />
        </div>
      )}
      {OrderHistory && OrderHistory.length === 0 && (
        <div className="h-[80vh] p-4 text-zinc-100">
          <div className="h-[100%] flex flex-col items-center justify-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-zinc-500 mb-8">
              No Order History
            </h1>
            <ImFileEmpty className="mt-8 size-20 text-blue-500" />
          </div>
        </div>
      )}
      {OrderHistory && OrderHistory.length > 0 && (
        <div
          className={`p-0 md:p-2 text-zinc-100 ${
            OrderHistory && OrderHistory.length <= 4 ? "h-[70vh]" : "h-auto"
          }`}
        >
          <h1 className="text-3xl text-center md:text-5xl font-semibold text-zinc-500 mb-8">
            Your Order History
          </h1>
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1 className="text-center">Sr.</h1>
            </div>
            <div className="w-[22%] ml-2">
              <h1 className="">Books</h1>
            </div>
            <div className="w-[45%]">
              <h1 className="">Description</h1>
            </div>
            <div className="w-[9%]">
              <h1 className="">Price</h1>
            </div>
            <div className="w-[16%]">
              <h1 className="">Status</h1>
            </div>
            <div className="w-none md:w-[5%] hidden md:block">
              <h1 className="">Mode</h1>
            </div>
          </div>
          {OrderHistory.map((items, i) => (
            <div className="bg-zinc-800 w-full rounded py-2 px-4 my-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer">
              <div className="w-[3%]">
                <h1 className="text-center">{i + 1}</h1>
              </div>
              <div className="w-[22%]">
                <Link
                  className="hover:text-blue-300"
                  to={`/view-book-details/${items.book._id}`}
                >
                  {items.book.title}
                </Link>
              </div>
              <div className="w-[45%]">
                <h1 className="">{items.book.desc.slice(0, 50)} ...</h1>
              </div>
              <div className="w-[9%]">
                <h1 className="">₹ {items.book.price}</h1>
              </div>
              <div className="w-[16%]">
                <h1 className="font-semibold text-green-500">
                  {items.status === "Out for delivery" ? (
                    <div className="text-yellow-500">{items.status}</div>
                  ) : items.status === "Cancelled" ? (
                    <div className="text-red-500"> {items.status} </div>
                  ) : (
                    items.status
                  )}
                </h1>
              </div>
              <div className="w-none md:w-[5%] hidden md:block">
                <h1 className="text-sm text-zinc-400">COD</h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UserOrderHistory;
