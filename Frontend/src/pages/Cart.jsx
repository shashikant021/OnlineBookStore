import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import { ImFileEmpty } from "react-icons/im";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [Cart, setCart] = useState();
  const [Total, setTotal] = useState();
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API__URL}/api/cart/get-user-cart`,
        { headers }
      );
      // console.log(res.data.data);
      setCart(response.data.data);
      toast.success(response.data.message);
    };
    fetch();
  }, [Cart]);

  const deleteItems = async (bookid) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API__URL}/api/cart/remove-from-cart/${bookid}`,
      {},
      { headers }
    );
    // console.log(response);
    toast.success(response.data.message);
  };

  useEffect(() => {
    if (Cart && Cart.length > 0) {
      let total = 0;
      Cart.map((items) => {
        total += items.price;
      });
      setTotal(total);
      total = 0;
    }
  }, [Cart]);

  const placeOrder = async () => {
    const userConformed = window.confirm(
      "Are you sure you want to place this order? Click Ok button to confirm or Click Cancel button to abort."
    );

    if (!userConformed) {
      toast.error("Order placement cancelled.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API__URL}/api/order/place-order`,
        { order: Cart },
        { headers }
      );
      toast.success(response.data.message);
      navigate("/profile/orderHistory");
    } catch (error) {
      console.log(error);
      toast.error("Failed to place the order. Please try again.");
    }
  };

  return (
    <div
      className={`bg-zinc-900 px-12 py-8 ${
        Cart && Cart.length <= 3 ? "h-screen" : "h-auto"
      } `}
    >
      {!Cart && (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      )}
      {Cart && Cart.length === 0 && (
        <div className="h-screen">
          <div className="h-[100%] flex items-center justify-center flex-col">
            <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
              Empty Cart
            </h1>
            <ImFileEmpty className="size-20 mt-12 text-blue-500" />
          </div>
        </div>
      )}
      {Cart && Cart.length > 0 && (
        <>
          <div className="">
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-center font-semibold text-zinc-300 mb-8">
              Your Cart
            </h1>
            {Cart.map((items, i) => (
              <div
                key={i}
                className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 items-center justify-center"
              >
                <img
                  src={items.url}
                  alt="/"
                  className="h-[20vh] md:h-[10vh]  object-cover mx-6 lg:mx-12"
                />
                <div className="w-full md:w-auto">
                  <h1 className="text-2xl ml-4 text-zinc-100 font-semibold text-center md:text-start mt-2 md:mt-0">
                    {items.title}
                  </h1>
                  <p className="text-zinc-300 mt-2 ml-4 mr-20 hidden lg:block">
                    {items.desc.slice(0, 150)}...
                  </p>
                  <p className="text-zinc-300 mt-2 hidden mx-4 md:block lg:hidden">
                    {items.desc.slice(0, 100)}...
                  </p>
                  <p className="text-zinc-300 mt-2 md:hidden block">
                    {items.desc.slice(0, 100)}...
                  </p>
                </div>
                <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                  <h2 className="text-zinc-200 text-2xl font-semibold flex">
                    ₹ {items.price}
                  </h2>
                  <button
                    onClick={() => deleteItems(items._id)}
                    className="bg-red-100 text-red-700 border border-red-700 rounded mr-4 p-2 ms-12 hover:scale-105 duration-200"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {Cart && Cart.length > 0 && (
        <div className="mt-4 w-full flex items-center justify-end">
          <div className="p-4 bg-zinc-800 rounded">
            <h1 className="text-3xl text-zinc-200 font-semibold">
              Total Amount
            </h1>
            <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
              <h2>{Cart.length} books</h2>
              <h2>₹ {Total}</h2>
            </div>
            <div className="w-[100%] mt-3">
              <button
                onClick={placeOrder}
                className="bg-zinc-200 rounded px-4 py-2 flex justify-center w-full font-semibold hover:scale-95 duration-200 hover:bg-zinc-500"
              >
                Place Your Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
