import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BookCard from "../BookCard/BookCard";
import { ImFileEmpty } from "react-icons/im";

const Favourite = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/favourite/get-favourite-books",
        { headers }
      );
      // console.log(response.data.data)
      setFavouriteBooks(response.data.data);
      toast.success(response.data.message);
    };
    fetch();
  }, [FavouriteBooks]);

  return (
    <>
      {FavouriteBooks && FavouriteBooks.length === 0 ? (
        <div className="text-zinc-500 text-3xl md:text-5xl flex flex-col items-center justify-center h-[50vh] md:h-[100%]">
          No Favourite Books
          <ImFileEmpty className="mt-8 size-20 text-blue-500" />
        </div>
      ) : (
        <h1 className="text-3xl border border-zinc-500 flex items-center justify-center text-zinc-300">
          Your Favourites
        </h1>
      )}
      <div className=" mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8">
        {FavouriteBooks &&
          FavouriteBooks.map((items, i) => (
            <div key={i}>
              {" "}
              <BookCard data={items} favourite={true} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Favourite;
