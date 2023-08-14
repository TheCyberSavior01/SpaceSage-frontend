import React from "react";
import logo from "../assets/logo_bg_none.svg";
import { Link, useLocation } from "react-router-dom";
import { useStateValue } from "../provider/StateProvider";

export default function Header() {
  const location = useLocation();
  const [{ user }] = useStateValue();

  const markedNavLink = (navPath) => {
    return location.pathname === navPath ? true : false;
  };

  return (
    <header className="bg-[#000000] flex justify-between items-center px-3 py-5 md:px-10 lg:px-20 sticky top-0 z-50">
      <div>
        <Link to="/">
          <img
            className="h-10 w-40 md:h-10 md:w-40 lg:w-52 cursor-pointer"
            src={logo}
            alt="logo"
          />
        </Link>
      </div>
      <div>
        <ul className="text-white flex gap-2 text-sm md:text-base sm:gap-5 lg:text-base lg:gap-8 font-semibold items-center">
          <Link to="/">
            <li
              className={`cursor-pointer ${
                markedNavLink("/") && "border-b-4 border-b-[#DA4167]"
              }`}
            >
              Home
            </li>
          </Link>
          <Link to="/offers">
            <li
              className={`cursor-pointer ${
                markedNavLink("/offers") && "border-b-4 border-b-[#DA4167]"
              }`}
            >
              Offers
            </li>
          </Link>
          {!user ? (
            <Link to="/sign-in">
              <li
                className={`cursor-pointer ${
                  markedNavLink("/sign-in") && "border-b-4 border-b-[#DA4167]"
                }`}
              >
                <button className="bg-btnColor text-white font-bold py-2 px-4 rounded">
                  Sign In
                </button>
              </li>
            </Link>
          ) : (
            <Link to="/profile">
              <li
                className={`cursor-pointer ${
                  markedNavLink("/profile") && "border-b-4 border-b-[#DA4167]"
                }`}
              >
                Profile
              </li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}
