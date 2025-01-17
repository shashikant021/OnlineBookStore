import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import BookCard from "../components/BookCard/BookCard";
import { ImFileEmpty } from "react-icons/im";

const AllBooks = () => {
  const [Data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API__URL}/api/book/get-all-books`
      );
      // console.log(response.data.data);
      setData(response.data.data);
    };
    fetch();
  }, []);
  return (
    <>
      {!Data && (
        <div className="bg-zinc-900 w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      )}
      {Data && Data.length === 0 ? (
        <div className="bg-zinc-900 h-[85vh] p-4 text-zinc-100">
          <div className="h-[100%] flex flex-col items-center justify-center">
            <h1 className="text-2xl md:text-5xl  font-semibold text-zinc-500 mb-8">
              No Books Available
            </h1>
            <ImFileEmpty className="mt-8 size-16 md:size-20 text-blue-500" />
          </div>
        </div>
      ) : (
        <div className="bg-zinc-900 h-auto px-12 py-8 ">
          <h3 className="text-2xl md:text-3xl text-yellow-100 text-center">
            All Books
          </h3>
          <div className="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 h-auto ">
            {Data &&
              Data.map((items, i) => (
                <div key={i}>
                  {" "}
                  <BookCard data={items} />{" "}
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AllBooks;
