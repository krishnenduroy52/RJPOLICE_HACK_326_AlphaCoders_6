import React, { useState } from "react";
import { GiHamburgerMenu, GiTireIronCross } from "react-icons/gi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const onToggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="bg-red font-[Poppins] pb-4">
        <nav className="mt-5 flex justify-between items-center w-[92%] mx-auto">
          <div>
            <Link to="/">
              <h1 className="text-2xl font-bold">Rajasthan</h1>
            </Link>
          </div>
          <div
            className={`nav-links duration-500 md:static absolute bg-white md:min-h-full min-h-[60vh] left-0 top-[-100%] md:w-auto  w-full flex items-center px-5 ${
              isMenuOpen ? "top-[9%]" : "top-[-100%]"
            }
                            `}
          >
            <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
              <li className="hover:text-gray-500"> <Link to="/user/details">Register User</Link></li>
              <li className="hover:text-gray-500">Home</li>
              <li className="hover:text-gray-500">Home</li>
              <li className="hover:text-gray-500">Home</li>
              <li className="hover:text-gray-500"> <Link to="/view/CCTV">CCTV Footage</Link> </li>
            </ul>
          </div>

          <div className="flex items-center gap-6">
            <button className="text-xl bg-blue-500 bg-opacity-75 text-white px-5 py-2 hover:bg-blue-700 rounded-3xl">
              Sign in
            </button>
            <GiHamburgerMenu
              className="text-3xl cursor-pointer md:hidden"
              onClick={onToggleMenu}
            />
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
