import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TfiMenu } from "react-icons/tfi";
import { useSelector } from "react-redux";

const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
    {
      title: "Admin Profile",
      link: "/profile",
    },
  ];
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); //useSelector help to select the current state.
  const role = useSelector((state) => state.auth.role);
  const [mobileNav, setMobileNav] = useState("hidden");

  if (isLoggedIn === false) {
    links.splice(2, 3);
  }

  if (isLoggedIn === true && role === "user") {
    links.splice(4, 1);
  }

  if (isLoggedIn === true && role === "admin") {
    links.splice(2, 2);
  }

  return (
    <>
      <nav className="z-50 relative bg-zinc-800 text-white px-8 py-2 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            className="h-10 me-4"
            src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
            alt="logo"
          />
          <h1 className="text-2xl font-semibold">BookStore</h1>
        </Link>
        <div className="nav-links-bookstore block md:flex gap-4 item-center">
          <div className="hidden md:flex items-center gap-4">
            {links.map((items, i) => (
              <>
                {items.title === "Profile" || items.title === "Admin Profile" ? (
                  <Link
                    to={items.link}
                    className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-black transition-all duration-300"
                    key={i}
                  >
                    {items.title}
                  </Link>
                ) : (
                  <Link
                    to={items.link}
                    className="hover:text-blue-500 transition-all duration-300"
                    key={i}
                  >
                    {items.title}
                  </Link>
                )}
              </>
            ))}
          </div>
          {isLoggedIn === false && (
            <>
              <div className="hidden md:flex gap-4">
                <Link
                  to="login"
                  className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-black transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="signUp"
                  className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-black transition-all duration-300"
                >
                  SignUp
                </Link>
              </div>
            </>
          )}
          <button
            onClick={() =>
              mobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
            className="block md:hidden text-white text-2xl hover:text-zinc-400"
          >
            <TfiMenu />
          </button>
        </div>
      </nav>
      <div
        className={` ${mobileNav} bg-zinc-700 absolute rounded-bl-3xl top-14 right-0 w-2/3 z-40 flex flex-col items-center justify-center`}
      >
        {links.map((items, i) => (
          <>
            {items.title === "Profile" || items.title === "Admin Profile" ? (
              <Link
                to={items.link}
                onClick={() =>
                  mobileNav === "hidden"
                    ? setMobileNav("block")
                    : setMobileNav("hidden")
                }
                className={`${mobileNav} mt-4 mb-4 px-4 py-1 border border-blue-500 text-white rounded hover:bg-white hover:text-black transition-all duration-300`}
                key={i}
              >
                {items.title}
              </Link>
            ) : (
              <Link
                to={items.link}
                onClick={() =>
                  mobileNav === "hidden"
                    ? setMobileNav("block")
                    : setMobileNav("hidden")
                }
                className={`${mobileNav} text-white text-md mt-4 hover:text-blue-500 transition-all duration-300`}
                key={i}
              >
                {items.title}
              </Link>
            )}
          </>
        ))}
        {isLoggedIn === false && (
          <>
            <Link
              to="logIn"
              onClick={() =>
                mobileNav === "hidden"
                  ? setMobileNav("block")
                  : setMobileNav("hidden")
              }
              className={`${mobileNav} px-6 py-2 mb-6 mt-4 text-md border border-blue-500 rounded text-white hover:bg-white hover:text-black transition-all duration-300`}
            >
              Login
            </Link>
            <Link
              to="signUp"
              onClick={() =>
                mobileNav === "hidden"
                  ? setMobileNav("block")
                  : setMobileNav("hidden")
              }
              className={`${mobileNav} px-6 py-2 mb-6 text-md bg-blue-500 rounded text-white hover:bg-white hover:text-black transition-all duration-300`}
            >
              SignUp
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
