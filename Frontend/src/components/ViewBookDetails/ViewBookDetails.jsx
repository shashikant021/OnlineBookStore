import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { GrLanguage } from "react-icons/gr";

const ViewBookDetails = () => {
  const { id } = useParams();
  const [Data, setData] = useState();
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
          <div className="bg-zinc-800 rounded p-4 h-[50vh] lg:h-[76vh] w-full lg:w-3/6 flex items-center justify-center">
            <img className="h-[40vh] lg:h-[60vh] rounded" src={Data.url} alt="/" />
          </div>
          <div className="p-8 w-full lg:w-3/6">
            <h2 className="text-3xl md:text-4xl text-zinc-200 font-semibold">{Data.title}</h2>{" "}
            <p className=" text-zinc-400 mt-4 ">By: {Data.author}</p>
            <p className=" text-zinc-400 mt-4 md:text-xl">{Data.desc}</p>
            <p className="flex text-zinc-400 mt-6 text-center justify-start font-semibold">
              <GrLanguage className="me-2" />{Data.language}
            </p>
            <p className="mt-8 text-zinc-100 text-xl md:text-3xl font-semibold ">Price: ₹{Data.price}</p>
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
