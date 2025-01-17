import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddBook = () => {
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
        const response = await axios.post(
          "http://localhost:1000/api/book/add-book",
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
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="h-[100%] p-0 md:p-4">
      <h1 className="text-center text-2xl md:text-3xl font-semibold text-zinc-500 mb-8">
        Add Book
      </h1>
      <div className="p-4 bg-zinc-800 rounded">
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
            Add Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
