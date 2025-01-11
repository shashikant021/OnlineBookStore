import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ data }) => {
  // console.log(data);
  return (
    <>
      <Link to={`/view-book-details/${data._id}`}>
        <div className="bg-zinc-800 p-4 mx-6 rounded flex flex-col">
          <div className="bg-zinc-800 rounded flex justify-center items-center">
            <img className="h-[30vh]" src={data.url} alt="/" />
          </div>
          <h2 className="mt-4 text-xl text-zinc-200 font-semibold text-center">
            {data.title}
          </h2>
          <div className="flex justify-between">
            {" "}
            <p className="mt-2 text-zinc-400 font-semibold ">
              By: {data.author}
            </p>
            <p className="mt-2 text-zinc-200 font-semibold ">${data.price}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default BookCard;
