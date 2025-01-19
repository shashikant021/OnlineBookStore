import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const BookCard = ({ data, favourite }) => {
  // const host = 'http://localhost:1000';
  const host = "https://onlinebookstore-ba29.onrender.com";

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleRemoveFromFavourite = async () => {
    const response = await axios.put(
      `${host}/api/favourite/remove-book-from-favourite`,
      {},
      { headers }
    );
    // console.log(response);
    toast.success(response.data.message);
  };

  // console.log(data);
  return (
    <>
      <div className="bg-zinc-800 p-4 mx-6 rounded flex flex-col hover:scale-95 duration-200">
        <Link to={`/view-book-details/${data._id}`}>
          <div className="bg-zinc-800 rounded flex justify-center items-center">
            <img className="h-[30vh]" src={data.url} alt="/" />
          </div>
          <h2 className="mt-4 text-xl text-zinc-200 font-semibold text-center">
            {data.title}
          </h2>
          <div className="flex justify-between">
            {" "}
            <p className="mt-2 text-zinc-400 font-semibold text">
              By: {data.author}
            </p>
            <p className="mt-2 text-zinc-200 font-semibold ">₹{data.price}</p>
          </div>
        </Link>
        {favourite && (
          <button
            onClick={handleRemoveFromFavourite}
            className=" p-1 mt-2 rounded border border-yellow-500 text-yellow-500 hover:bg-yellow-50 hover:text-black "
          >
            Remove From Favourite
          </button>
        )}
      </div>
    </>
  );
};

export default BookCard;
