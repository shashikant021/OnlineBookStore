import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import BookCard from "../components/BookCard/BookCard";

const AllBooks = () => {
  const [Data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/book/get-all-books"
      );
      // console.log(response.data.data);
      setData(response.data.data);
    };
    fetch();
  }, []);
  return (
    <div className="bg-zinc-900 h-auto px-12 py-8 ">
      {/* <div className=" border rounded-xl items-center"> */}{" "}
      <h3 className="text-2xl md:text-3xl text-yellow-100 text-center">
        All Books
      </h3>
      {/* </div> */}
      {!Data && (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      )}
      <div className="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {Data &&
          Data.map((items, i) => (
            <div key={i}>
              {" "}
              <BookCard data={items} />{" "}
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllBooks;
