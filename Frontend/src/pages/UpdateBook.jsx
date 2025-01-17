import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IoArrowBackCircleSharp } from "react-icons/io5";

function UpdateBook() {
  // const host = 'http://localhost:1000';
  const host = "https://onlinebookstore-ba29.onrender.com";

  const { id } = useParams();
  const navigate = useNavigate();
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (
        Data.url === "" ||
        Data.title === "" ||
        Data.author === "" ||
        Data.price === "" ||
        Data.desc === "" ||
        Data.language === ""
      ) {
        toast.error("All fields are required");
      } else {
        const response = await axios.put(
          `${host}/api/book/update-book`,
          Data,
          { headers }
        );
        setData({
          url: "",
          title: "",
          author: "",
          price: "",
          desc: "",
          language: "",
        });
        toast.success(response.data.message);
        navigate(`/view-book-details/${id}`);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${host}/api/book/get-book-by-id/${id}`
      );
      //   console.log(response)
      setData(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className="bg-zinc-900 h-[100%] py-8">
      <div className="flex flex-row items-center justify-around">
        <h1 className="text-2xl md:text-3xl font-semibold text-zinc-200 mb-8">
          Edit Book
        </h1>
        <button
          onClick={() => navigate(`/view-book-details/${id}`)}
          className="text-4xl bg-white text-blue-500 rounded-2xl mb-8"
        >
          <IoArrowBackCircleSharp />
        </button>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-5/6 md:w-4/6 p-4 bg-zinc-800 rounded">
          <div>
            <label htmlFor="" className="text-zinc-400">
              Image
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="url of image"
              name="url"
              required
              value={Data.url}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="" className="text-zinc-400">
              Title of Book
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="title of book"
              name="title"
              required
              value={Data.title}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="" className="text-zinc-400">
              Author of Book
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="author of book"
              name="author"
              required
              value={Data.author}
              onChange={change}
            />
          </div>
          <div className="mt-4 flex gap-4">
            <div className="w-3/6">
              <label htmlFor="" className="text-zinc-400">
                Language
              </label>
              <input
                type="text"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                placeholder="language of book"
                name="language"
                required
                value={Data.language}
                onChange={change}
              />
            </div>
            <div className="w-3/6">
              <label htmlFor="" className="text-zinc-400">
                Price
              </label>
              <input
                type="number"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                placeholder="price in rupees"
                name="price"
                required
                value={Data.price}
                onChange={change}
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="" className="text-zinc-400">
              Description
            </label>
            <textarea
              type="text"
              rows={2}
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="description of book..."
              name="desc"
              required
              value={Data.desc}
              onChange={change}
            />
          </div>
          <div className="text-center">
            <button
              onClick={submit}
              className="w-full mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-all duration-300"
            >
              Edit Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateBook;
