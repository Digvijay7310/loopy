import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUpload,
  FaSearch,
  FaHome,
  FaThumbsUp,
  FaHistory,
  FaAddressBook,
} from "react-icons/fa";
import { AiFillMessage, AiFillCustomerService } from "react-icons/ai";
import { MdWatchLater } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-zinc-950 text-white w-full sticky top-0 z-50 shadow-md">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-red-500 flex items-center gap-1"
        >
          Loo
          <span className="bg-red-500 text-white px-2 rounded-full">py</span>
        </Link>

        {/* Search bar */}
        <form className="hidden sm:flex flex-1 mx-4 max-w-md">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 px-3 py-1 bg-zinc-700 text-white rounded-l focus:outline-none focus:ring-1 focus:ring-red-500"
          />
          <button className="bg-red-500 px-4 py-1 rounded-r hover:bg-red-600">
            <FaSearch />
          </button>
        </form>

        {/* Right actions */}
        <div className="flex items-center space-x-4">
          {/* Upload - icon only on mobile */}
          <Link
            to="/videos/upload"
            className="text-white hover:text-red-500 hidden sm:inline-flex"
            title="Upload"
          >
            <FaUpload className="text-xl" />
          </Link>

          {/* Mobile search icon */}
          <button className="text-white sm:hidden hover:text-red-500">
            <FaSearch className="text-xl" />
          </button>

          {/* Hamburger menu */}
          <button
            onClick={toggleMenu}
            className="text-white text-2xl md:hidden focus:outline-none"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-zinc-900 transition-transform duration-300 ${
          menuOpen ? "max-h-[600px] py-4" : "max-h-0 overflow-hidden"
        }`}
      >
        <nav className="flex flex-col space-y-3 px-4">
          <Link to="/" onClick={toggleMenu} className="flex items-center gap-2 hover:text-red-500">
            <FaHome /> Home
          </Link>
          <Link to="/videos/upload" onClick={toggleMenu} className="flex items-center gap-2 hover:text-red-500">
            <FaUpload /> Upload
          </Link>
          <Link to="/videos/my-likes-videos" onClick={toggleMenu} className="flex items-center gap-2 hover:text-red-500">
            <FaThumbsUp /> Likes
          </Link>
          <Link to="/videos/my-comments-videos" onClick={toggleMenu} className="flex items-center gap-2 hover:text-red-500">
            <AiFillMessage /> Comments
          </Link>
          <Link to="/videos/my-videos" onClick={toggleMenu} className="flex items-center gap-2 hover:text-red-500">
            <MdWatchLater /> My Videos
          </Link>
          <Link to="/videos/delete-all-videos" onClick={toggleMenu} className="flex items-center gap-2 hover:text-red-500">
            <FaHistory /> Delete All
          </Link>
          <Link to="/users/profile" onClick={toggleMenu} className="flex items-center gap-2 hover:text-red-500">
            <FaAddressBook /> Profile
          </Link>
          <Link to="/users/contact" onClick={toggleMenu} className="flex items-center gap-2 hover:text-red-500">
            <AiFillCustomerService /> Contact
          </Link>
          <Link to="/users/logout" onClick={toggleMenu} className="flex items-center gap-2 hover:text-red-500">
            <LuLogOut /> Logout
          </Link>
        </nav>
      </div>

      {/* Desktop menu (optional side nav can go here) */}
    </header>
  );
};

export default Navbar;
